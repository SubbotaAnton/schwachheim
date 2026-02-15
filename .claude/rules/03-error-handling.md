# Error Handling

- Handle errors at the right level. Don't catch what you can't meaningfully handle.
- Provide helpful error messages that explain what went wrong and ideally how to fix it.
- Fail fast on invalid input at system boundaries.
- Don't silently swallow errors. Log or propagate them.
- Distinguish between expected failures (validation) and unexpected errors (bugs).
