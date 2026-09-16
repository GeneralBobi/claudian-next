'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path');
const {MemorySetup}=require('../core.cjs'),lock=require('../profile-lock.cjs');
async function fixture(t){const root=await fs.mkdtemp(path.join(os.tmpdir(),'claudian-profile-lock-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));const dataDir=path.join(root,'data');await fs.mkdir(dataDir);const a=new MemorySetup({home:path.join(root,'home'),dataDir}),b=new MemorySetup({home:path.join(root,'home'),dataDir});await fs.writeFile(a.configFile,JSON.stringify({vault:path.join(root,'vault'),language:'en',hosts:[],files:[]}));return {a,b};}
test('overlapping profile edits from separate Setup instances preserve both changes',async t=>{
 const {a,b}=await fixture(t);const original=fs.readFile;let enter,release;const entered=new Promise(r=>enter=r),resume=new Promise(r=>release=r);let intercepted=false;
 fs.readFile=async function(file,...args){const value=await original.call(this,file,...args);if(file===a.configFile&&!intercepted){intercepted=true;enter();await resume;}return value;};
 t.after(()=>{fs.readFile=original;});
 const first=a.skipVerification();await entered;const second=b.useLanguage('tr',{explicit:true});release();await Promise.all([first,second]);
 const result=JSON.parse(await original(a.configFile,'utf8'));assert.equal(result.language,'tr');assert.ok(result.verificationSkippedAt);
 assert.equal(JSON.parse(await original(path.join(a.dataDir,'preferences.json'),'utf8')).language,'tr');
});
test('nested mutation is reentrant and exception releases the lock for the next operation',async t=>{
 const {a}=await fixture(t);
 await lock.exclusive(a.configFile,()=>a.useLanguage('tr',{explicit:true}));
 await assert.rejects(lock.exclusive(a.configFile,()=>a.preferences('invalid')),/Invalid language/);
 await a.skipVerification();assert.ok((await a.snapshot()).profile.verificationSkippedAt);
 await assert.rejects(fs.access(a.configFile+'.mutation.lock'),/ENOENT/);
});
test('a foreign or interrupted lock is never stolen and no profile edit is applied',async t=>{
 const {a}=await fixture(t);const before=await fs.readFile(a.configFile,'utf8');const marker=a.configFile+'.mutation.lock';await fs.writeFile(marker,'foreign owner');
 await assert.rejects(a.useLanguage('tr',{explicit:true}),/busy in another process/);
 assert.equal(await fs.readFile(a.configFile,'utf8'),before);assert.equal(await fs.readFile(marker,'utf8'),'foreign owner');
});
