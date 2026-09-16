'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {attach}=require('../companion-bridge.cjs');
test('Core resume stays local without a previous login and restores a valid session',async()=>{
 let cookies=[],calls=0,status=200;const handlers={};
 attach((name,fn)=>handlers[name]=fn,{fromPartition:()=>({cookies:{get:async()=>cookies},fetch:async()=>{calls++;return new Response(JSON.stringify({focus:'fixture focus'}),{status,headers:{'content-type':'application/json'}});}})});
 assert.equal(await handlers['companion:resume'](),null);assert.equal(calls,0);
 cookies=[{name:'session',value:'fixture'}];assert.deepEqual(await handlers['companion:resume'](),{focus:'fixture focus'});assert.equal(calls,1);
 status=401;assert.equal(await handlers['companion:resume'](),null);
 status=503;await assert.rejects(handlers['companion:resume'](),/CORE_UNAVAILABLE/);
});
