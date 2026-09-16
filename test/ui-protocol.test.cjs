'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),vm=require('node:vm');
const {pathToFileURL,fileURLToPath}=require('node:url');
const root=path.join(__dirname,'..');
async function route(){
 const source=await fs.readFile(path.join(root,'main.cjs'),'utf8');let handler;
 vm.runInNewContext(source.slice(source.indexOf("  protocol.handle('claudian'"),source.indexOf('  session.defaultSession.setPermissionRequestHandler')),{
  protocol:{handle:(_scheme,fn)=>{handler=fn;}},URL,Response,path,pathToFileURL,__dirname:root,
  net:{fetch:async url=>new Response(await fs.readFile(fileURLToPath(url)))}
 });return handler;
}
test('desktop protocol serves every local script and stylesheet referenced by entry pages',async()=>{
 const handler=await route();
 for(const page of ['index.html','setup.html']){
  const html=await (await handler({url:'claudian://app/'+page})).text();
  const refs=[...html.matchAll(/(?:src|href)=["']([^"']+\.(?:js|css))["']/g)].map(m=>m[1]);
  assert.ok(refs.length>0);
  for(const ref of refs){const response=await handler({url:new URL(ref,'claudian://app/'+page).href});assert.equal(response.status,200,ref);assert.ok((await response.text()).length>0,ref);}
 }
});
test('desktop protocol does not expose backend files or another origin',async()=>{
 const handler=await route();
 for(const url of ['claudian://app/core.cjs','claudian://other/companion-panel.js','claudian://app/../package.json'])assert.equal((await handler({url})).status,404,url);
});
test('fresh read-only preview can render the panel without pretending memory is installed',async()=>{
 const source=await fs.readFile(path.join(root,'ui/renderer.js'),'utf8');let companionOpened=false;
 const context={state:{profile:null,previewReadOnly:true},view:'home',content:{innerHTML:''},t:(en)=>en,renderCompanion:()=>{companionOpened=true;}};
 const start=source.indexOf('async function renderPanel()'),end=source.indexOf(" if(!p)throw",start);
 vm.runInNewContext(source.slice(start,end)+'}',context);
 await context.renderPanel();assert.match(context.content.innerHTML,/no memory folder/);
 context.view='companion';await context.renderPanel();assert.equal(companionOpened,true);
 const main=await fs.readFile(path.join(root,'main.cjs'),'utf8');
 const declaration=main.match(/const showPanel = [^;]+;/)[0];
 for(const [installed,isolatedPreview,expected] of [[false,false,true],[false,true,false],[true,true,true]])assert.equal(vm.runInNewContext(declaration+'showPanel',{installed,isolatedPreview}),expected);
});
