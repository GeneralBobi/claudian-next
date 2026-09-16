'use strict';
const toml=require('smol-toml');
const same=(a,b)=>a===b||(typeof a==='string'&&typeof b==='string'&&/^[a-z]:[\\/]/i.test(a)&&/^[a-z]:[\\/]/i.test(b)&&require('node:path').win32.normalize(a).toLowerCase()===require('node:path').win32.normalize(b).toLowerCase());
function settings(options={}) {
  const serverName=options.serverName||'claudian';
  if(!['claudian','claudian-next'].includes(serverName))throw Error('Unsupported Claudian Codex server name; configuration preserved.');
  const label=serverName==='claudian-next'?'Claudian Next':'Claudian';
  return {serverName,start:'# '+label+' MCP connection start',end:'# '+label+' MCP connection end'};
}
const desiredEntry=entry=>({command:entry.command,args:entry.args,env:entry.env});
function equalEntry(a,b) {
  if(same(a,b))return true;
  if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b))return false;
  const keys=Object.keys(a);
  return keys.length===Object.keys(b).length&&keys.every(k=>Object.hasOwn(b,k)&&equalEntry(a[k],b[k]));
}
function managedBlock(previous,markers) {
  const {start,end,serverName}=markers;
  if(!previous.includes(start)&&!previous.includes(end))return null;
  if(previous.split(start).length!==2||previous.split(end).length!==2||previous.indexOf(end)<previous.indexOf(start))throw Error('Invalid Claudian MCP markers; configuration preserved.');
  const from=previous.indexOf(start),to=previous.indexOf(end);
  // A marker in a string or another comment is never ownership evidence.
  if((from>0&&previous[from-1]!=='\n')||previous.slice(from+start.length,from+start.length+2).replace('\r','')[0]!=='\n'||previous[to-1]!=='\n'||!/^($|\r?\n)/.test(previous.slice(to+end.length)))throw Error('Invalid Claudian MCP marker boundaries; configuration preserved.');
  const parsed=toml.parse(previous.slice(from+start.length,to));
  if(Object.keys(parsed).length!==1||!parsed.mcp_servers||Object.keys(parsed.mcp_servers).length!==1||!Object.hasOwn(parsed.mcp_servers,serverName))throw Error('Unrelated content inside Claudian MCP markers; configuration preserved.');
  return {from,to:to+end.length,entry:parsed.mcp_servers[serverName]};
}
function grant(previous,entry,options={}) {
  previous=previous||'';
  const markers=settings(options),config=toml.parse(previous),desired=desiredEntry(entry);
  const block=managedBlock(previous,markers),current=config.mcp_servers?.[markers.serverName];
  if(current) {
    const matches=markers.serverName==='claudian-next'?equalEntry(current,desired):same(current.command,desired.command)&&Array.isArray(current.args)&&current.args.length===desired.args.length&&current.args.every((arg,i)=>same(arg,desired.args[i]))&&Object.entries(desired.env||{}).every(([k,v])=>same(current.env?.[k],v));
    if(matches&&(markers.serverName==='claudian'||block))return previous;
    throw Error('A different or unmanaged Claudian Codex MCP connection exists; configuration preserved.');
  }
  if(block)throw Error('Incomplete Claudian MCP markers; configuration preserved.');
  const content=toml.stringify({mcp_servers:{[markers.serverName]:desired}});
  const result=previous+'\n'+markers.start+'\n'+content+markers.end+'\n';
  toml.parse(result);return result;
}
function revoke(previous,options={}) {
  previous=previous||'';
  const markers=settings(options);
  toml.parse(previous);
  const block=managedBlock(previous,markers);
  if(!block)return previous;
  if(options.expectedEntry&&!equalEntry(block.entry,desiredEntry(options.expectedEntry)))throw Error('Claudian Codex MCP entry changed; configuration preserved.');
  let from=block.from,to=block.to;
  if(from>0&&previous[from-1]==='\n'){from--;if(from>0&&previous[from-1]==='\r')from--;}
  if(previous.slice(to,to+2)==='\r\n')to+=2;else if(previous[to]==='\n')to++;
  const result=previous.slice(0,from)+previous.slice(to);
  toml.parse(result);return result;
}
function hooks(previous,options) {
  const config=previous?JSON.parse(previous):{};
  if(!config||typeof config!=='object'||Array.isArray(config))throw Error('Invalid Codex hooks; preserved.');
  const command=require('./claude-lifecycle.cjs').command(options)+' codex';
  const encoded='powershell.exe -NoProfile -EncodedCommand '+Buffer.from(command,'utf16le').toString('base64');
  const hooks={...(config.hooks||{})};
  for(const event of ['UserPromptSubmit','Stop','PostToolUse']){
    const groups=hooks[event]||[];
    if(!Array.isArray(groups))throw Error('Invalid Codex hook list; preserved.');
    if(!groups.some(g=>g.hooks?.some(h=>h.command===encoded)))hooks[event]=[...groups,{hooks:[{type:'command',command:encoded,timeout:15}]}];
  }
  return {content:JSON.stringify({...config,hooks},null,2)+'\n',command:encoded};
}
module.exports={grant,revoke,hooks};
