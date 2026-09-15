'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path');
const runtime=require('../memory-runtime.cjs'),hook=require('../memory-hook.cjs');
async function fixture(t){const dir=await fs.mkdtemp(path.join(os.tmpdir(),'claudian-optional-'));t.after(()=>fs.rm(dir,{recursive:true,force:true}));const vault=path.join(dir,'vault');await fs.mkdir(vault);return {dir,profile:{vault,access:'write',language:'tr'}};}
test('default hook gives one startup pointer and never blocks normal replies or runs checkpoints',async t=>{
 const {dir,profile}=await fixture(t),event={session_id:'session',hook_event_name:'UserPromptSubmit'};
 assert.match((await hook.run(event,dir,profile)).hookSpecificOutput.additionalContext,/startup_context/);
 assert.deepEqual(await hook.run(event,dir,profile),{});
 const before=await fs.readFile(runtimeFile(dir,'session'),'utf8');
 for(const hook_event_name of ['Stop','PostToolUse'])assert.deepEqual(await hook.run({...event,hook_event_name},dir,profile),{});
 assert.equal(await fs.readFile(runtimeFile(dir,'session'),'utf8'),before);
 assert.equal((await runtime.load(dir,'session')).turn,0);
});
function runtimeFile(dir,id){return path.join(dir,'memory-sessions',require('../memory-store.cjs').digest(id)+'.json');}
test('optional review tools keep actor, turn and committed-write receipt checks',async t=>{
 const {dir,profile}=await fixture(t);await runtime.begin(dir,'s','codex');
 await assert.rejects(runtime.review(dir,{session_id:'s',turn:1,outcome:'NO_OP'},'claude-code',profile.vault),/different connection/);
 await assert.rejects(runtime.review(dir,{session_id:'s',turn:2,outcome:'NO_OP'},'codex',profile.vault),/Stale turn/);
 await assert.rejects(runtime.review(dir,{session_id:'s',turn:1,outcome:'UPDATED',receipts:[]},'codex',profile.vault),/committed receipts/);
 await assert.rejects(runtime.begin(dir,'s','claude-code'),/different connection/);
 await runtime.begin(dir,'s','codex');const state=await runtime.load(dir,'s');assert.equal(state.failedTurns||0,0);assert.equal((await runtime.status(dir))[0].pending,false);
 assert.equal((await runtime.review(dir,{session_id:'s',turn:2,outcome:'NO_OP'},'codex',profile.vault)).recorded,true);
});
test('legacy diagnostic opt-in retains its explicit review lifecycle',async t=>{
 const {dir,profile}=await fixture(t);profile.maintenanceReviewRequired=true;
 await hook.run({session_id:'s',hook_event_name:'UserPromptSubmit'},dir,profile);
 assert.equal((await hook.run({session_id:'s',hook_event_name:'Stop'},dir,profile)).decision,'block');
 assert.equal((await runtime.status(dir))[0].pending,true);
});
