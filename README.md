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

This repository has its own framework/toolchain versions, Mosaik package declarations, lockfile and CI. It does not depend on an Nx workspace, a Mosaik checkout, the Studio API or a shared Mosaik release workflow.

Update this starter's framework independently, regenerate its lockfile with npm and run all verification commands. The application package is private to prevent accidental npm publication.

### Mosaik package updates

`.github/dependabot.yml` checks for Mosaik updates every day at 04:37 UTC, including weekends. Keep this configuration on the repository's default branch and enable Dependabot version updates. It groups `@pixel-brewery/mosaik-*` updates into one pull request, `package.json` declares every Mosaik package as `latest`, so updates change only `package-lock.json`. The lockfile pins the release, which keeps installations reproducible without manual version edits. Framework and toolchain updates remain separate.

CI requires every direct Mosaik package to declare `latest` and all locked Mosaik packages to resolve to the same exact stable release, then runs the checks below. If a release is still being published, a mixed-version update fails until the remaining packages are available and Dependabot refreshes it. Review and merge a successful update pull request to make that release the template's current version; automatic merging is not configured.

For automatic Dependabot authentication, grant this repository **Read** access in each Mosaik package's **Manage Actions access** settings. No long-lived Dependabot package token is needed. See [automatic Dependabot access to GitHub registries](https://docs.github.com/en/code-security/concepts/supply-chain-security/automatic-dependabot-access-to-github-registries). This does not replace the package-read token needed for local installation.

Authentication is kept in `.npmrc.auth` so Dependabot sees only the registry mapping in `.npmrc` and can use its automatic GitHub Packages credentials. Local npm commands and CI select `.npmrc.auth` with `NPM_CONFIG_USERCONFIG`; keep its token value in the environment.

Mosaik packages bypass the default Dependabot cooldown, so a newly published release is eligible at the next daily check.

## Continuous integration

The repository's CI checks Mosaik release consistency and runs a clean `npm ci`, lint, typecheck, behavior tests and production build. It uses its own GitHub Actions token with `contents: read` and `packages: read`; no reusable personal credential is stored in the workflow. If you change to private packages, grant that repository the required package access before expecting CI to install them.

CI runs on pushes, pull requests, merge queues and manual dispatches. The stable `Quality Gate` check succeeds only when the complete `verify` job succeeds; failure, cancellation or a skipped verification job fails the gate. Configure `Quality Gate` as a required branch check after this workflow revision is published and the check has run. Keep `verify` required during that rollout.

The dependency-free public-content guard runs in the existing verification job and rejects excluded private project references in tracked/new source paths, text, symbolic links and decoded gzip archives. Run `node tools/verify-public-content.mjs` and `node --test tools/verify-public-content.spec.mjs` locally. Ignored development output remains outside the source scan.

CI only verifies the application. It does not publish packages, create release tags or deploy a website.

## Bundle size

Each component is imported from its own entry, e.g. `@pixel-brewery/mosaik-elements-react/components/button`, and the theme service from its own Foundation module. The production build of this starter is about 830 kB of JavaScript before transfer compression; an import from the package root entry is supported as well, but the component entries keep the application to the components it uses whatever the bundler.

## License

[MIT](LICENSE).
