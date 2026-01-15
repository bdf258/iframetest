# Configuration API

This document covers endpoints for retrieving application configuration and current user information.

---

## Get Application Configuration

**Endpoint:** `GET /aj_config.php`
**Authentication:** Required (session cookie)

### Description

Retrieves the application configuration settings for the current installation. This includes system-wide settings, feature flags, and installation-specific configuration.

### Example Request

```
GET /aj_config.php
```

### Response

**Status:** `200 OK`
**Content-Type:** `text/html; charset=UTF-8` (returns JSON)

Returns a JSON object containing configuration settings for the current installation.

### Request Headers

| Header | Value | Description |
|--------|-------|-------------|
| `X-Requested-With` | `XMLHttpRequest` | Identifies as AJAX request |
| `Accept` | `application/json, text/javascript, */*; q=0.01` | Expected response type |

### Notes

- Called on page load to initialize application settings
- Response is cached client-side for the session
- Configuration may vary by subdomain/installation

---

## Get Current User

**Endpoint:** `GET /aj_getCurrentUser.php`
**Authentication:** Required (session cookie)

### Description

Retrieves information about the currently logged-in user, including their caseworker ID, permissions, and preferences.

### Example Request

```
GET /aj_getCurrentUser.php
```

### Response

**Status:** `200 OK`
**Content-Type:** `text/html; charset=UTF-8` (returns JSON)

Returns a JSON object containing the current user's details.

### Expected Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `caseworkerID` | Number | The current user's caseworker ID |
| `name` | String | User's display name |
| `email` | String | User's email address |
| `permissions` | Object | User permission flags |

### Notes

- Used to populate user-specific UI elements
- Called during session initialization

---

## Get Alternate Sender Emails

**Endpoint:** `GET /aj_getAltSenderEmails.php`
**Authentication:** Required (session cookie)

### Description

Retrieves a list of alternate email addresses that the specified caseworker can send emails from.

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `caseworker` | Number | Yes | The caseworker ID to get alternate emails for |

### Example Request

```
GET /aj_getAltSenderEmails.php?caseworker=9
```

### Response

**Status:** `200 OK`

Returns a JSON array of alternate sender email addresses available to the specified caseworker.

### Notes

- Used when composing emails to allow sending from shared or role-based email addresses
- The available alternate addresses depend on the caseworker's permissions

---

## Get Localization Strings

**Endpoint:** `GET /locales/en_GB.json`
**Authentication:** None required (static file)

### Description

Retrieves localization strings for the UK English locale. This file contains translations and locale-specific terminology (e.g., "Voter" to "Constituent" mappings).

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `{timestamp}` | String | No | Cache-busting timestamp (e.g., `20260112_111424`) |

### Example Request

```
GET /locales/en_GB.json?20260112_111424
```

### Response

**Status:** `200 OK`
**Content-Type:** `application/json`

```json
{
  "": {
    "language": "en_GB",
    "plural-forms": "nplurals=2; plural=(n != 1);"
  },
  "Status": "Status",
  "Voter": "Constituent",
  "Voters": "Constituents",
  "Federal": "UK",
  "State": "County",
  "Suburb": "Town",
  "Federal VI": "W'minster VI",
  "State VI": "Local VI",
  "Reference 1": "HO Ref.",
  "Reference 2": "NI Number",
  "Constituency": "Constituency"
}
```

### Response Fields

The response is a key-value object where:
- Keys are the original/default terms
- Values are the localized equivalents

### Common Translations (en_GB)

| Original Term | UK Translation |
|--------------|----------------|
| Voter | Constituent |
| Voters | Constituents |
| Federal | UK |
| State | County |
| Suburb | Town |
| Federal VI | W'minster VI (Westminster Voting Intention) |
| State VI | Local VI (Local Voting Intention) |
| Reference 1 | HO Ref. (Home Office Reference) |
| Reference 2 | NI Number (National Insurance Number) |

### Notes

- This is a static JSON file served by Apache
- The locale file enables the system to be used for UK MP casework (originally designed for other electoral systems)
- Timestamp query parameter is used for cache invalidation after updates
