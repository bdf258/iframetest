# Claude Skill: API Endpoint Documentation

This skill provides best practices for analyzing API routes, identifying parameters, and creating documentation files for this codebase.

## Overview

The **frontend API client code** (`scripts/api/src/`) is the source of truth for API documentation. The `server/` directory contains only a mock server for local development and should not be used as a reference for API specifications.

When documenting a new API endpoint, follow these steps to ensure comprehensive and accurate documentation.

---

## Step 1: Locate the API Function

### Frontend API Client (JavaScript)

Search for API calls in `scripts/api/src/`:

```javascript
// Pattern to look for:
const functionName = async (param1, param2, modalActions, iln) =>
  await post("/endpoint", payload).catch(...)
```

**Key files:**
- `scripts/api/src/case.js` - Single case operations (CRUD, merge, statistics)
- `scripts/api/src/cases.js` - Case search/listing
- `scripts/api/src/search.js` - Universal search
- `scripts/api/src/auth.js` - Authentication

### API Index Files

Check for available endpoints:
- `scripts/api/protected.index.js` - All protected (authenticated) API functions
- `scripts/api/public.index.js` - Public API functions

---

## Step 2: Identify Parameters from JSDoc

### Read JSDoc Comments

The primary source for parameter information is JSDoc comments above each function:

```javascript
/**
 * Create a new case.
 * @param {Object} payload - The payload passed to the backend.
 * @param {String} payload.reviewDate - (optional) The date string of when the case is up for review.
 * @param {String} payload.contactTypeID - The ID of the contact type of the case.
 * @param {String} payload.constituentID - The ID of the constituent this case belongs to.
 * @param {String} payload.caseTypeID - The ID of the case type of the case.
 * @param {String} payload.statusID - The ID of the status of the case.
 * @param {String} payload.categoryTypeID - The ID of the category of the case.
 * @param {String} payload.assignedToID - The ID of the user assigned to the case.
 * @param {String} payload.summary - The text of the summary of the case.
 * @param {function} modalActions - a func that sets the global modal content.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const createCase = async (payload, modalActions, iln) =>
  await post("/cases", payload).catch(...)
```

### Extract Parameter Information

From JSDoc, identify:
- **Parameter name** - e.g., `payload.contactTypeID`
- **Type** - e.g., `String`, `Number`, `Array<Number>`, `Object`
- **Required vs Optional** - Look for "(optional)" in description
- **Description** - What the parameter represents

### URL Parameters

Look for template literals in the endpoint path:

```javascript
await get(`/cases/${caseID}`)     // caseID is a URL parameter
await post(`/cases/${id}/merge`)  // id is a URL parameter
```

---

## Step 3: Analyze the HTTP Method

### Identify the Fetch Utility Used

```javascript
import { deleteReq, get, patch, post } from "./util/fetch";
```

| Utility | HTTP Method | Typical Use |
|---------|-------------|-------------|
| `get()` | GET | Retrieve data |
| `post()` | POST | Create or search |
| `patch()` | PATCH | Partial update |
| `deleteReq()` | DELETE | Remove data |

### Check `scripts/api/src/util/fetch.js`

This file contains the base HTTP utilities and shows:
- Base URL construction
- Token handling
- Request/response processing

---

## Step 4: Cross-Reference with Component Usage

### Find Where API Functions Are Called

Search for usage in components to understand:
- What payload shapes are actually used
- How responses are processed
- Error handling expectations

```bash
grep -r "createCase\|caseAPI.createCase" scripts/
```

### Check Route Initialization Files

Look in `scripts/routes/` for page initialization that uses these APIs:
- `scripts/routes/viewcase.js`
- `scripts/routes/casespage.js`
- `scripts/routes/createcase.js`

---

## Step 5: Create Documentation File

### File Naming Convention

Use lowercase kebab-case matching the operation:
- `create-case.md`
- `get-case.md`
- `update-case.md`
- `advanced-search.md`

### Required Sections

```markdown
# Endpoint Name

**Endpoint:** `METHOD /api/ajax/path`
**Authentication:** Required (JWT token)

## Description
[Brief description of what the endpoint does]

## URL Parameters
[Table of URL path parameters]

## Request Body Parameters
[Table of body parameters with type, required, description]

## Parameter Values
[Reference tables for enum-like parameters - note these need backend verification]

## Example Request
[JSON example]

## Response
[Status code and JSON example]

## Response Fields
[Table explaining response fields]

## Error Responses
[Table of possible error status codes]

## Source Files
[Link to frontend source file with line numbers]
```

### Note About Parameter Values

For ID-based parameters (statusID, caseTypeID, etc.), include a note that values should be verified against the actual backend:

```markdown
> **Note:** These ID mappings are placeholders. Verify against the actual backend API.
```

---

## Step 6: Update the Guide

Add an entry to `GUIDE.md`:

```markdown
| `/api/ajax/new-endpoint` | METHOD | [new-endpoint.md](./new-endpoint.md) | Brief description |
```

---

## Checklist for Complete Documentation

- [ ] API function located in `scripts/api/src/`
- [ ] HTTP method identified (get/post/patch/deleteReq)
- [ ] URL parameters documented from template literals
- [ ] Request body parameters extracted from JSDoc
- [ ] Optional vs required parameters marked
- [ ] Default values noted where specified
- [ ] Placeholder values for enums noted as needing verification
- [ ] Example request provided
- [ ] Response format documented (if observable from code)
- [ ] Error handling documented
- [ ] Frontend source file location included
- [ ] GUIDE.md updated with new entry

---

## Example Analysis Session

### Task: Document a new endpoint

1. **Find the API function:**
   ```bash
   grep -rn "functionName" scripts/api/src/
   ```

2. **Read the JSDoc and function:**
   ```javascript
   /**
    * @param {Object} payload
    * @param {Number} payload.fieldA - Required field
    * @param {String} [payload.fieldB] - Optional field
    */
   const functionName = async (payload, modalActions, iln) =>
     await post("/endpoint", payload).catch(...)
   ```

3. **Identify the endpoint path and method** from the function body

4. **Check for URL parameters** in template literals

5. **Search for usage examples** in components/routes

6. **Create documentation file** following template

7. **Update GUIDE.md** with new entry

---

## Tips

- **JSDoc is the primary source** - The frontend code documents what parameters are expected
- **Watch for optional markers** - "(optional)" in descriptions or `[param]` syntax
- **Type annotations matter** - `Array<Number>` vs `Number` changes how parameters work
- **Check nested objects** - `payload.dateRange.from` indicates nested structure
- **Include line numbers** - Makes future updates easier
- **Note verification needs** - ID values need backend confirmation
