### feat(executors): bound per-seat retry budget before combo fallback

- In combo routing and retry handling, bound retry time per member seat via `SEAT_ATTEMPT_BUDGET_MS` and `providerOverrides.seatBudgetMs` (porting upstream `decolua/9router` PR #5341).
- Vetoes retries in `retryTransientUpstream` when elapsed seat time exceeds the allocated budget, preventing multi-retry stalls (4 attempts + delay burn) from exhausting downstream client deadlines. Initial connection attempt remains bounded by `ResponseHeaderTimeout`.
- Hoisted `GetSettings()` outside the candidate loop in `combo.go` with error logging.
- Added load-bearing unit tests in `internal/handlers/chat/combo_seat_budget_test.go`.
