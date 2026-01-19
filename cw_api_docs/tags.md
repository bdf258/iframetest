# Tags API

This document covers endpoints for managing tags that can be applied to cases.

---

## Create Tag

**Endpoint:** `POST /api/ajax/tags`
**Authentication:** Required (JWT token)

### Description

Creates a new unique tag in the system.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tag` | String | Yes | The text of the tag to be created |

### Example Request

```json
{
  "tag": "High Priority"
}
```

### Response

**Status:** `201 Created`

```json
{
  "id": 7,
  "tag": "High Priority"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | Newly created tag ID |
| `tag` | String | Tag text |

### Error Responses

| Status | Description |
|--------|-------------|
| 400 | Tag text is required |
| 401 | Unauthorized - Invalid or missing JWT token |
| 409 | Tag already exists |

### Source Files

- **Frontend API:** `scripts/api/src/tags.js:13-22`

---

## Get Tag

**Endpoint:** `GET /api/ajax/tags/<tag_id>`
**Authentication:** Required (JWT token)

### Description

Retrieves a tag by its unique ID.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tag_id` | Number | Yes | The ID of the tag to retrieve |

### Example Request

```
GET /api/ajax/tags/1
```

### Response

**Status:** `200 OK`

```json
{
  "id": 1,
  "tag": "Urgent"
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Tag not found |

### Source Files

- **Frontend API:** `scripts/api/src/tags.js:31-40`

---

## Update Tag

**Endpoint:** `PATCH /api/ajax/tags`
**Authentication:** Required (JWT token)

### Description

Updates an existing tag's text.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | Number | Yes | The ID of the tag to update |
| `tag` | String | Yes | The new text for the tag |

### Example Request

```json
{
  "id": 1,
  "tag": "Very Urgent"
}
```

### Response

**Status:** `200 OK`

### Error Responses

| Status | Description |
|--------|-------------|
| 400 | Invalid request body |
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Tag not found |

### Source Files

- **Frontend API:** `scripts/api/src/tags.js:51-61`

---

## Delete Tag

**Endpoint:** `DELETE /api/ajax/tags/<tag_id>`
**Authentication:** Required (JWT token)

### Description

Permanently deletes a tag.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tag_id` | Number | Yes | The ID of the tag to delete |

### Example Request

```
DELETE /api/ajax/tags/7
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
| 404 | Tag not found |

### Source Files

- **Frontend API:** `scripts/api/src/tags.js:70-79`

---

## Search Tags

**Endpoint:** `POST /api/ajax/tags/search`
**Authentication:** Required (JWT token)

### Description

Searches for tags matching a term.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `term` | String | No | Search term to match tag text |

### Example Request

```json
{
  "term": "urgent"
}
```

### Response

**Status:** `200 OK`

```json
{
  "tags": [
    {
      "id": 1,
      "tag": "Urgent"
    },
    {
      "id": 7,
      "tag": "Very Urgent"
    }
  ]
}
```

### Source Files

- **Frontend API:** `scripts/api/src/tags.js:89-98`

---

## Merge Tags

**Endpoint:** `POST /api/ajax/managetags/merge`
**Authentication:** Required (JWT token)

### Description

Merges multiple tags into one master tag. All cases using the merged tags will be updated to use the master tag.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `idsToBeMerged` | Array\<Number\> | Yes | Array of tag IDs to be merged |
| `tagToMergeInto` | Object | Yes | The master tag object |
| `tagToMergeInto.id` | Number | Yes | ID of the master tag |
| `tagToMergeInto.tag` | String | Yes | Text of the master tag |

### Example Request

```json
{
  "idsToBeMerged": [7, 8, 9],
  "tagToMergeInto": {
    "id": 1,
    "tag": "Urgent"
  }
}
```

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "3 tags merged into 'Urgent'"
}
```

### Source Files

- **Frontend API:** `scripts/api/src/tags.js:112-121`

---

## Bulk Delete Tags

**Endpoint:** `POST /api/ajax/managetags/delete`
**Authentication:** Required (JWT token)

### Description

Deletes multiple tags at once.

### Request Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ids` | Array\<Number\> | Yes | Array of tag IDs to delete |

### Example Request

```json
{
  "ids": [7, 8, 9]
}
```

### Response

**Status:** `200 OK`

### Source Files

- **Frontend API:** `scripts/api/src/tags.js:130-141`

---

## Delete Tag If Not Used (Silent)

**Endpoint:** `DELETE /api/ajax/tags/silent/<tag_id>`
**Authentication:** Required (JWT token)

### Description

Silently deletes a tag only if it is not currently being used by any cases. Does not return an error if the tag is in use - simply does nothing.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tag_id` | Number | Yes | The ID of the tag to delete |

### Example Request

```
DELETE /api/ajax/tags/silent/7
```

### Response

**Status:** `200 OK`

### Source Files

- **Frontend API:** `scripts/api/src/tags.js:150-159`

---

## Tag IDs

> **Note:** Tag IDs are dynamically created per installation. Use the Tags Search API (`POST /api/ajax/tags/search`) or Get Tag endpoint to retrieve available tags for your installation. There are no standard predefined tag IDs.
