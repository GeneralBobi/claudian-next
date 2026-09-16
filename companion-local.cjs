'use strict';
// Literal local-note fallback only. This is not the companion decision engine:
// it infers nothing. Presentation feedback is separate from explicit source edits.
const fs=require('node:fs/promises'),path=require('node:path'),crypto=require('node:crypto');
const store=require('./memory-store.cjs'),roles=require('./roles.cjs');
const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
class LocalCompanion {
 constructor({dataDir,profile,now=Date.now}) {Object.assign(this,{dataDir,profile,now});this.file=path.join(dataDir,'companion-local.json');this.queue=Promise.resolve();}
 async ledger() {
  await store.ordinary(this.file);
  try {const value=JSON.parse(await fs.readFile(this.file,'utf8'));if(!value||value.version!==1||!value.feedback||typeof value.feedback!=='object'||Array.isArray(value.feedback))throw Error('Invalid companion feedback');return value;}
  catch(e){if(e.code==='ENOENT')return {version:1,feedback:{}};throw e;}
 }
 async status() {
  const profile=await this.profile();
  const result={state:'unconfigured',vault:profile?.vault||null,canUpdate:profile?.access==='write',items:[],sources:[],hiddenCount:0};
  if(!profile?.vault)return result;
  try {
   await store.ordinary(profile.vault);await fs.readdir(profile.vault);
   const mapping=(await roles.resolve(profile.vault)).roles;
   const seen=new Set();
   for(const role of ['panel','reminders']) {
    const source=mapping[role]||null;
    if(!source){result.sources.push({role,source,state:'missing'});continue;}
    try {
     const note=await store.read(profile.vault,source);result.sources.push({role,source,state:'read'});
     let fence=null,frontmatter=false;
     for(const [index,line] of note.body.split(/\r?\n/).entries()) {
      if(index===0&&line.trim()==='---'){frontmatter=true;continue;}
      if(frontmatter){if(line.trim()==='---')frontmatter=false;continue;}
      const marker=/^\s*(`{3,}|~{3,})/.exec(line);
      if(marker){if(!fence)fence=marker[1][0];else if(marker[1][0]===fence)fence=null;continue;}
      if(fence)continue;
      const match=/^\s*[-*+]\s+\[ \]\s+(.+?)\s*$/.exec(line);if(!match)continue;
      const text=match[1],id=hash(path.resolve(profile.vault)+'\0'+source+'\0'+text);
      if(seen.has(id))continue;seen.add(id);
      result.items.push({id,text,source,role,line:index+1});
     }
    }catch{result.sources.push({role,source,state:'unreadable'});}
   }
   const ledger=await this.ledger();
   result.items=result.items.filter(item=>{const f=ledger.feedback[item.id];const hide=f?.action==='dismiss'||(f?.action==='later'&&f.until>this.now());if(hide)result.hiddenCount++;return !hide;}).slice(0,5);
   result.state=result.sources.some(s=>s.state==='unreadable')?'unreadable':result.items.length?'ready':result.sources.some(s=>s.state==='missing')?'unknown':'empty';
   return result;
  }catch {return {...result,state:'unreadable',error:'Local memory or feedback could not be read.'};}
 }
 feedback(id,action) {
  const run=this.queue.then(async()=>{
   if(!['later','dismiss'].includes(action))throw Error('Unknown feedback action.');
   const current=await this.status();if(!current.items.some(item=>item.id===id))throw Error('This reminder is no longer current. Refresh the panel.');
   const ledger=await this.ledger();ledger.feedback[id]={action,until:action==='later'?this.now()+3600000:null};
   await store.ordinary(this.file);await fs.mkdir(this.dataDir,{recursive:true});
   const temp=this.file+'.'+crypto.randomUUID()+'.tmp';
   try {await fs.writeFile(temp,JSON.stringify(ledger),{flag:'wx'});await fs.rename(temp,this.file);}finally{await fs.rm(temp,{force:true});}
   return this.status();
  });this.queue=run.catch(()=>{});return run;
 }
 update(id,input={}) {
  const run=this.queue.then(()=>require('./profile-lock.cjs').exclusive(path.join(this.dataDir,'profile.json'),async()=>{
   if(!input||!['complete','revise'].includes(input.action))throw Error('Unknown source update action.');
   if(input.action==='revise'&&(typeof input.text!=='string'||!input.text.trim()||input.text.length>4000||/[\r\n\u0000-\u001f\u007f\u2028\u2029]/.test(input.text)))throw Error('A nonempty single-line replacement is required.');
   const profile=await this.profile();
   if(profile?.access!=='write')throw Error('Write access is required to update the source note.');
   const current=await this.status(),item=current.items.find(item=>item.id===id);
   if(!item||current.vault!==profile.vault)throw Error('This reminder is no longer current. Refresh the panel.');
   const note=await store.read(profile.vault,item.source);
   const lines=note.body.split('\n'),index=item.line-1;
   const match=/^(\s*[-*+]\s+\[) (\]\s+)(.+?)(\s*)$/.exec((lines[index]||'').replace(/\r$/,''));
   const matches=lines.filter(line=>/^\s*[-*+]\s+\[ \]\s+(.+?)\s*$/.exec(line)?.[1]===item.text);
   if(!match||match[3]!==item.text||matches.length!==1)throw Error('The source changed or this item is ambiguous. Refresh the panel.');
   const latest=await this.profile();
   if(latest?.vault!==profile.vault||latest?.access!=='write')throw Error('Selected memory or write access changed. Refresh the panel.');
   const replacement=input.action==='complete'?match[1]+'x'+match[2]+match[3]+match[4]:match[1]+' '+match[2]+input.text.trim()+match[4];
   if(replacement===(lines[index]||'').replace(/\r$/,''))throw Error('The replacement is unchanged.');
   lines[index]=replacement+(lines[index].endsWith('\r')?'\r':'');
   const receipt=await store.mutate(profile.vault,{note:item.source,operation:'patch',expected_sha256:note.sha256,old_text:note.body,new_text:lines.join('\n'),reason:input.action==='complete'?'User marked this source item complete in the companion panel.':'User explicitly revised this source item in the companion panel.'},'companion-user');
   return {receipt,status:await this.status()};
  }));this.queue=run.catch(()=>{});return run;
 }
 async source(id) {
  const current=await this.status(),item=current.items.find(item=>item.id===id);
  if(!item)throw Error('This reminder is no longer current. Refresh the panel.');
  await store.read(current.vault,item.source);
  return store.inside(current.vault,item.source);
 }
}
module.exports={LocalCompanion};
