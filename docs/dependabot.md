# Automatic dependency updates

Dependabot proposes all supported dependency updates, including major versions, and groups related framework packages. Once every required check of a Dependabot pull request is green, `.github/workflows/dependabot-merge.yml` squash-merges it; GitHub still enforces the `main` ruleset on that merge. Because a merge made with the workflow token starts no push workflows, the same workflow then dispatches CI on `main` with the merge commit as `expected_head_sha`.
