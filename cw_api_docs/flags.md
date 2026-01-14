# Flags API

This document covers endpoints for managing flags that can be applied to constituents.

---

## Create Flag

**Endpoint:** `POST /api/ajax/flags`
**Authentication:** Required (JWT token)

### Description

Creates a new unique flag in the system.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `flag` | String | Yes | The text of the flag to be created |

### Example Request

```json
{
  "flag": "Do Not Contact"
}
```

### Response

**Status:** `201 Created`

```json
{
  "id": 10,
  "flag": "Do Not Contact"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | Newly created flag ID |
| `flag` | String | Flag text |

### Error Responses

| Status | Description |
|--------|-------------|
| 400 | Flag text is required |
| 401 | Unauthorized - Invalid or missing JWT token |
| 409 | Flag already exists |

### Source Files

- **Frontend API:** `scripts/api/src/flags.js:13-20`

---

## Get Flag

**Endpoint:** `GET /api/ajax/flags/<flag_id>`
**Authentication:** Required (JWT token)

### Description

Retrieves a flag by its unique ID.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `flag_id` | Number | Yes | The ID of the flag to retrieve |

### Example Request

```
GET /api/ajax/flags/1
```

### Response

**Status:** `200 OK`

```json
{
  "id": 1,
  "flag": "Vulnerable"
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Flag not found |

### Source Files

- **Frontend API:** `scripts/api/src/flags.js:29-36`

---

## Update Flag

**Endpoint:** `PATCH /api/ajax/flags`
**Authentication:** Required (JWT token)

### Description

Updates an existing flag's text.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | Number | Yes | The ID of the flag to update |
| `flag` | String | Yes | The new text for the flag |

### Example Request

```json
{
  "id": 1,
  "flag": "Very Vulnerable"
}
```

### Response

**Status:** `200 OK`

### Error Responses

| Status | Description |
|--------|-------------|
| 400 | Invalid request body |
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Flag not found |

### Source Files

- **Frontend API:** `scripts/api/src/flags.js:47-55`

---

## Delete Flag

**Endpoint:** `DELETE /api/ajax/flags/<flag_id>`
**Authentication:** Required (JWT token)

### Description

Permanently deletes a flag.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `flag_id` | Number | Yes | The ID of the flag to delete |

### Example Request

```
DELETE /api/ajax/flags/10
```

### Response

**Status:** `200 OK`

```json
{
  "success": true
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Flag not found |

### Source Files

- **Frontend API:** `scripts/api/src/flags.js:64-71`

---

## Search Flags

**Endpoint:** `POST /api/ajax/flags/search`
**Authentication:** Required (JWT token)

### Description

Searches for flags matching a term.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `term` | String | No | Search term to match flag text |

### Example Request

```json
{
  "term": "contact"
}
```

### Response

**Status:** `200 OK`

```json
{
  "flags": [
    {
      "id": 10,
      "flag": "Do Not Contact"
    }
  ]
}
```

### Source Files

- **Frontend API:** `scripts/api/src/flags.js:79-86`

---

## Merge Flags

**Endpoint:** `POST /api/ajax/manageflags/merge`
**Authentication:** Required (JWT token)

### Description

Merges multiple flags into one master flag. All constituents using the merged flags will be updated to use the master flag.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `idsToBeMerged` | Array\<Number\> | Yes | Array of flag IDs to be merged |
| `flagToMergeInto` | Object | Yes | The master flag object |
| `flagToMergeInto.id` | Number | Yes | ID of the master flag |
| `flagToMergeInto.flag` | String | Yes | Text of the master flag |

### Example Request

```json
{
  "idsToBeMerged": [10, 11, 12],
  "flagToMergeInto": {
    "id": 1,
    "flag": "Do Not Contact"
  }
}
```

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "3 flags merged into 'Do Not Contact'"
}
```

### Source Files

- **Frontend API:** `scripts/api/src/flags.js:100-107`

---

## Bulk Delete Flags

**Endpoint:** `POST /api/ajax/manageflags/delete`
**Authentication:** Required (JWT token)

### Description

Deletes multiple flags at once.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ids` | Array\<Number\> | Yes | Array of flag IDs to delete |

### Example Request

```json
{
  "ids": [10, 11, 12]
}
```

### Response

**Status:** `200 OK`

### Source Files

- **Frontend API:** `scripts/api/src/flags.js:116-123`

---

## Add Flags to Segment

**Endpoint:** `POST /api/ajax/flags/flagsToSegment`
**Authentication:** Required (JWT token)

### Description

Adds flags to a segment of constituents.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `segmentId` | Number | Yes | The segment to apply flags to |
| `flagIds` | Array\<Number\> | Yes | Array of flag IDs to apply |

### Example Request

```json
{
  "segmentId": 5,
  "flagIds": [1, 2, 3]
}
```

### Response

**Status:** `200 OK`

### Source Files

- **Frontend API:** `scripts/api/src/flags.js:131-138`
