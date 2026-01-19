-- CaseWorker MP Database Schema (Inferred)
-- ==========================================
-- This schema was reverse-engineered from frontend source code.
-- Actual implementation may differ.

-- ==========================================
-- LOOKUP / REFERENCE TABLES
-- ==========================================

CREATE TABLE CategoryTypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    categorytype VARCHAR(255) NOT NULL,
    reviewInDays INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE CaseTypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    casetype VARCHAR(255) NOT NULL,
    categorytypeID INT NOT NULL,
    retentionMonths INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categorytypeID) REFERENCES CategoryTypes(id)
);

CREATE TABLE StatusTypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    statustype VARCHAR(255) NOT NULL,
    categorytypeID INT NOT NULL,
    retentionMonths INT DEFAULT NULL,
    closed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categorytypeID) REFERENCES CategoryTypes(id)
);

CREATE TABLE ContactTypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE DoNotContactTypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ConnectionTypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE RoleTypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE OrganisationTypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- USER / STAFF TABLES
-- ==========================================

CREATE TABLE Caseworkers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Groups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE EmailSignatures (
    id INT PRIMARY KEY AUTO_INCREMENT,
    caseworkerID INT NOT NULL,
    signature TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (caseworkerID) REFERENCES Caseworkers(id)
);

-- ==========================================
-- CORE ENTITY TABLES
-- ==========================================

CREATE TABLE Constituents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    geocode_lat DECIMAL(10, 8) DEFAULT NULL,
    geocode_lng DECIMAL(11, 8) DEFAULT NULL,
    geocode_data JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ContactDetails (
    id INT PRIMARY KEY AUTO_INCREMENT,
    constituentID INT NOT NULL,
    contactTypeID INT NOT NULL,
    value VARCHAR(500) NOT NULL,
    source VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (constituentID) REFERENCES Constituents(id) ON DELETE CASCADE,
    FOREIGN KEY (contactTypeID) REFERENCES ContactTypes(id)
);

CREATE TABLE Connections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    parentID INT NOT NULL,
    childID INT NOT NULL,
    connectionTypeID INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parentID) REFERENCES Constituents(id) ON DELETE CASCADE,
    FOREIGN KEY (childID) REFERENCES Constituents(id) ON DELETE CASCADE,
    FOREIGN KEY (connectionTypeID) REFERENCES ConnectionTypes(id)
);

CREATE TABLE Cases (
    id INT PRIMARY KEY AUTO_INCREMENT,
    constituentID INT NOT NULL,
    contactTypeID INT DEFAULT NULL COMMENT 'Stored as enquirytypeID in legacy code',
    caseTypeID INT DEFAULT NULL,
    statusID INT DEFAULT NULL,
    categoryTypeID INT DEFAULT NULL,
    assignedToID INT DEFAULT NULL,
    summary TEXT,
    reviewDate DATETIME DEFAULT NULL,
    restrictions JSON DEFAULT NULL,
    customFields JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (constituentID) REFERENCES Constituents(id),
    FOREIGN KEY (contactTypeID) REFERENCES ContactTypes(id),
    FOREIGN KEY (caseTypeID) REFERENCES CaseTypes(id),
    FOREIGN KEY (statusID) REFERENCES StatusTypes(id),
    FOREIGN KEY (categoryTypeID) REFERENCES CategoryTypes(id),
    FOREIGN KEY (assignedToID) REFERENCES Caseworkers(id)
);

CREATE TABLE Casenotes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    caseID INT NOT NULL,
    type ENUM('note', 'email', 'letter', 'file', 'appointment', 'reviewDate') NOT NULL,
    subtypeID INT DEFAULT NULL COMMENT 'Secondary ID for certain types like reviewDate',
    detail JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (caseID) REFERENCES Cases(id) ON DELETE CASCADE
);

CREATE TABLE Emails (
    id INT PRIMARY KEY AUTO_INCREMENT,
    caseID INT DEFAULT NULL,
    `to` JSON COMMENT 'Array of recipient email addresses (API uses "to" not "toAddresses")',
    cc JSON COMMENT 'Array of CC email addresses (API uses "cc" not "ccAddresses")',
    bcc JSON COMMENT 'Array of BCC email addresses (API uses "bcc" not "bccAddresses")',
    `from` VARCHAR(255) COMMENT 'API uses "from" not "fromAddress"',
    subject VARCHAR(500),
    htmlBody LONGTEXT,
    type ENUM('inbox', 'draft', 'sent', 'scheduled') DEFAULT 'inbox',
    actioned BOOLEAN DEFAULT FALSE,
    assignedTo INT DEFAULT NULL,
    scheduledAt DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (caseID) REFERENCES Cases(id) ON DELETE SET NULL,
    FOREIGN KEY (assignedTo) REFERENCES Caseworkers(id)
);

CREATE TABLE EmailAttachments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    emailId INT NOT NULL,
    content LONGTEXT COMMENT 'Base64 encoded file content',
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) COMMENT 'MIME type',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (emailId) REFERENCES Emails(id) ON DELETE CASCADE
);

CREATE TABLE Letters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    caseID INT NOT NULL,
    letterheadId INT DEFAULT NULL,
    reference VARCHAR(500) COMMENT 'Letter reference code',
    `text` LONGTEXT COMMENT 'Letter body content (API uses "text" not "content")',
    footer LONGTEXT COMMENT 'Letter footer content',
    signed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (caseID) REFERENCES Cases(id) ON DELETE CASCADE,
    FOREIGN KEY (letterheadId) REFERENCES Letterheads(id)
);

-- NOTE: API uses /casefiles/ endpoint path, not /files/
CREATE TABLE Files (
    id INT PRIMARY KEY AUTO_INCREMENT,
    caseID INT NOT NULL,
    fileContents LONGTEXT COMMENT 'Base64 encoded content',
    fileName VARCHAR(255) NOT NULL,
    reference VARCHAR(500) COMMENT 'Description/reference',
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (caseID) REFERENCES Cases(id) ON DELETE CASCADE
);

CREATE TABLE ReviewDates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    caseID INT NOT NULL,
    reviewDate DATETIME NOT NULL,
    note TEXT COMMENT 'Note to appear on the review date',
    assignedTo INT DEFAULT NULL COMMENT 'User ID the review is assigned to',
    completed BOOLEAN DEFAULT FALSE COMMENT 'Whether the review date has been marked as complete',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (caseID) REFERENCES Cases(id) ON DELETE CASCADE,
    FOREIGN KEY (assignedTo) REFERENCES Caseworkers(id)
);

-- ==========================================
-- TAGGING & FLAGS
-- ==========================================

-- NOTE: API uses field name "tag" not "name" in payloads
CREATE TABLE Tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tag VARCHAR(255) NOT NULL COMMENT 'API uses "tag" field name',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CaseTags (
    caseID INT NOT NULL,
    tagID INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (caseID, tagID),
    FOREIGN KEY (caseID) REFERENCES Cases(id) ON DELETE CASCADE,
    FOREIGN KEY (tagID) REFERENCES Tags(id) ON DELETE CASCADE
);

-- NOTE: API uses field name "flag" not "name" in payloads
CREATE TABLE Flags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    flag VARCHAR(255) NOT NULL COMMENT 'API uses "flag" field name',
    isPersonal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- CUSTOM FIELDS
-- ==========================================

CREATE TABLE CustomFields (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    fieldType VARCHAR(50) NOT NULL,
    validation JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- SEGMENTS (SAVED FILTERS)
-- ==========================================

CREATE TABLE Segments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    value1Type VARCHAR(100) DEFAULT NULL,
    value1Show VARCHAR(255) DEFAULT NULL,
    value1Default VARCHAR(255) DEFAULT NULL,
    value2Type VARCHAR(100) DEFAULT NULL,
    value2Show VARCHAR(255) DEFAULT NULL,
    value2Default VARCHAR(255) DEFAULT NULL,
    filterType VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- TEMPLATES
-- ==========================================

CREATE TABLE EmailTemplates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    body LONGTEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE LetterTemplates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    content LONGTEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE CaseTemplates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    template JSON COMMENT 'Template configuration including casetypes, statuses, etc.',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Letterheads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    content LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- GEOGRAPHIC DATA
-- ==========================================

CREATE TABLE KMLs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    data LONGTEXT COMMENT 'KML geographic boundary data',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- SURVEYS & DOORKNOCKING
-- ==========================================

CREATE TABLE Surveys (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    configuration JSON,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE DoorknockingSurveys (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    configuration JSON,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE DoorknockingResults (
    id INT PRIMARY KEY AUTO_INCREMENT,
    surveyID INT NOT NULL,
    responseData JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (surveyID) REFERENCES DoorknockingSurveys(id)
);

-- ==========================================
-- EXTERNAL INTEGRATIONS
-- ==========================================

CREATE TABLE RSS (
    id INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(500) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Behalfs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Membership (
    id INT PRIMARY KEY AUTO_INCREMENT,
    constituentID INT,
    secondaryBranch VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (constituentID) REFERENCES Constituents(id)
);

CREATE TABLE Organisations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    organisationTypeID INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organisationTypeID) REFERENCES OrganisationTypes(id)
);

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================

CREATE INDEX idx_cases_constituent ON Cases(constituentID);
CREATE INDEX idx_cases_assigned ON Cases(assignedToID);
CREATE INDEX idx_cases_status ON Cases(statusID);
CREATE INDEX idx_cases_casetype ON Cases(caseTypeID);
CREATE INDEX idx_cases_category ON Cases(categoryTypeID);
CREATE INDEX idx_cases_created ON Cases(created_at);
CREATE INDEX idx_cases_review ON Cases(reviewDate);

CREATE INDEX idx_casenotes_case ON Casenotes(caseID);
CREATE INDEX idx_casenotes_type ON Casenotes(type);

CREATE INDEX idx_emails_case ON Emails(caseID);
CREATE INDEX idx_emails_type ON Emails(type);
CREATE INDEX idx_emails_assigned ON Emails(assignedTo);
CREATE INDEX idx_emails_actioned ON Emails(actioned);

CREATE INDEX idx_contactdetails_constituent ON ContactDetails(constituentID);
CREATE INDEX idx_contactdetails_type ON ContactDetails(contactTypeID);

CREATE INDEX idx_connections_parent ON Connections(parentID);
CREATE INDEX idx_connections_child ON Connections(childID);

CREATE INDEX idx_casetags_case ON CaseTags(caseID);
CREATE INDEX idx_casetags_tag ON CaseTags(tagID);

CREATE INDEX idx_reviewdates_case ON ReviewDates(caseID);
CREATE INDEX idx_reviewdates_date ON ReviewDates(reviewDate);
