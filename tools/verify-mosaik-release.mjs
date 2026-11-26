// #region Imports
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
// #endregion

/**
 * Verifies exact declarations and one coherent resolved Mosaik release.
 * @param manifest - Parsed npm package manifest.
 * @param lock - Parsed npm version-three lockfile.
 * @returns The common exact stable Mosaik version.
 * @public
 */
export function verifyMosaikRelease(manifest, lock) {
  assert.equal(lock.lockfileVersion, 3, 'Expected npm lockfile version three');
  const groups = ['dependencies', 'devDependencies', 'optionalDependencies'];
  const mosaikEntries = (source) => groups.flatMap((group) =>
    Object.entries(source[group] ?? {}).filter(([name]) => name.startsWith('@pixel-brewery/mosaik-')),
  );
  const dependencies = mosaikEntries(manifest);
  assert(dependencies.length > 0, 'Expected Mosaik dependencies');
  const root = lock.packages?.[''];
  assert(root, 'Expected lockfile root package');
  const lockedEntries = mosaikEntries(root);
  assert.deepEqual(lockedEntries.map(([name]) => name).sort(), dependencies.map(([name]) => name).sort(),
    'Manifest and lockfile root must contain the same direct Mosaik package set');
  const stable = /^(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)$/u;
  const version = dependencies[0][1];
  assert.match(version, stable, 'Declare an exact stable Mosaik release');
  for (const group of groups) {
    for (const [name, declared] of Object.entries(manifest[group] ?? {})) {
      if (!name.startsWith('@pixel-brewery/mosaik-')) continue;
      assert.equal(declared, version, `${name} must declare Mosaik ${version}`);
      assert.equal(root[group]?.[name], version, `${name} lockfile root must match its declaration`);
      assert.equal(lock.packages[`node_modules/${name}`]?.version, version, `${name} must lock Mosaik ${version}`);
    }
  }
  for (const [path, dependency] of Object.entries(lock.packages)) {
    if (/(?:^|\/)node_modules\/@pixel-brewery\/mosaik-[^/]+$/u.test(path)) {
      assert.equal(dependency.version, version, `${path} must use Mosaik ${version}`);
    }
  }
  return version;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const manifest = JSON.parse(readFileSync('package.json', 'utf8'));
  const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
  console.log(`Mosaik ${verifyMosaikRelease(manifest, lock)}: exact manifest and lockfile family are consistent`);
}
