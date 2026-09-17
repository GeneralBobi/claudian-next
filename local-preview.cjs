'use strict';
// The first complete local lane. Other hosts retain the migration gate.
const onlyClaude=hosts=>Array.isArray(hosts)&&hosts.length===1&&(typeof hosts[0]==='string'?hosts[0]:hosts[0]?.id)==='claude-desktop';
const hostActions=new Set(['memory:challenge','memory:verify','memory:verify-watch','memory:review-start','memory:review-status','memory:scan-send','memory:open-app','memory:remove']);
const localActions=new Set(['connector:desktop-install','connector:desktop-drag','connector:desktop-reveal','companion:local-update','memory:self-check','memory:relocate']);
async function allows(name,args,core){
 if(!['app:setup-local','setup:prepare','setup:install',...hostActions,...localActions].includes(name))return false;
 const profile=(await core.snapshot()).profile;
 if(profile?.hosts?.length&&!onlyClaude(profile.hosts))return false;
 if(name==='app:setup-local')return !profile;
 if(name==='setup:prepare')return onlyClaude(args[0]?.hosts);
 if(name==='setup:install')return core.pending?.id===args[0]&&onlyClaude(core.pending.hosts);
 if(!onlyClaude(profile?.hosts))return false;
 if(hostActions.has(name))return args[0]==='claude-desktop';
 if(name==='companion:local-update')return profile.access==='write';
 return localActions.has(name);
}
module.exports={allows,onlyClaude};
