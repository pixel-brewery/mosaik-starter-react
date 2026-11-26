// #region Imports
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { verifyMosaikRelease } from './verify-mosaik-release.mjs';
// #endregion

function fixture() {
  const dependencies = { '@pixel-brewery/mosaik-icons': '0.1.185', '@pixel-brewery/mosaik-themes': '0.1.185' };
  return {
    manifest: { dependencies: { ...dependencies }, devDependencies: { tool: '1.0.0' } },
    lock: {
      lockfileVersion: 3,
      packages: {
        '': { dependencies: { ...dependencies }, devDependencies: { tool: '1.0.0' } },
        'node_modules/@pixel-brewery/mosaik-icons': { version: '0.1.185', integrity: 'unchanged' },
        'node_modules/@pixel-brewery/mosaik-themes': { version: '0.1.185', integrity: 'unchanged' },
        'node_modules/other/node_modules/@pixel-brewery/mosaik-core': { version: '0.1.185', integrity: 'unchanged' },
      },
    },
  };
}

test('accepts one exact stable direct and nested release without changing metadata', () => {
  // Arrange
  const { manifest, lock } = fixture();
  const before = JSON.stringify({ manifest, lock });
  // Act
  const version = verifyMosaikRelease(manifest, lock);
  // Assert
  assert.equal(version, '0.1.185');
  assert.equal(JSON.stringify({ manifest, lock }), before);
});

for (const [name, alter] of [
  ['latest tag', ({ manifest }) => { manifest.dependencies['@pixel-brewery/mosaik-icons'] = 'latest'; }],
  ['version range', ({ manifest }) => { manifest.dependencies['@pixel-brewery/mosaik-icons'] = '^0.1.185'; }],
  ['prerelease', ({ manifest }) => { manifest.dependencies['@pixel-brewery/mosaik-icons'] = '0.1.185-beta.1'; }],
  ['mixed declarations', ({ manifest }) => { manifest.dependencies['@pixel-brewery/mosaik-themes'] = '0.1.186'; }],
  ['missing lockfile declaration', ({ lock }) => { delete lock.packages[''].dependencies['@pixel-brewery/mosaik-themes']; }],
  ['extra lockfile declaration', ({ lock }) => { lock.packages[''].dependencies['@pixel-brewery/mosaik-core'] = '0.1.185'; }],
  ['changed dependency group', ({ lock }) => { lock.packages[''].devDependencies['@pixel-brewery/mosaik-themes'] = '0.1.185'; delete lock.packages[''].dependencies['@pixel-brewery/mosaik-themes']; }],
  ['wrong root specification', ({ lock }) => { lock.packages[''].dependencies['@pixel-brewery/mosaik-themes'] = '*'; }],
  ['missing installed direct package', ({ lock }) => { delete lock.packages['node_modules/@pixel-brewery/mosaik-themes']; }],
  ['mixed resolved direct release', ({ lock }) => { lock.packages['node_modules/@pixel-brewery/mosaik-themes'].version = '0.1.186'; }],
  ['mixed resolved nested release', ({ lock }) => { lock.packages['node_modules/other/node_modules/@pixel-brewery/mosaik-core'].version = '0.1.186'; }],
  ['missing Mosaik family', ({ manifest }) => { manifest.dependencies = {}; }],
  ['unsupported lockfile version', ({ lock }) => { lock.lockfileVersion = 2; }],
]) test(`rejects ${name}`, () => {
  // Arrange
  const state = fixture();
  alter(state);
  // Act and Assert
  assert.throws(() => verifyMosaikRelease(state.manifest, state.lock));
});
