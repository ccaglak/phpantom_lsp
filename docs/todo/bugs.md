# PHPantom — Bug Fixes

Known bugs and incorrect behaviour. These are distinct from feature
requests — they represent cases where existing functionality produces
wrong results. Bugs should generally be fixed before new features at
the same impact tier.

Items are ordered by **impact** (descending), then **effort** (ascending)
within the same impact tier.

| Label      | Scale                                                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Impact** | **Critical**, **High**, **Medium-High**, **Medium**, **Low-Medium**, **Low**                                           |
| **Effort** | **Low** (≤ 1 day), **Medium** (2-5 days), **Medium-High** (1-2 weeks), **High** (2-4 weeks), **Very High** (> 1 month) |

---

#### B4. Variable reassignment loses type when parameter name is reused

| | |
|---|---|
| **Impact** | Medium |
| **Effort** | Medium |

When a method parameter is reassigned mid-body, PHPantom sometimes
continues to use the parameter's original type instead of the new
assignment's type.

**Observed:** In `FileUploadService::uploadFile()`, the `$file`
parameter is typed `UploadedFile`. Later, `$file = $result->getFile()`
reassigns it to a different type. PHPantom still resolves `$file->id`
and `$file->name` against `UploadedFile` instead of the model returned
by `getFile()`. This produces 2 false-positive "not found" diagnostics.

**Fix:** The variable resolution pipeline should prefer the most recent
assignment when multiple definitions exist for the same variable name
within the same scope at the cursor offset.

