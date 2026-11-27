# Automatic dependency updates

Dependabot proposes all supported dependency updates, including major versions, and groups related framework packages. Once every required check of a Dependabot pull request is green, `.github/workflows/dependabot-merge.yml` squash-merges it; GitHub still enforces the `main` ruleset on that merge. Because a merge made with the workflow token starts no push workflows, the same workflow then dispatches CI on `main` with the merge commit as `expected_head_sha`.

Updates the toolchain cannot use yet are excluded by a commented `ignore` entry in `.github/dependabot.yml`. TypeScript major updates stay excluded for now: TypeScript 7 is the native compiler and lacks the JavaScript API that the type-checking and linting tools call.
