# MP Subdomain Naming Conflicts

## Overview
The `flastname` subdomain pattern (first initial + last name) can cause conflicts when two MPs share the same first initial and last name.

## Conflicts Found (5 Total)

### 1. akhan - Khan (FIXED)
| MP | Party | Constituency | Subdomain |
|----|-------|--------------|-----------|
| **Afzal Khan** | Labour | Manchester Rusholme | akhan.caseworkermp.com |
| **Ayoub Khan** | Independent | Birmingham Perry Barr | **ayoubkhan.caseworkermp.com** |

### 2. jreynolds - Reynolds (FIXED)
| MP | Party | Constituency | Subdomain |
|----|-------|--------------|-----------|
| **Jonathan Reynolds** | Labour/Co-operative | Stalybridge and Hyde | jreynolds.caseworkermp.com |
| **Joshua Reynolds** | Liberal Democrat | Maidenhead | **joshuareynolds.caseworkermp.com** |

### 3. jsmith - Smith (FIXED)
| MP | Party | Constituency | Subdomain |
|----|-------|--------------|-----------|
| **Jeff Smith** | Labour | Manchester Withington | jsmith.caseworkermp.com |
| **Julian Smith** | Conservative | Skipton and Ripon | **juliansmith.caseworkermp.com** |

### 4. ljones - Jones (FIXED)
| MP | Party | Constituency | Subdomain |
|----|-------|--------------|-----------|
| **Lillian Jones** | Labour | Kilmarnock and Loudoun | **lillianjones.caseworkermp.com** |
| **Louise Jones** | Labour | North East Derbyshire | ljones.caseworkermp.com |

### 5. mvickers - Vickers (FIXED)
| MP | Party | Constituency | Subdomain |
|----|-------|--------------|-----------|
| **Martin Vickers** | Conservative | Brigg and Immingham | **martinvickers.caseworkermp.com** |
| **Matt Vickers** | Conservative | Stockton West | mvickers.caseworkermp.com |

## Verification Results

Tested `firstnamelastname.caseworkermp.com` for all conflicting MPs:

| Subdomain | Status | Assigned To |
|-----------|--------|-------------|
| joshuareynolds | EXISTS | Joshua Reynolds MP |
| jonathanreynolds | 500 error | - |
| juliansmith | EXISTS | Rt Hon Sir Julian Smith KCB CBE MP |
| jeffsmith | 500 error | - |
| lillianjones | EXISTS | Lillian Jones MP |
| louisejones | 500 error | - |
| martinvickers | EXISTS | Martin Vickers MP |
| mattvickers | 500 error | - |

## Changes Made to mps.csv
1. **Ayoub Khan** (line 327): `akhan` → `ayoubkhan`
2. **Joshua Reynolds** (line 505): `jreynolds` → `joshuareynolds`
3. **Julian Smith** (line 547): `jsmith` → `juliansmith`
4. **Lillian Jones** (line 313): `ljones` → `lillianjones`
5. **Martin Vickers** (line 613): `mvickers` → `martinvickers`

---
*Analysis completed: 2026-01-19*
