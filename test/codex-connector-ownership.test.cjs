'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),toml=require('smol-toml');
const {grant,revoke}=require('../codex-connector.cjs');
const legacy={command:'C:/Apps/Claudian.exe',args:['C:/Apps/legacy/mcp-server.cjs'],env:{CLAUDIAN_DATA:'C:/Data/Claudian',CLAUDIAN_HOST:'codex'}};
const next={command:'C:/Apps/Claudian Next.exe',args:['C:/Apps/next/mcp-server.cjs'],env:{CLAUDIAN_DATA:'C:/Data/Claudian Next',CLAUDIAN_HOST:'codex'}};
const options={serverName:'claudian-next',expectedEntry:next};

test('Next coexists with legacy and unrelated settings and revokes only its exact block',()=>{
 const original=grant('model = "example"\n[mcp_servers.other]\ncommand = "other"\n',legacy);
 const configured=grant(original,next,options);
 assert.deepEqual(toml.parse(configured).mcp_servers.claudian,legacy);
 assert.deepEqual(toml.parse(configured).mcp_servers['claudian-next'],next);
 assert.equal(grant(configured,next,options),configured);
 assert.equal(revoke(configured,options),original);
 assert.equal(revoke(original,options),original);
 assert.ok(revoke(configured).includes('# Claudian Next MCP connection start'));
});

test('Next refuses changed managed entries and does not adopt unowned names',()=>{
 const installed=grant('',next,options);
 for(const modified of [installed.replace('Claudian Next.exe','Different.exe'),installed.replace('CLAUDIAN_HOST = "codex"','CLAUDIAN_HOST = "codex"\nEXTRA = "custom"')]){
  assert.throws(()=>revoke(modified,options),/changed.*preserved/);
  assert.throws(()=>grant(modified,next,options),/preserved/);
 }
 const unmanaged=toml.stringify({mcp_servers:{'claudian-next':next}});
 assert.throws(()=>grant(unmanaged,next,options),/unmanaged/);
 assert.equal(revoke(unmanaged,options),unmanaged);
});

test('Next refuses malformed ownership and additional configuration inside its block',()=>{
 const installed=grant('',next,options);
 for(const modified of [installed.replace('# Claudian Next MCP connection end',''),installed+installed,installed.replace('# Claudian Next MCP connection end','[mcp_servers.other]\ncommand = "other"\n# Claudian Next MCP connection end')]){
  assert.throws(()=>revoke(modified,options));
  assert.throws(()=>grant(modified,next,options));
 }
});

test('Windows path-equivalent owned entries remain idempotent and removable',()=>{
 const installed=grant('',next,options);
 const equivalent={...next,command:'c:\\Apps\\Claudian Next.exe',args:['c:\\Apps\\next\\mcp-server.cjs'],env:{...next.env,CLAUDIAN_DATA:'c:\\Data\\Claudian Next'}};
 assert.equal(grant(installed,equivalent,options),installed);
 assert.equal(revoke(installed,{serverName:'claudian-next',expectedEntry:equivalent}),'');
});
