# Government Departments API

This document covers the external API endpoint for retrieving UK government department information.

---

## Get UK Government Departments

**Endpoint:** `GET https://ministers-dot-electedtechcaseworkermp.appspot.com/api/departments/uk`
**Authentication:** None required (public API)
**CORS:** Enabled for caseworkermp.com domains

### Description

Retrieves a list of UK government departments with their contact details. This external API is hosted on Google App Engine and provides up-to-date information about ministerial departments for correspondence purposes.

### Example Request

```
GET https://ministers-dot-electedtechcaseworkermp.appspot.com/api/departments/uk
```

### Response

**Status:** `200 OK`
**Content-Type:** `application/json`

```json
[
  {
    "ID": 1,
    "name": "Department for Energy Security and Net Zero",
    "acronym": "DESNZ",
    "address1": "1 Victoria Street",
    "address2": "",
    "city": "London",
    "postcode": "SW1H 0ET",
    "email": "correspondence@energysecurity.gov.uk",
    "region": "UK",
    "emailable": true
  },
  {
    "ID": 2,
    "name": "Department for Education",
    "acronym": "DFE",
    "address1": "Sanctuary Buildings",
    "address2": "20 Great Smith Street",
    "city": "London",
    "postcode": "SW1P 3BT",
    "email": "CorrespondenceTeam.PO@education.gov.uk",
    "region": "UK",
    "emailable": true
  },
  {
    "ID": 5,
    "name": "Prime Minister",
    "acronym": "PM",
    "address1": "10 Downing Street",
    "address2": "",
    "city": "London",
    "postcode": "SW1A 2AA",
    "email": "DirectComms@no10.gov.uk",
    "region": "UK",
    "emailable": true
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `ID` | Number | Department unique identifier |
| `name` | String | Full department name |
| `acronym` | String | Department acronym (e.g., "DEFRA", "DWP") |
| `address1` | String | Primary address line |
| `address2` | String | Secondary address line (may be empty) |
| `city` | String | City (typically "London") |
| `postcode` | String | UK postcode |
| `email` | String | Ministerial correspondence email address |
| `region` | String | Region identifier (e.g., "UK") |
| `emailable` | Boolean | Whether the department accepts email correspondence |

### Available Departments

Based on test data, the following departments are available:

| ID | Acronym | Department Name |
|----|---------|-----------------|
| 1 | DESNZ | Department for Energy Security and Net Zero |
| 2 | DFE | Department for Education |
| 3 | DEFRA | Department for Environment, Food and Rural Affairs |
| 4 | DWP | Department for Work and Pensions |
| 5 | PM | Prime Minister |
| 7 | AG | Attorney General |
| 8 | CO | Cabinet Office |
| 9 | MHCLG | Ministry of Housing, Communities and Local Government |
| 10 | DCMS | Department for Culture Media & Sport |
| 11 | DSIT | Department for Science, Innovation and Technology |
| 12 | DFT | Department for Transport |
| 14 | DHSC | Department of Health and Social Care |
| 15 | FCDO | Foreign, Commonwealth and Development Office |
| 16 | HMT | HM Treasury |
| 17 | HO | Home Office |
| 18 | MoD | Ministry of Defence |
| 19 | MOJ | Ministry of Justice |
| 20 | NIO | Northern Ireland Office |
| 21 | SO | Scotland Office |
| 22 | WO | Wales Office |
| 24 | DBT | Department for Business and Trade |
| 71 | OEO | Office for Equality and Opportunity |

### Notes

- This is an external API hosted separately from the main Caseworker application
- The API supports CORS for cross-origin requests from caseworkermp.com subdomains
- Department data may be updated periodically to reflect government restructuring
- Some departments may have `emailable: false` if they do not accept direct email correspondence

### Usage in Caseworker

This API is called from `scripts/getVariables.js.php` to populate the department dropdown when creating correspondence to government departments.
