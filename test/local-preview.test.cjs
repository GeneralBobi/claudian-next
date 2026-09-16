'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {allows}=require('../local-preview.cjs');
test('local setup only authorizes Claude plans and their matching prepared ID',async()=>{
 const core={snapshot:async()=>({profile:null}),pending:{id:'plan',hosts:['claude-desktop']}};
 assert.equal(await allows('app:setup-local',[],core),true);
 assert.equal(await allows('setup:prepare',[{hosts:['claude-desktop']}],core),true);
 assert.equal(await allows('setup:prepare',[{hosts:['claude-desktop','codex']}],core),false);
 assert.equal(await allows('setup:install',['wrong'],core),false);
 assert.equal(await allows('setup:install',['plan'],core),true);
 core.pending.hosts=['codex'];assert.equal(await allows('setup:install',['plan'],core),false);
});
test('installed local lane keeps other hosts, cloud and unrelated mutations gated',async()=>{
 const profile={hosts:[{id:'claude-desktop'}],access:'write'},core={snapshot:async()=>({profile})};
 assert.equal(await allows('memory:challenge',['claude-desktop'],core),true);
 assert.equal(await allows('connector:desktop-drag',[],core),true);
 assert.equal(await allows('companion:local-update',[],core),true);
 assert.equal(await allows('memory:relocate',[],core),true);
 for(const name of ['connector:start','connector:approve','memory:repair','future:mutation'])assert.equal(await allows(name,[],core),false,name);
 assert.equal(await allows('memory:challenge',['codex'],core),false);
 profile.access='read';assert.equal(await allows('companion:local-update',[],core),false);
 profile.hosts.push({id:'codex'});assert.equal(await allows('connector:desktop-install',[],core),false);
});
