'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path');
const {LocalCompanion}=require('../companion-local.cjs');
async function fixture(t){const root=await fs.mkdtemp(path.join(os.tmpdir(),'claudian-local-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));const vault=path.join(root,'vault');await fs.mkdir(vault);return {root,vault,dataDir:path.join(root,'app'),profile:async()=>({vault})};}
const note=(role,text)=>`---\nclaudian_role: ${role}\n---\n${text}\n`;

test('explicit completion and revision update the canonical source; stale and read-only requests fail',async t=>{
 const f=await fixture(t),profile={vault:f.vault,access:'write'};
 const local=new LocalCompanion({...f,profile:async()=>profile}),file=path.join(f.vault,'Panel.md');
 await fs.writeFile(file,note('panel','Keep this paragraph.\n- [ ] Finish draft\n- [ ] Other task'));
 const first=(await local.status()).items[0];
 const revised=await local.update(first.id,{action:'revise',text:'Finish draft by Friday'});
 assert.equal(revised.receipt.status,'committed');
 assert.match(await fs.readFile(file,'utf8'),/Keep this paragraph\.\n- \[ \] Finish draft by Friday\n- \[ \] Other task/);
 await assert.rejects(local.update(first.id,{action:'complete'}),/no longer current/);
 const next=revised.status.items[0];await local.update(next.id,{action:'complete'});
 assert.match(await fs.readFile(file,'utf8'),/- \[x\] Finish draft by Friday/);
 assert.equal((await local.status()).items.some(i=>i.id===next.id),false);
 profile.access='read';const before=await fs.readFile(file,'utf8');
 await assert.rejects(local.update((await local.status()).items[0].id,{action:'complete'}),/Write access/);
 assert.equal(await fs.readFile(file,'utf8'),before);
});

test('ambiguous duplicate source and multiline replacement are not silently changed',async t=>{
 const f=await fixture(t),local=new LocalCompanion({...f,profile:async()=>({vault:f.vault,access:'write'})}),file=path.join(f.vault,'Panel.md');
 const body=note('panel','- [ ] Same task\n- [ ] Same task');await fs.writeFile(file,body);
 const id=(await local.status()).items[0].id;
 await assert.rejects(local.update(id,{action:'complete'}),/ambiguous/);
 await assert.rejects(local.update(id,{action:'revise',text:'New\nAnother'}),/single-line/);
 assert.equal(await fs.readFile(file,'utf8'),body);
});
test('reads actual unchecked items only; reports exact renamed source, not prose or fenced examples',async t=>{
 const f=await fixture(t);await fs.writeFile(path.join(f.vault,'Renamed.md'),note('panel','A suggested task\n- [x] done\n```md\n- [ ] example\n```\n- [ ] Real task'));
 await fs.writeFile(path.join(f.vault,'Reminders.md'),note('reminders','Nothing due'));
 const status=await new LocalCompanion(f).status();assert.equal(status.state,'ready');assert.equal(status.items.length,1);assert.equal(status.items[0].text,'Real task');assert.equal(status.items[0].source,'Renamed.md');
});
test('feedback is local; expires after an hour, survives restart, text changes and other vaults resurface',async t=>{
 const f=await fixture(t);let now=100;const local=new LocalCompanion({...f,now:()=>now});const file=path.join(f.vault,'Control Panel.md');const original=note('panel','- [ ] Task');await fs.writeFile(file,original);
 let status=await local.status();const id=status.items[0].id;await local.feedback(id,'later');assert.equal((await local.status()).hiddenCount,1);assert.equal(await fs.readFile(file,'utf8'),original);
 now+=3600001;assert.equal((await local.status()).items[0].id,id);await local.feedback(id,'dismiss');assert.equal((await new LocalCompanion(f).status()).items.length,0);
 await fs.writeFile(file,note('panel','- [ ] Revised task'));assert.equal((await local.status()).items.length,1);await assert.rejects(local.feedback(id,'dismiss'),/no longer current/);
 const other=path.join(f.root,'other');await fs.mkdir(other);await fs.writeFile(path.join(other,'Control Panel.md'),original);assert.equal((await new LocalCompanion({...f,profile:async()=>({vault:other})}).status()).items.length,1);
});
test('unknown, empty and unreadable are distinct; no profile is unconfigured; maximum five',async t=>{
 const f=await fixture(t),local=new LocalCompanion(f);assert.equal((await local.status()).state,'unknown');
 await fs.writeFile(path.join(f.vault,'Control Panel.md'),note('panel','No tasks'));await fs.writeFile(path.join(f.vault,'Reminders.md'),note('reminders','No tasks'));assert.equal((await local.status()).state,'empty');
 await fs.writeFile(path.join(f.vault,'Control Panel.md'),note('panel',Array.from({length:8},(_,i)=>'- [ ] Task '+i).join('\n')));assert.equal((await local.status()).items.length,5);
 await fs.writeFile(path.join(f.vault,'Reminders.md'),'x'.repeat(513*1024));assert.equal((await local.status()).state,'unreadable');
 assert.equal((await new LocalCompanion({...f,profile:async()=>null}).status()).state,'unconfigured');
});
test('source opening accepts only current IDs and rejects a source replaced by symlink',async t=>{
 const f=await fixture(t),local=new LocalCompanion(f),file=path.join(f.vault,'Control Panel.md');await fs.writeFile(file,note('panel','- [ ] Real'));const id=(await local.status()).items[0].id;
 assert.equal(await local.source(id),file);await assert.rejects(local.source('../outside'),/no longer current/);
 const external=path.join(f.root,'outside.md');await fs.writeFile(external,note('panel','- [ ] Real'));await fs.unlink(file);
 try{await fs.symlink(external,file);}catch(e){if(e.code==='EPERM'){t.diagnostic('OS denied symlink creation; stale-source rejection still tested');return;}throw e;}
 await assert.rejects(local.source(id),/no longer current/);
});
