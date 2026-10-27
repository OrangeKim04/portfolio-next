# Backend project evidence — 2026-10-26

Latest default branches read with GitHub API (raw README, PR metadata/diffs, commit metadata/diffs and repository tree). No source files edited.

## Sources and revisions
- PlanUp develop: `763cc88e1f247c793746eacf0acecaa31e77d7bf`.
- PMS main: `d21cdddb3b50ef88e1f7a0bb9c703a1a3480f752`.
- Spring main: `4b0aa74bfbee6e49a60856716468621546e43a17`.

Links are included in backend-updates.json. Personal contributions are attributed only to OrangeKim04-authored PRs/commits.

## Required removals / uncertainties
- All three exact project periods and team counts are not supported by the READMEs inspected. Remove published period/team claims or obtain a repository-based source. Repository timestamps do not establish project duration. Existing startDate may only remain as internal ordering metadata, not evidence of project dates.
- PlanUp README team table conflicts: it links 권도희 to OrangeKim04 and 김규리 to seamooll. Do not reproduce its name/account mapping or infer whole-team count from backend contributors. Existing UMC 8기/activity and 10-person team breakdown not verified. Docker is explicitly future work, not implemented technology.
- PMS: remove 100명/100만 건, 0.547→0.000초, B-Tree optimization, four-stage join reduction, denormalization performance, Railway operational claims unless another GitHub repository supplies supporting artifacts. Current tree has no SQL benchmark/seed artifacts. README explicitly says no seed SQL/loader. Do not attribute teammate-owned project list/dashboard or peer evaluation implementation to OrangeKim04.
- PMS README supports weighted rule-based ranking (30/30/40), not AI/ML recommendation, top five and required skills/job filters. Current source confirms it. No production scalability/performance claim justified.
- Spring is a learning archive. Keep learning language; do not turn singleton-state discussion into a production concurrency incident. Exact date and one-person team metadata not in README.

## Concrete troubleshooting evidence
- PlanUp #61 merge `eacc298f6dd194ce977681bc57ad9e0c97697468`: supportsParameter incorrectly compared User for Long, fixed Long/User matching; resolveArgument returns ID for Long without repository lookup. Supports code-level removal of findById, not measured SQL performance gains.
- PlanUp #115 merge `7b92ff61f2a2894151681a43eee2db23fc3d3ecf`: token deleted before email change; deletion moved after completion.
- PlanUp #66 merge `ca5f9ebaa36bfd7773d159cbacb77e17b6f2ddeb`: friend's actual goal count/activity/photo status and duplicate removal. Extra timer exception handling was not revalidated; replacement troubleshooting avoids relying on it.
- PMS `b1c04d9855d2b7ff9ac3cc96e53e69d02241bb30`: changed findByProjectIds to findMyEvaluationsInProjects(projectIds,employeeId), native SQL left joins peer/PM/customer evaluations and filters their evaluated_id. Clear real correction with diff, preferable to unsupported benchmark claims.
- PMS `701250a93f1fa6f59e7cdfa0cd3833b9025ca14e`: response recommendation explanation changed String→List<String>; item/score/narrative formatting, legacy-column join storage.
- PMS `0c2a1e83b14cb0ae8e65e653392ce8585c37e2a0`: project registration/client listing, author OrangeKim04.
