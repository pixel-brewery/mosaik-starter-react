# Mosaik starter · React

A standalone **React + TypeScript + Vite** application using the published Mosaik design system. Use GitHub's **Use this template** button to create your own repository, then install and run it independently.

## Requirements

- Node.js 24.15 or later in the 24 LTS line; `.node-version` selects Node 24. Node 26 is also supported.
- npm (the lockfile is committed).
- A GitHub personal access token (classic) with **read:packages**, because Mosaik packages are hosted on GitHub Packages. Public GitHub npm packages still require registry authentication.

## Install and run

Set `MOSAIK_PACKAGES_TOKEN` in your shell using your own package-read token. Do not commit its value. The checked-in `.npmrc` maps the package scope to GitHub Packages. `.npmrc.auth` contains only an environment-variable reference for authentication; select it as the npm user configuration below.

```sh
export MOSAIK_PACKAGES_TOKEN='<your read:packages token>'
export NPM_CONFIG_USERCONFIG="$PWD/.npmrc.auth"
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

Update this starter's framework independently, regenerate its lockfile with npm and run all verification commands. The application package is private to prevent accidental npm publication.

### Mosaik package updates

`.github/dependabot.yml` checks for Mosaik updates every day at 04:37 UTC, including weekends. Keep this configuration on the repository's default branch and enable Dependabot version updates. It groups `@pixel-brewery/mosaik-*` updates into one pull request, keeping exact versions in `package.json` and updating `package-lock.json` together. This removes manual version edits while keeping installations reproducible. Framework and toolchain updates remain separate.

CI requires all direct and locked Mosaik packages to use the same exact stable release, then runs the checks below. If a release is still being published, a mixed-version update fails until the remaining packages are available and Dependabot refreshes it. Review and merge a successful update pull request to make that release the template's current version; automatic merging is not configured.

For automatic Dependabot authentication, grant this repository **Read** access in each Mosaik package's **Manage Actions access** settings. No long-lived Dependabot package token is needed. See [automatic Dependabot access to GitHub registries](https://docs.github.com/en/code-security/concepts/supply-chain-security/automatic-dependabot-access-to-github-registries). This does not replace the package-read token needed for local installation.

Authentication is kept in `.npmrc.auth` so Dependabot sees only the registry mapping in `.npmrc` and can use its automatic GitHub Packages credentials. Local npm commands and CI select `.npmrc.auth` with `NPM_CONFIG_USERCONFIG`; keep its token value in the environment.

Mosaik packages bypass the default Dependabot cooldown, so a newly published release is eligible at the next daily check.

## Continuous integration

The repository's CI checks Mosaik release consistency and runs a clean `npm ci`, lint, typecheck, behavior tests and production build. It uses its own GitHub Actions token with `contents: read` and `packages: read`; no reusable personal credential is stored in the workflow. If you change to private packages, grant that repository the required package access before expecting CI to install them.

CI only verifies the application. It does not publish packages, create release tags or deploy a website.

## Current published-package limitations

Mosaik's supported root entry points retain a large core component/style graph even for this small example. Production entry bundles are currently approximately 14–16 MB before transfer compression. This starter preserves the supported APIs; it does not patch dependencies or suppress component registration. See [the package-boundary issue](https://github.com/RueDeRennes/mosaik/issues/964).

Published dependency source maps currently refer to sources absent from the installed packages, so tests can emit third-party source-map warnings. They do not prevent the verification commands from passing. See [the source-map issue](https://github.com/RueDeRennes/mosaik/issues/963).

## License

[MIT](LICENSE).
