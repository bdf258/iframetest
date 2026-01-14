# Claude Skill: API Endpoint Documentation

This skill provides best practices for analyzing API routes, identifying parameters, and creating documentation files for this codebase.

## Overview

When documenting a new API endpoint, follow these steps to ensure comprehensive and accurate documentation.

---

## Step 1: Locate the Route Definition

### Backend Routes (Flask/Python)

Search for route definitions in `server/routes/`:

```python
# Pattern to look for:
@blueprint.route('/endpoint', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def handler_function():
    ...
```

**Key files:**
- `server/routes/cases.py` - Case CRUD and search operations
- `server/routes/auth.py` - Authentication endpoints
- `server/routes/caseworkers.py` - Caseworker endpoints

### Frontend API Client (JavaScript)

Search for API calls in `scripts/api/src/`:

```javascript
// Pattern to look for:
const functionName = async (param1, param2, modalActions, iln) =>
  await post("/endpoint", payload).catch(...)
```

**Key files:**
- `scripts/api/src/case.js` - Single case operations
- `scripts/api/src/cases.js` - Case search/listing
- `scripts/api/src/search.js` - Universal search

---

## Step 2: Identify Parameters

### URL Parameters

Look for dynamic segments in the route path:

```python
@cases_bp.route('/cases/<int:case_id>', methods=['GET'])
#                        ^^^^^^^^^^^^
#                        URL parameter: case_id (integer)
```

### Request Body Parameters

Examine:

1. **Docstrings** - Often contain expected payload structure:
   ```python
   """
   Expected payload:
   {
       "field1": value,
       "field2": value
   }
   """
   ```

2. **`request.get_json()`** - Shows that JSON body is expected

3. **Field access patterns**:
   ```python
   data.get('fieldName', default_value)  # Optional with default
   data['fieldName']                      # Required field
   ```

4. **Frontend JSDoc comments**:
   ```javascript
   /**
    * @param {Object} payload
    * @param {String} payload.fieldName - Description
    */
   ```

### Query Parameters

Look for `request.args.get()` patterns:

```python
page = request.args.get('page', 1, type=int)
```

---

## Step 3: Trace Data Flow

### Find the Data Handler

Routes often call functions from the `data` module:

```python
from data import get_case_by_id, update_case, search_cases
```

Check `server/data/mock_data.py` for:
- Actual parameter processing logic
- Valid values for enum-like fields
- Filter/sort implementations

### Example: Tracing `search_cases`

```python
# In routes/cases.py:
result = search_cases(filters)

# In data/mock_data.py:
def search_cases(filters):
    # Filter by status
    if filters.get("statusID") and len(filters["statusID"]) > 0:
        results = [c for c in results if c["status"] in filters["statusID"]]
```

This reveals:
- `statusID` is an optional array parameter
- It filters cases by status field
- Empty array means no filtering

---

## Step 4: Identify Valid Values

### Reference Data Constants

Check `server/data/mock_data.py` for ID mappings:

```python
STATUSES = {
    1: "Open",
    2: "In Progress",
    ...
}

CASE_TYPES = {
    1: "Housing",
    2: "Benefits",
    ...
}
```

### Document All Valid Options

Create reference tables for each enum-like parameter.

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
[Reference tables for enum-like parameters]

## Example Request
[JSON example]

## Response
[Status code and JSON example]

## Response Fields
[Table explaining response fields]

## Error Responses
[Table of possible error status codes]

## Source Files
[Links to backend and frontend source files with line numbers]
```

---

## Step 6: Update the Guide

Add an entry to `GUIDE.md`:

```markdown
| `/api/ajax/new-endpoint` | METHOD | [new-endpoint.md](./new-endpoint.md) | Brief description |
```

---

## Checklist for Complete Documentation

- [ ] Route path and HTTP method identified
- [ ] All URL parameters documented
- [ ] All request body parameters documented
- [ ] Optional vs required parameters marked
- [ ] Default values noted
- [ ] Valid values for enum parameters listed
- [ ] Example request provided
- [ ] Response format documented
- [ ] Error responses listed
- [ ] Source file locations included
- [ ] GUIDE.md updated with new entry

---

## Example Analysis Session

### Task: Document a new endpoint

1. **Find the route:**
   ```bash
   grep -n "route.*new_endpoint" server/routes/*.py
   ```

2. **Read the handler:**
   ```python
   @bp.route('/new-endpoint', methods=['POST'])
   def new_endpoint():
       data = request.get_json()
       field1 = data.get('field1')  # Optional
       field2 = data['field2']       # Required
   ```

3. **Check frontend API:**
   ```javascript
   const newEndpoint = async (payload) =>
     await post("/new-endpoint", payload)
   ```

4. **Review JSDoc for parameter hints**

5. **Trace data handler for processing logic**

6. **Create documentation file following template**

7. **Update GUIDE.md**

---

## Tips

- **Always read the actual code** - Docstrings may be outdated
- **Check both backend and frontend** - They may have different perspectives
- **Look for validation logic** - Reveals required fields and constraints
- **Test with mock data** - Verify your understanding of valid values
- **Include line numbers** - Makes future updates easier
