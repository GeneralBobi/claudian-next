'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path');
const {MemorySetup}=require('../core.cjs');
test('Next Claude setup and removal preserve existing Claude registration and prepare only an extension route',async t=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'claudian-next-extension-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));
 const home=path.join(root,'home'),dataDir=path.join(root,'data'),vault=path.join(root,'notes');await fs.mkdir(home);
 const config=require('../mcp-hosts.cjs').configFile(home),legacy=JSON.stringify({mcpServers:{claudian:{command:'old.exe'},other:{command:'keep.exe'}}});
 await fs.mkdir(path.dirname(config),{recursive:true});await fs.writeFile(config,legacy);
 const core=new MemorySetup({home,dataDir});
 const plan=await core.prepare({name:'Fixture',vault,mode:'new',storage:'markdown',hosts:['claude-desktop'],access:'write',language:'en'});
 await core.install(plan.id,true);
 let connection=(await core.connections())[0];assert.equal(connection.artifacts.route,'desktop-extension');assert.equal(connection.access.state,'pending-install');
 assert.equal(await fs.readFile(config,'utf8'),legacy);
 await core.upgrade();assert.equal(await fs.readFile(config,'utf8'),legacy);
 await core.removeHost('claude-desktop');assert.equal((await core.snapshot()).profile.hosts.length,0);assert.equal(await fs.readFile(config,'utf8'),legacy);
 assert.ok((await fs.readdir(vault)).some(n=>n.endsWith('.md')));
});
