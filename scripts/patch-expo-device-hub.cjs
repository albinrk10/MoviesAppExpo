// Backport Device Hub support without upgrading this project's Expo SDK 54.
// https://github.com/expo/expo/issues/46671
const fs = require('node:fs');
const path = require('node:path');

const expoRoot = path.dirname(require.resolve('expo/package.json'));
const cliRoot = path.dirname(require.resolve('@expo/cli/package.json', { paths: [expoRoot] }));
const { version } = require(path.join(cliRoot, 'package.json'));

if (!version.startsWith('54.')) {
  console.log('Device Hub patch skipped: only Expo CLI 54 needs this backport.');
  process.exit(0);
}

const marker = '// MoviesAppExpo: Xcode 27 Device Hub compatibility';
const changes = [
  ['start/doctor/apple/SimulatorAppPrerequisite.js', [
    ['async function getSimulatorAppIdAsync() {', `async function getSimulatorAppIdAsync() {
    if (require('../../../utils/deviceHubCompat').getDeviceHubPath()) return 'com.apple.dt.Devices';`],
    ["if (result !== 'com.apple.iphonesimulator'", "if (result !== 'com.apple.dt.Devices' && result !== 'com.apple.iphonesimulator'"],
  ]],
  ['start/platforms/ios/ensureSimulatorAppRunning.js', [
    ['async function ensureSimulatorAppRunningAsync(device, { maxWaitTime } = {}) {', `async function ensureSimulatorAppRunningAsync(device, { maxWaitTime } = {}) {
    if (require('../../../utils/deviceHubCompat').getDeviceHubPath()) {
        await require('../../../utils/deviceHubCompat').openDeviceHubAsync(device);
        return;
    }`],
  ]],
  ['start/platforms/ios/AppleDeviceManager.js', [
    ['await _osascript().execAsync(`tell application "Simulator" to activate`);', `if (!require('../../../utils/deviceHubCompat').getDeviceHubPath()) {
            await _osascript().execAsync(\`tell application "Simulator" to activate\`);
        }`],
  ]],
];

// Validate every replacement before writing; fail visibly if the CLI layout changes.
const updates = changes.map(([relative, replacements]) => {
  const file = path.join(cliRoot, 'build/src', relative);
  let source = fs.readFileSync(file, 'utf8');
  if (source.includes(marker)) return [file, source];
  for (const [before, after] of replacements) {
    if (!source.includes(before)) {
      throw new Error(`Device Hub patch no longer matches Expo CLI ${version}: ${relative}`);
    }
    source = source.replace(before, after);
  }
  return [file, `${marker}\n${source}`];
});

fs.writeFileSync(path.join(cliRoot, 'build/src/utils/deviceHubCompat.js'), `
const { execFileSync, execFile } = require('node:child_process');
const { existsSync } = require('node:fs');
const path = require('node:path');
const { promisify } = require('node:util');
exports.getDeviceHubPath = function () {
    if (process.platform !== 'darwin') return null;
    try {
        const developerDir = process.env.DEVELOPER_DIR || execFileSync('xcode-select', ['-p'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
        const simulator = path.join(developerDir, 'Applications/Simulator.app');
        const hub = path.resolve(developerDir, '../Applications/DeviceHub.app');
        return !existsSync(simulator) && existsSync(hub) ? hub : null;
    } catch { return null; }
};
exports.openDeviceHubAsync = async function (device) {
    const hub = exports.getDeviceHubPath();
    if (!hub) throw new Error('Device Hub is unavailable in the selected Xcode.');
    const args = device?.udid
        ? ['-a', hub, 'devices://device/open?id=' + encodeURIComponent(device.udid)]
        : ['-a', hub];
    await promisify(execFile)('open', args);
};
`);
for (const [file, source] of updates) fs.writeFileSync(file, source);
console.log(`Applied Xcode 27 Device Hub compatibility to Expo CLI ${version}.`);
