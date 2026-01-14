# Segments API

This document covers endpoints for managing segments (groups of constituents).

---

## Get Segment

**Endpoint:** `GET /api/ajax/segments/<segment_id>`
**Authentication:** Required (JWT token)

### Description

Retrieves a specific segment by its ID.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `segment_id` | Number | Yes | The unique ID of the segment |

### Example Request

```
GET /api/ajax/segments/5
```

### Response

**Status:** `200 OK`

```json
{
  "id": 5,
  "name": "VIP Constituents",
  "description": "High priority constituent group",
  "memberCount": 150,
  "created": "2024-01-01 10:00:00",
  "createdBy": 1
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | Segment unique identifier |
| `name` | String | Segment name |
| `description` | String | Segment description |
| `memberCount` | Number | Number of constituents in segment |
| `created` | String | Creation timestamp |
| `createdBy` | Number | User ID who created the segment |

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Unauthorized - Invalid or missing JWT token |
| 404 | Segment not found |

### Source Files

- **Frontend API:** `scripts/api/src/segments.js:4-5`
