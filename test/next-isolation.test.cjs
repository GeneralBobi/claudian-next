'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'main.cjs'), 'utf8');
const pkg = require('../package.json');

test('Next has a separate installer identity and a prerelease version', () => {
  assert.equal(pkg.build.appId, 'app.claudian.next');
  assert.equal(pkg.productName, 'Claudian Next');
  assert.equal(pkg.build.win.executableName, 'Claudian Next');
  assert.equal(pkg.build.nsis.shortcutName, 'Claudian Next');
  assert.match(pkg.version, /^1\.0\.0-alpha\.\d+$/);
  assert.match(pkg.build.nsis.artifactName, /^Claudian-Next-Setup-/);
});

test('normal startup configures a separate profile before obtaining the instance lock', () => {
  const paths = {};
  const app = {
    setName() {}, setAppUserModelId() {}, getPath: () => 'APPDATA',
    setPath: (key, value) => { paths[key] = value; },
    requestSingleInstanceLock: () => { assert.equal(paths.userData, path.join('APPDATA', 'Claudian Next')); return false; },
    quit() {}
  };
  const start = source.indexOf("const smoke =");
  const end = source.indexOf('async function purgeInstallation');
  vm.runInNewContext(source.slice(start, end), {
    app, path, os: require('node:os'), process: { argv: [], env: {} }, require,
    protocol: { registerSchemesAsPrivileged() {} }
  });
});

test('both update actions stop before any network or installer work', async () => {
  const handlers = {};
  const start = source.indexOf('const UPDATES_ENABLED=');
  const end = source.indexOf("handle('memory:check-files'", start);
  vm.runInNewContext(source.slice(start, end), {
    handle: (name, fn) => { handlers[name] = fn; },
    app: { getVersion: () => pkg.version },
    net: { fetch: () => { throw Error('Network must not be reached'); } }
  });
  const state = await handlers['app:updates']();
  assert.equal(state.available, false);
  assert.equal(state.disabled, true);
  await assert.rejects(handlers['app:download-update'](), /no published update channel/);
});

test('preview uninstall cannot force-remove shared AI registrations', async () => {
  const installer = fs.readFileSync(path.join(root, 'assets/installer.nsh'), 'utf8');
  assert.doesNotMatch(installer, /ExecWait|--purge/);
  const start = source.indexOf('async function purgeInstallation');
  const end = source.indexOf('async function start()', start);
  const context = {};
  vm.runInNewContext(source.slice(start, end), context);
  await assert.rejects(context.purgeInstallation(), /disabled until migration ownership/);
});

test('real preview rejects host mutations before the registered handler executes', async () => {
  const context = {smoke:false,acceptanceRoot:undefined};
  vm.runInNewContext(source.slice(source.indexOf('const isolatedPreview ='), source.indexOf("const origin =")), context);
  const blocked = ['setup:prepare','setup:install','setup:review','memory:repair','memory:remove',
    'memory:adopt-protocol','memory:relocate','connector:start','connector:stop','connector:approve',
    'connector:revoke','connector:desktop-install','connector:export','connector:provider','connector:setup-help',
    'memory:obsidian','memory:self-check','memory:scan-send','memory:gemini-login','memory:review-start',
    'memory:check-files','memory:challenge','memory:verify','memory:verify-watch','companion:connect','future:mutation'];
  for (const name of blocked) assert.throws(() => context.requirePreviewAccess(name), /önizlemesinde/);
  for (const name of ['app:snapshot','memory:health','memory:connections','memory:notice','app:folder']) {
    assert.doesNotThrow(() => context.requirePreviewAccess(name));
  }
  const registrations = {};
  const frame = {url:'claudian://app/'};
  context.win = {webContents:{mainFrame:frame}};
  context.origin = 'claudian://app';
  context.ipcMain = {handle:(name,fn)=>{registrations[name]=fn;}};
  vm.runInNewContext(source.slice(source.indexOf('  function handle(name, fn)'), source.indexOf("  require('./companion-bridge")), context);
  let called = false;
  context.handle('setup:install', () => {called=true;});
  const result = await registrations['setup:install']({sender:context.win.webContents,senderFrame:frame});
  assert.equal(result.ok,false);
  assert.equal(called,false);
});

test('explicit isolated harnesses retain setup while startup background mutations stay gated', () => {
  const gate = source.slice(source.indexOf('const isolatedPreview ='), source.indexOf("const origin ="));
  for (const options of [{smoke:true,acceptanceRoot:undefined},{smoke:false,acceptanceRoot:'marked-fixture'}]) {
    const context = {...options};
    vm.runInNewContext(gate,context);
    assert.doesNotThrow(() => context.requirePreviewAccess('setup:install'));
  }
  assert.match(source,/if\(isolatedPreview\)\s*\{\s*if\(languageChanged[\s\S]*?await core\.upgrade\(\);\s*await core\.sweepResidue\(\);\s*\}/);
  assert.match(source,/if\(isolatedPreview\) await remoteConnector\.load\(\)/);
  assert.match(source,/if \(!smoke && isolatedPreview\)\s*\{\s*setTimeout/);
});
