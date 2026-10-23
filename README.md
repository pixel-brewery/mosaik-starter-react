# Mosaik starter · React

A standalone **React + TypeScript + Vite** application using the published Mosaik design system. Use GitHub's **Use this template** button to create your own repository, then install and run it independently.

## Requirements

- Node.js 24.15 or later in the 24 LTS line; `.node-version` selects Node 24. Node 26 is also supported.
- npm (the lockfile is committed).
- A GitHub personal access token (classic) with **read:packages**, because Mosaik packages are hosted on GitHub Packages. Public GitHub npm packages still require registry authentication.

## Install and run

Set `MOSAIK_PACKAGES_TOKEN` in your shell using your own package-read token. Do not commit its value. The checked-in `.npmrc` contains only the registry mapping and the environment-variable reference.

```sh
export MOSAIK_PACKAGES_TOKEN='<your read:packages token>'
npm ci
npm run dev
```

Use the local URL printed by the development server. The sample demonstrates Mosaik components, Joy theme initialization, Lucide icons and a counter controlled by this application's own code.

A `.env` file alone is not sufficient for `npm ci`: npm reads the registry credential before Vite or Angular loads application environment files. Export the variable in the shell or supply it through your development environment's secret manager. The token is not used by browser code.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Check source and configuration |
| `npm run typecheck` | Check TypeScript and framework templates |
| `npm test` | Run the counter behavior test |
| `npm run build` | Create a production build |
| `npm run preview` | Serve the production build locally |

Run `npm run build` before `npm run preview`.

## Make it your own

- Start with `src/App.tsx` for the example UI and local state.
- `src/mosaik.ts` initializes the public Mosaik runtime, Joy theme and Lucide icon names.
- `src/styles.css` contains the responsive sample layout using Mosaik theme tokens.
- The HTML entry loads Nunito from Google Fonts; applications with an offline or self-hosted font policy can replace that link.

The example adapts the Mosaik Studio catalog recipe `recipe-empty-state-card--with-action`, validated through Mosaik Beta. Its counter is local UI state; no backend or Studio connection is required.

## Independent maintenance

This repository has its own framework/toolchain versions, Mosaik package pins, lockfile and CI. It does not depend on an Nx workspace, a Mosaik checkout, the Studio API or a shared Mosaik release workflow.

Update this starter's framework independently, regenerate its lockfile with npm and run all verification commands. Upgrade Mosaik packages as a separate deliberate change, keeping related Mosaik packages on a compatible version. No framework or Mosaik upgrade is performed automatically. The application package is private to prevent accidental npm publication.

## Continuous integration

The repository's CI runs a clean `npm ci`, lint, typecheck, behavior tests and production build. It uses its own GitHub Actions token with `contents: read` and `packages: read`; no reusable personal credential is stored in the workflow. If you change to private packages, grant that repository the required package access before expecting CI to install them.

CI only verifies the application. It does not publish packages, create release tags or deploy a website.

## Current published-package limitations

The published `mosaik-elements` core package has inconsistent import/folder casing in 0.1.174–0.1.177, which breaks Linux builds. This starter therefore uses an explicit npm override for **`@pixel-brewery/mosaik-elements@0.1.171`**, while the framework/Foundation/theme/icon packages remain pinned at 0.1.177. The public core type contracts match; 16 of 17 runtime modules are unchanged apart from path casing. The older core retains its earlier `orderBy` sorting behavior and does not contain the later sorting corrections. The demo does not use those helpers. See [the packaging issue and removal prerequisite](https://github.com/RueDeRennes/mosaik/issues/770).

Keep this override until the owner publishes a corrected core version and you verify the new version on a case-sensitive system. To adopt that release, update the relevant Mosaik pins, remove the override, regenerate the lockfile and run all checks in this repository.

Mosaik 0.1.177's supported root entry points retain a large core component/style graph even for this small example. Production entry bundles are currently approximately 14–15 MB before transfer compression. This starter preserves the supported APIs; it does not patch dependencies or suppress component registration. See [the package-boundary issue](https://github.com/RueDeRennes/mosaik/issues/964).

Published dependency source maps currently refer to sources absent from the installed packages, so tests can emit third-party source-map warnings. They do not prevent the verification commands from passing. See [the source-map issue](https://github.com/RueDeRennes/mosaik/issues/963).

## License

[MIT](LICENSE).
