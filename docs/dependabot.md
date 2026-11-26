# Automatic dependency updates

Dependabot proposes all supported dependency updates, including major versions. Related framework packages are grouped. Updates merge only after the exact current head passes every configured verification job and GitHub enforces an up-to-date protected base. No review or protection bypass is used.

The trusted controller reads repository and PR metadata from the default branch. It never checks out PR code, installs its dependencies, or executes artifacts with write credentials. For the Nx workspace the controller lives in its existing executor owner; the privileged workflow uses the same dependency-free implementation directly as a deliberate security adaptation, avoiding a privileged package installation.

A stale branch is refreshed with its expected head and receives a fresh, read-only verification dispatch. That dispatch is bound to its requested SHA, uniquely associated with the same-repository Dependabot PR and verified again before a SHA-guarded squash merge. Failed or skipped checks block merging. A scheduled reconciliation resumes interrupted work.

Direct Mosaik dependencies declare one exact stable release in the manifest and lockfile root, and every direct or nested resolved Mosaik package must use that same release. The migration replaced `latest` with the version already resolved in each starter; it changed no installed artifacts. Dependabot's normal npm update path cannot update these coupled `latest` tags (`update_not_possible`), while a global `lockfile-only` strategy would exclude major updates to pinned tools. Exact declarations let the Mosaik group update the whole family together alongside unrestricted tooling updates.

Merges made with the native workflow token do not trigger normal push workflows. The controller explicitly requests source-bound main verification and, when affected, the existing Pages workflow, deduplicating prior dispatches. No package release is introduced.

If a token-authored repair or a later Dependabot rebase requires PR-workflow approval, the controller dispatches the same read-only CI at the unchanged exact head. It waits for an ordinary queued or running PR verification and never substitutes an approval decision for successful checks. Npm updates use `increase-if-necessary`; exact declarations can advance through major versions. A later approval-blocked PR attempt cannot replace an earlier successful dispatch as proof, while a later ordinary failed attempt still blocks merging.

CI verifies the complete direct Mosaik package set in both manifest and lockfile root, rejects tags/ranges/prereleases and mixed direct or nested versions, then runs the unchanged application lint, type, behavior and production-build checks. A partially published Mosaik family stays blocked until the group resolves coherently and passes the full checks.

Reconciliation isolates failures by pull request: a conflicting or concurrently changed bot branch cannot prevent other eligible updates from being processed. The controller reports the failed PR numbers and remains failed after the batch, preserving visibility and scheduled retries. API diagnostics include only the operation, endpoint and HTTP status; response bodies and credentials are omitted.
