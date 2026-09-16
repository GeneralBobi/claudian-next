'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os');
const {desktopEntries,desktopStatus}=require('../connector-package.cjs');
const version=require('../package.json').version;

async function fixture(t){
 const home=await fs.mkdtemp(path.join(os.tmpdir(),'claudian-status-'));
 t.after(()=>fs.rm(home,{recursive:true,force:true}));
 const root=path.dirname(require('../mcp-hosts.cjs').configFile(home));
 const dataDir=path.join(home,'data');
 const installation={launcher:path.join(home,'Claudian.exe'),mcpScript:path.join(home,'mcp-server.cjs')};
 async function add(id,{enabled=true,packageVersion=version,override={},wrapper}={}){
  const base=path.join(root,'Claude Extensions',id);
  const settings=path.join(root,'Claude Extensions Settings');
  await fs.mkdir(base,{recursive:true});await fs.mkdir(settings,{recursive:true});
  const files=desktopEntries({...installation,dataDir,...override,version:packageVersion});
  if(wrapper!==undefined)files['server.cjs']=wrapper;
  for(const [name,body] of Object.entries(files))await fs.writeFile(path.join(base,name),body);
  await fs.writeFile(path.join(settings,id+'.json'),JSON.stringify({isEnabled:enabled}));
 }
 return {add,status:()=>desktopStatus(home,dataDir,installation)};
}

test('old or disabled extension retains evidence without being current',async t=>{
 const f=await fixture(t);
 await f.add('a-old',{packageVersion:'0.18.7'});
 assert.deepEqual(await f.status(),{current:false,installed:true,enabled:true,version:'0.18.7'});
 await f.add('a-old',{enabled:false});
 assert.deepEqual(await f.status(),{current:false,installed:true,enabled:false,version});
});

test('a current enabled installation wins over earlier disabled and outdated entries',async t=>{
 const f=await fixture(t);
 await f.add('a-disabled',{enabled:false});
 await f.add('b-outdated',{packageVersion:'0.18.7'});
 await f.add('z-current');
 assert.deepEqual(await f.status(),{current:true,installed:true,enabled:true,version});
});

test('current version alone cannot validate a different installation or altered wrapper',async t=>{
 const f=await fixture(t);
 await f.add('wrong-target',{override:{dataDir:path.join(os.tmpdir(),'other-claudian-data')}});
 assert.deepEqual(await f.status(),{current:false,installed:true,enabled:true,version});
 await f.add('wrong-target',{wrapper:'// not the packaged launcher'});
 assert.equal((await f.status()).current,false);
});

test('missing extension is not reported installed',async t=>{
 const f=await fixture(t);assert.deepEqual(await f.status(),{current:false});
});
