# Security Analysis: Locale Poisoning → Arbitrary Code Execution

## Vulnerability Location

**File:** `scripts/util/gettext.js:87-108`

The `getPluralFunc()` function uses `new Function()` (an eval equivalent) to execute the `plural-forms` string from locale JSON files. A regex on line 91-93 is intended to validate the input, but the pattern is not anchored properly — arbitrary content can be appended after a valid prefix.

```javascript
// Line 102-107: hidden eval()
return new Function(
  "n",
  "var plural, nplurals; " +
    plural_form +  // <-- attacker-controlled string
    " return { nplurals: nplurals, plural: ... };"
);
```

## Attack Vector

A malicious `plural-forms` value in a locale JSON file (e.g., `locales/en_GB.json`) executes arbitrary JavaScript on page load when `TranslationProvider.jsx` loads the locale data.

## Worst-Case Impact: Full System Compromise

### Immediate (on page load, no user interaction):

1. **JWT Token Theft** — Auth token in `localStorage["token"]` is trivially exfiltrable. No CSP headers are configured.

2. **Full API Access** — Stolen Bearer token grants complete access to all endpoints. CORS is configured with `origins: "*"` + `supports_credentials: True`.

3. **Mass PII Exfiltration** — Constituent records (names, addresses, phone numbers, emails) and case data (immigration, benefits, housing, legal matters) can be silently dumped via `/constituents/search` and `/cases/search`.

4. **Case Manipulation** — PATCH/DELETE endpoints allow silent modification or destruction of case records.

5. **Email Impersonation** — `/emails` endpoint allows sending communications as the MP's office to constituents.

6. **Admin Escalation** — If an admin loads the poisoned page, attacker gains `canManageUsers`, `canDeleteCases`, full system control.

### Contributing Factors (Defense Gaps):

| Control | Status |
|---------|--------|
| Content-Security-Policy | Not configured |
| X-Frame-Options | Not configured |
| HSTS | Not configured |
| CORS | `origins: "*"` (all origins allowed) |
| Token storage | localStorage (XSS-accessible) |
| CSRF protection | None |

## Severity

**Critical** — Silent, pre-authentication arbitrary code execution affecting politically sensitive UK constituent casework data (GDPR-regulated, parliamentary data handling requirements).
