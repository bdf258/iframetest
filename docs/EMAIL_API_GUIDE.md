# Email API Endpoints Guide

## Overview

This guide documents the legacy API's email endpoints, focusing on fetching email bodies efficiently.

**Key Finding:** There is NO bulk endpoint that returns email bodies. The `searchInbox` and `emailSearch` endpoints return lightweight responses without `htmlBody`. To get email bodies, you must use the individual `GET /emails/:id` endpoint.

---

## Endpoints Summary

| Endpoint | Method | Returns Body? | Use Case |
|----------|--------|---------------|----------|
| `/inbox/search` | POST | **NO** | List inbox items (lightweight) |
| `/emails/search` | POST | **NO** | Search emails by criteria (lightweight) |
| `/emails/:id` | GET | **YES** | Fetch single email with full body |

---

## Endpoint Details

### 1. Inbox Search (No Body)

**Endpoint:** `POST /api/ajax/inbox/search`

**Request:**
```json
{
  "page": 1,
  "limit": 100,
  "filters": {
    "actioned": false,
    "type": "received",
    "dateFrom": "2024-01-01",
    "dateTo": "2024-12-31"
  }
}
```

**Response:**
```json
{
  "items": [
    {
      "id": 1001,
      "type": "received",
      "subject": "Re: Housing Application",
      "from": "constituent@example.com",
      "received": "2024-01-15T10:30:00Z",
      "actioned": false
    }
  ],
  "totalResults": 150,
  "page": 1
}
```

**Fields returned:** `id`, `type`, `subject`, `from`, `received`, `actioned`
**Fields NOT returned:** `htmlBody`, `to`, `cc`, `bcc`, `caseID`, `constituentID`

---

### 2. Email Search (No Body)

**Endpoint:** `POST /api/ajax/emails/search`

**Request:**
```json
{
  "page": 1,
  "limit": 50,
  "subject": "housing",
  "from": "constituent@example.com",
  "body": "application",
  "type": ["received", "sent"],
  "caseWorkerIds": [10, 11]
}
```

**Response:** Returns lightweight email metadata, NOT full bodies.

---

### 3. Get Single Email (With Body)

**Endpoint:** `GET /api/ajax/emails/:id`

**Response:**
```json
{
  "id": 1001,
  "type": "received",
  "subject": "Re: Housing Application",
  "from": "constituent@example.com",
  "to": ["office@parliament.uk"],
  "cc": [],
  "bcc": [],
  "htmlBody": "<p>Dear MP,</p><p>I am writing regarding...</p>",
  "actioned": false,
  "assignedToID": 10,
  "caseID": 42,
  "constituentID": 500,
  "receivedAt": "2024-01-15T10:30:00Z",
  "sentAt": null,
  "scheduledAt": null
}
```

**This is the ONLY endpoint that returns `htmlBody`.**

---

## Recommended Approach for Syncing Email Bodies

Since there is no bulk endpoint that returns email bodies, here are the options ranked by efficiency:

### Option 1: Lazy Loading (Fewest API Calls - Recommended)

Fetch bodies on-demand when needed, not during sync.

```
Sync Process:
1. POST /inbox/search → get email IDs and metadata
2. Save emails to local DB with htmlBody = NULL

Triage/View Process:
1. Check if local email has htmlBody
2. If NULL: GET /emails/:id → fetch and cache body
3. Update local record with body
```

**Pros:**
- Minimizes API calls (only fetches bodies for emails that are actually viewed)
- Fast initial sync
- Already implemented in ProcessEmail use case

**Cons:**
- First view of each email has slight delay

---

### Option 2: Background Hydration (Balance)

Sync metadata first, then backfill bodies in background.

```
Immediate Sync:
1. POST /inbox/search → get all email metadata
2. Save emails with htmlBody = NULL

Background Job (lower priority):
3. For each email where htmlBody IS NULL:
   - GET /emails/:id
   - Update local record with body
   - Rate limit: 10 requests/second
```

**Pros:**
- Initial sync is fast
- Bodies eventually available without on-demand delay
- Can prioritize recent/unactioned emails

**Cons:**
- More API calls than lazy loading
- Background job complexity

---

### Option 3: Batch Fetch During Sync (Most API Calls)

Fetch all bodies immediately after sync.

```
1. POST /inbox/search → get email IDs
2. For each new email ID:
   - GET /emails/:id → fetch full email with body
3. Save complete emails to local DB
```

**Pros:**
- All data immediately available

**Cons:**
- Slow sync (N+1 API calls for N emails)
- Many calls for emails that may never be viewed
- Risk of rate limiting

---

## Implementation Recommendation

**Use Option 1 (Lazy Loading)** - this is already implemented correctly in the triage flow at `server/src/application/use-cases/triage/ProcessEmail.ts:62-94`.

The sync job should:
1. Call `searchInbox` to get email IDs and metadata
2. Save emails with `htmlBody = NULL`
3. Not attempt to fetch bodies during sync

When an email is processed/viewed:
1. Check if `htmlBody` is NULL
2. If NULL, call `getEmail(id)` to fetch the full email
3. Update the local record with the body
4. Return the complete email

This approach:
- Uses the fewest API calls
- Only fetches data that's actually needed
- Matches the existing ProcessEmail implementation

---

## Test Server Verification

The test server at `C:\Users\bdunn\testserver\src` correctly implements this behavior:

### inbox.js (lines 29-36)
```javascript
const items = paged.map(e => ({
  id: e.id,
  type: e.type,
  subject: e.subject,
  from: e.from,
  received: e.receivedAt,
  actioned: e.actioned,
}));
```
**Correct:** Does NOT include `htmlBody` in search results.

### emails.js (lines 5-14)
```javascript
router.get('/emails/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const email = store.emails.find(e => e.id === id);
  if (!email) {
    return res.status(404).json({ error: 'Email not found' });
  }
  res.json(email);  // Returns full email including htmlBody
});
```
**Correct:** Returns the complete email object including `htmlBody`.

---

## API Authentication

All endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

---

## Related Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/emails` | POST | Create draft email |
| `/emails/:id` | PATCH | Update email |
| `/emails/:id/send` | POST | Send email |
| `/emails/bulkactions/markasactioned` | POST | Bulk mark as actioned |
| `/emails/:id/attach` | POST | Add attachment |
| `/emails/attachments/:id` | DELETE | Delete attachment |
| `/emails/attachments/:id/content` | GET | Get attachment content |
