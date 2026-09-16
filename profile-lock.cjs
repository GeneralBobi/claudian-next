'use strict';
const fs=require('node:fs/promises'),path=require('node:path');
const {AsyncLocalStorage}=require('node:async_hooks');
const {ordinary}=require('./memory-store.cjs');
const owners=new AsyncLocalStorage(),queues=new Map();
function keyFor(file){const key=path.resolve(file);return process.platform==='win32'?key.toLowerCase():key;}
async function exclusive(file,action){
 const key=keyFor(file),inherited=owners.getStore();
 if(inherited?.get(key)?.active)return action();
 const previous=queues.get(key)||Promise.resolve();
 const next=previous.catch(()=>{}).then(async()=>{
  const lock=file+'.mutation.lock';await ordinary(lock);await fs.mkdir(path.dirname(lock),{recursive:true});
  let handle;
  try{handle=await fs.open(lock,'wx');}catch(e){if(e.code==='EEXIST')throw Error('Profile is busy in another process or has an interrupted mutation. Retry after it finishes; do not remove a live lock.');throw e;}
  const token={active:true},context=new Map(inherited||[]);context.set(key,token);
  try{return await owners.run(context,action);}finally{token.active=false;await handle.close();await fs.unlink(lock);}
 });
 queues.set(key,next);
 try{return await next;}finally{if(queues.get(key)===next)queues.delete(key);}
}
function wrap(Setup,names){
 for(const name of names){const original=Setup.prototype[name];if(typeof original!=='function')throw Error('Unknown profile mutation: '+name);
  Setup.prototype[name]=function(...args){return exclusive(this.configFile,()=>original.apply(this,args));};
 }
}
module.exports={exclusive,wrap};
