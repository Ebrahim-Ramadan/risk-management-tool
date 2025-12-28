# Applied IT Security & Risk Management Solution
## Risk Management Tool - Final Project Documentation

**Course:** CNC 419 - IT Security & Risk Management  
**Team Members:** [Student Name 1], [Student Name 2]  
**Date:** December 2025  
**Project Type:** Risk Management Domain

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Introduction & Objectives](#introduction--objectives)
3. [Theoretical Background](#theoretical-background)
4. [System Architecture & Design](#system-architecture--design)
5. [Technical Implementation](#technical-implementation)
6. [Features & Functionality](#features--functionality)
7. [Database Schema](#database-schema)
8. [Risk Calculation Methodology](#risk-calculation-methodology)
9. [Usage Guide](#usage-guide)
10. [Screenshots & Sample Output](#screenshots--sample-output)
11. [Limitations & Future Improvements](#limitations--future-improvements)
12. [Conclusion](#conclusion)

---

## Executive Summary

The **Risk Management Tool** is a web-based application designed to help organizations systematically identify, assess, and manage IT security risks. The tool enables security teams to:

- Maintain a comprehensive asset inventory
- Map threats and vulnerabilities to critical assets
- Calculate automated risk scores using industry-standard methodologies
- Track risk treatment decisions (Mitigate, Accept, Transfer, Avoid)
- Generate executive risk reports for stakeholder communication

This prototype demonstrates the core capabilities of enterprise-grade risk management platforms used by Fortune 500 companies and government agencies, with particular focus on usability, accuracy, and decision support.

---

## Introduction & Objectives

### Problem Statement

Organizations face increasingly sophisticated cyber threats while managing complex IT environments with thousands of assets. Risk management frameworks like NIST, ISO 27001, and FAIR require systematic identification and quantification of risk, yet many organizations lack tools to operationalize these frameworks effectively.

**Key Challenges:**
- Manual risk assessment processes are time-consuming and inconsistent
- Lack of centralized asset inventory and threat mapping
- Difficulty tracking risk treatment progress
- Inability to generate actionable executive reports
- No automated scoring mechanisms for objective risk comparison

### Project Objectives

1. **Design** a functional risk management system that implements NIST and FAIR principles
2. **Implement** a working prototype with asset inventory, threat assessment, and automated risk scoring
3. **Demonstrate** practical usability for security teams and executives
4. **Document** complete system architecture and risk methodology
5. **Validate** the tool through sample data representing realistic organizational risks

### Success Criteria

- Web-based application accessible to authorized users
- Automated risk scoring based on Likelihood × Impact matrix
- Support for risk treatment tracking and audit trails
- PDF report generation for executive communication
- Scalable architecture supporting 1000+ assets
- Intuitive UI requiring minimal training

---

## Theoretical Background

### Risk Management Frameworks

#### NIST RMF (Risk Management Framework)

NIST defines risk as: **Risk = Likelihood × Impact**

Our tool implements the NIST RMF six-step process:
1. **Prepare** - Asset inventory and threat identification
2. **Categorize** - Classify assets by criticality and impact level
3. **Select** - Choose security controls and risk mitigations
4. **Implement** - Deploy controls and track progress
5. **Assess** - Evaluate control effectiveness and residual risk
6. **Monitor** - Continuous risk monitoring and reporting

#### FAIR Model (Factor Analysis of Information Risk)

FAIR provides a quantitative approach to information security risk measurement:

**Risk = Threat Event Frequency × Loss Magnitude**

In our implementation:
- **Threat Event Frequency** maps to "Likelihood" (High/Medium/Low)
- **Loss Magnitude** maps to "Impact" (High/Medium/Low)
- **Risk Score** ranges from 1-25, with thresholds defining risk levels

### Risk Rating Methodology

#### Likelihood Scoring

| Level | Definition | Examples |
|-------|-----------|----------|
| **High** | Probable within 12 months | Phishing campaigns, ransomware, insider threats |
| **Medium** | Possible but unlikely within 12 months | Data breaches, supply chain attacks |
| **Low** | Unlikely within 1-2 years | Zero-day exploits, sophisticated APTs |

#### Impact Scoring

| Level | Business Impact | Data Loss | Availability |
|-------|-----------------|-----------|--------------|
| **High** | > $1M loss, regulatory fine | Sensitive PII/IP lost | >4 hours downtime |
| **Medium** | $100K-$1M loss | Non-sensitive data lost | 1-4 hours downtime |
| **Low** | < $100K loss | No sensitive data lost | <1 hour downtime |

#### Risk Score Matrix

```
         High Impact    Medium Impact   Low Impact
High     25 (Critical)  15 (High)       5 (Low)
Prob     
Medium   20 (High)      12 (Medium)     8 (Medium)
Prob
Low      10 (Medium)    6 (Low)         3 (Low)
```

**Risk Level Definitions:**
- **Critical (21-25):** Immediate remediation required; escalate to C-suite
- **High (15-20):** Significant risk; remediation within 30 days
- **Medium (8-14):** Monitor closely; remediation within 90 days
- **Low (3-7):** Accept risk or remediate opportunistically

### Risk Treatment Strategies

The tool supports four standard risk treatment options:

1. **Mitigate** - Reduce likelihood or impact through controls (most common)
   - Example: Implement MFA to reduce phishing risk
   
2. **Accept** - Acknowledge risk and continue operations
   - Example: Accept low risk of zero-day exploits
   
3. **Transfer** - Shift risk to third party (insurance, outsourcing)
   - Example: Transfer data breach liability through cyber insurance
   
4. **Avoid** - Discontinue activity or use alternative
   - Example: Discontinue legacy system to avoid compatibility risks

---

## System Architecture & Design

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE LAYER                      │
│  ┌──────────────┬──────────────┬──────────────┬──────────┐  │
│  │  Dashboard   │   Assets     │ Assessments  │ Reports  │  │
│  └──────────────┴──────────────┴──────────────┴──────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                   API & BUSINESS LOGIC LAYER                  │
│  ┌──────────────┬──────────────┬──────────────┬──────────┐  │
│  │ Asset APIs   │ Risk Calc    │ Assessment   │ Report   │  │
│  │              │ Engine       │ APIs         │ Engine   │  │
│  └──────────────┴──────────────┴──────────────┴──────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                 │
│  ┌──────────────┬──────────────┬──────────────┬──────────┐  │
│  │   Assets     │   Threats    │ Vulns        │ Risks    │  │
│  │              │              │              │          │  │
│  │   Assessments│ Risk History │ Audit Trail  │          │  │
│  └──────────────┴──────────────┴──────────────┴──────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

#### Frontend (Next.js 16)

- **Dashboard** - Real-time risk posture visualization
- **Asset Inventory** - CRUD operations for IT assets
- **Risk Assessment** - Create and manage threat-asset mappings
- **Reports** - View and export risk summaries

Technology Stack:
- Next.js 16 App Router (Server Components + Client Components)
- React 19 for interactive UI
- shadcn/ui for accessible component library
- Recharts for data visualization
- Tailwind CSS v4 for styling

#### Backend (API Routes)

- `/api/assets` - Asset inventory management
- `/api/threats` - Threat database
- `/api/assessments` - Risk assessment CRUD and scoring
- `/api/stats` - Dashboard statistics
- `/api/reports` - Report generation and export

#### Database Schema

**Assets Table**
```sql
- id (Primary Key)
- name (Asset name)
- type (Server, Application, Data, Network)
- department (Owning department)
- criticality (Critical, High, Medium, Low)
- location (Physical/Cloud location)
- owner (Responsible person)
- created_at, updated_at (Timestamps)
```

**Threats Table**
```sql
- id (Primary Key)
- name (Threat name)
- description (Detailed description)
- threat_type (Malware, Social Engineering, etc.)
- source (Internal, External, Both)
- likelihood (High, Medium, Low)
- created_at (Timestamp)
```

**Vulnerabilities Table**
```sql
- id (Primary Key)
- name (Vulnerability name)
- description (Technical details)
- severity (Critical, High, Medium, Low)
- asset_id (Foreign Key to Assets)
- cve_id (CVE identifier)
- mitigation (Remediation steps)
- created_at (Timestamp)
```

**Risk Assessments Table**
```sql
- id (Primary Key)
- asset_id (Foreign Key)
- threat_id (Foreign Key)
- vulnerability_id (Foreign Key, optional)
- likelihood (High, Medium, Low)
- impact (High, Medium, Low)
- risk_score (1-25, calculated)
- risk_level (Critical, High, Medium, Low, calculated)
- treatment_status (Pending, Mitigate, Accept, Transfer, Avoid)
- treatment_plan (Detailed mitigation actions)
- responsible_party (Owner of remediation)
- target_date (Completion target)
- created_at, updated_at (Timestamps)
```

**Risk History Table**
```sql
- id (Primary Key)
- risk_assessment_id (Foreign Key)
- old_risk_level (Previous level)
- new_risk_level (Updated level)
- change_reason (Why changed)
- changed_by (User who made change)
- changed_at (Timestamp)
```

---

## Technical Implementation

### Technology Choices

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| **Frontend Framework** | Next.js 16 | Full-stack capability, Server Components, excellent SEO |
| **Runtime** | Node.js | JavaScript ecosystem consistency |
| **UI Library** | shadcn/ui | Accessible, customizable, production-ready |
| **Styling** | Tailwind CSS v4 | Utility-first, responsive, performant |
| **Charts** | Recharts | React-native, responsive, lightweight |
| **Database** | PostgreSQL | ACID compliance, scalability, role-based security |
| **Deployment** | Vercel | Optimized for Next.js, auto-scaling, edge functions |

### Code Structure

```
risk-management-tool/
├── app/
│   ├── layout.tsx              # Root layout with theme
│   ├── globals.css             # Theme variables and styles
│   ├── page.tsx                # Dashboard
│   ├── api/
│   │   ├── assets/route.ts     # Asset CRUD
│   │   ├── threats/route.ts    # Threat endpoints
│   │   ├── assessments/route.ts# Risk assessment logic
│   │   ├── stats/route.ts      # Dashboard statistics
│   │   └── reports/route.ts    # Report generation
│   ├── assets/
│   │   └── page.tsx            # Asset inventory page
│   ├── assessments/
│   │   └── page.tsx            # Risk assessment page
│   └── reports/
│       └── page.tsx            # Risk reports page
├── components/
│   └── ui/                     # shadcn components
├── scripts/
│   ├── 01-init-database.sql    # Database schema
│   └── 02-seed-sample-data.sql # Sample data
└── public/                     # Static assets
```

### Risk Calculation Algorithm

```typescript
// Pseudo-code for risk scoring
function calculateRiskScore(likelihood: string, impact: string): {score: number, level: string} {
  const scoreMatrix = {
    'High': { 'High': 25, 'Medium': 15, 'Low': 5 },
    'Medium': { 'High': 20, 'Medium': 12, 'Low': 8 },
    'Low': { 'High': 10, 'Medium': 6, 'Low': 3 }
  };
  
  const riskScore = scoreMatrix[likelihood][impact];
  
  const riskLevel = 
    riskScore >= 21 ? 'Critical' :
    riskScore >= 15 ? 'High' :
    riskScore >= 8 ? 'Medium' :
    'Low';
  
  return { score: riskScore, level: riskLevel };
}
```

---

## Features & Functionality

### 1. Dashboard (Home Page)

**Purpose:** Real-time executive overview of organizational risk posture

**Key Metrics:**
- Total assets under management
- Critical/High/Medium/Low risk counts
- Risk distribution pie chart
- Asset type breakdown bar chart

**User Actions:**
- Navigate to detailed modules
- View trend indicators
- Identify top-risk areas

### 2. Asset Inventory Module

**Purpose:** Centralized management of organizational IT assets

**Features:**
- Create, Read, Update, Delete (CRUD) assets
- Classify assets by:
  - Type (Server, Application, Data, Network)
  - Department (Infrastructure, Sales, Finance, etc.)
  - Criticality level (Critical, High, Medium, Low)
  - Location (Data Center, Cloud, Office Network)
- Track asset ownership and responsibility
- Search and filter capabilities

**Business Value:**
- Complete visibility of IT environment
- Baseline for threat mapping
- Support for impact assessment

### 3. Risk Assessment Module

**Purpose:** Map threats to assets and calculate risk scores

**Features:**
- Select asset from inventory
- Select threat from threat database
- Rate likelihood of threat occurrence
- Rate business impact if materialized
- Automated risk score calculation (Likelihood × Impact)
- Assign treatment strategy (Mitigate/Accept/Transfer/Avoid)
- Document treatment plan and responsible party
- Set target completion dates

**Business Value:**
- Objective, consistent risk evaluation
- Standardized decision framework
- Audit trail for compliance

### 4. Risk Reports & Export

**Purpose:** Generate executive reports for stakeholder communication

**Features:**
- Executive summary with KPIs
- Risk breakdown by severity level
- Treatment action tracking
- Asset risk ranking
- PDF export for presentations/documentation

**Business Value:**
- Compliance documentation (ISO 27001, NIST)
- Board-level communication
- Risk trend analysis

---

## Database Schema

See System Architecture section for complete schema details. Key design principles:

- **Normalization:** Separate assets, threats, vulnerabilities to eliminate redundancy
- **Auditability:** Risk history table tracks changes for compliance
- **Scalability:** Indexes on frequently queried columns
- **Referential Integrity:** Foreign keys prevent orphaned records

---

## Risk Calculation Methodology

### Quantitative Risk Assessment

The tool implements a quantitative risk model based on NIST and FAIR frameworks:

**Risk = Threat Frequency × Asset Value × Threat Capability × Control Effectiveness**

Simplified to:
**Risk Score = Likelihood Rating × Impact Rating**

Where:
- **Likelihood** = Probability threat will materialize (1-5 scale)
- **Impact** = Business consequence if realized (1-5 scale)
- **Risk Score** = Product of above (1-25 scale)

### Validation & Sensitivity Analysis

Example risk assessment scenarios:

**Scenario 1: Production Database - Ransomware Attack**
- Asset: Production Database Server (Critical)
- Threat: Ransomware Attack (High likelihood)
- Impact: Complete data loss, $5M ransom demand, >24h downtime
- Likelihood: High (5)
- Impact: High (5)
- Risk Score: 25 → **Critical** - Requires immediate remediation

**Scenario 2: File Sharing - Insider Misuse**
- Asset: File Sharing Service (Medium)
- Threat: Insider Threat (Medium likelihood)
- Impact: Potential data loss, <4h downtime
- Likelihood: Medium (3)
- Impact: Medium (3)
- Risk Score: 12 → **Medium** - Monitor and remediate within 90 days

---

## Usage Guide

### For Security Analysts

1. **Log in** to the Risk Management Tool
2. **Review Dashboard** for current risk posture
3. **Navigate to Assets** to verify inventory accuracy
4. **Create Risk Assessment** linking threats to critical assets
5. **Document Treatment Plan** with specific mitigation actions
6. **Track Progress** through reports module

### For Risk Managers

1. **Generate Reports** for executive communication
2. **Monitor Treatment Status** across organization
3. **Escalate Critical Risks** to leadership
4. **Track Trends** over time
5. **Update Risk Scores** as mitigations are implemented

### For Executives

1. **Review Executive Dashboard** for risk summary
2. **Examine Critical Risks** and treatment plans
3. **Approve Risk Acceptance** decisions
4. **Monitor Compliance** against regulatory requirements

---

## Screenshots & Sample Output

### Dashboard View
- KPI cards showing Critical (2), High (3), Medium (2), Low (1) risks
- Risk distribution pie chart: Red 8%, Orange 24%, Yellow 16%, Green 8%
- Asset type breakdown: Servers (3), Applications (4), Networks (1)
- Header with navigation to Assets, Assessments, Reports

### Asset Inventory Page
- Table of 8 sample assets with columns:
  - Asset Name: Production Database Server, Email System, etc.
  - Type: Server, Application, Network
  - Department: Infrastructure, IT Operations, Sales, Finance
  - Criticality: Color-coded badges (Critical=Red, High=Orange, Medium=Yellow, Low=Green)
  - Owner: John Smith, Sarah Johnson, Mike Chen, etc.

### Risk Assessment Page
- Dialog to create new assessment:
  - Asset dropdown (populated from inventory)
  - Threat dropdown (populated from threat database)
  - Likelihood selector: High, Medium, Low
  - Impact selector: High, Medium, Low
  - Risk Score auto-calculated (e.g., High×High=25=Critical)
  - Responsible Party field
- Table of existing assessments with risk levels and treatment status

### Risk Reports Page
- Executive summary metrics:
  - Total Assets: 8
  - Total Assessments: 8
  - Critical: 2, High: 3, Medium: 2, Low: 1
- Treatment Actions table showing:
  - Asset name
  - Risk level
  - Treatment type (Mitigate/Accept)
  - Responsible party
  - Target completion date
- PDF Export button

---

## Limitations & Future Improvements

### Current Limitations

1. **Mock Data Only** - Uses in-memory data, not connected to real database
   - Solution: Implement PostgreSQL/Neon integration for persistence

2. **No Authentication** - Anyone can access the tool
   - Solution: Integrate Supabase Auth or OAuth for role-based access control

3. **No Audit Trail** - Changes not logged for compliance
   - Solution: Implement database triggers to populate risk_history table

4. **Manual Risk Scoring** - Risk analysts manually rate likelihood/impact
   - Solution: ML-based scoring using threat intelligence feeds and CVSS scores

5. **Single Organization** - No multi-tenancy support
   - Solution: Add organization ID to all tables for SaaS deployment

6. **Limited Threat Database** - 8 sample threats only
   - Solution: Integrate with external threat intelligence (MITRE ATT&CK, CVE feeds)

7. **No Real PDF Export** - PDF endpoint returns mock data
   - Solution: Implement PDF generation library (e.g., puppeteer, pdfkit)

8. **No Vulnerability Scanning** - Manual vulnerability data entry
   - Solution: Integrate with scanners (Nessus, Qualys, OpenVAS)

### Future Enhancements (Phase 2+)

1. **Advanced Analytics**
   - Predictive modeling of risk trends
   - What-if scenario analysis
   - Monte Carlo simulation for risk modeling

2. **Threat Intelligence Integration**
   - Real-time threat feeds (MITRE, CISA)
   - Automated threat discovery and impact assessment
   - Anomaly detection using ML

3. **Automated Remediation**
   - Integration with SOAR platforms
   - Automated playbook execution
   - Self-healing infrastructure

4. **Compliance Automation**
   - Automatic control mapping (NIST, ISO 27001, PCI-DSS)
   - Evidence collection and documentation
   - Audit report generation

5. **Third-party Risk Management**
   - Vendor risk assessments
   - Supply chain risk scoring
   - Third-party compliance monitoring

6. **Mobile Application**
   - On-the-go risk reporting
   - Mobile incident response
   - Push alerts for critical risks

7. **Advanced Reporting**
   - Custom report builder
   - Drill-down analytics
   - Trend analysis and forecasting
   - Real-time dashboards

---

## Conclusion

The **Risk Management Tool** demonstrates a practical implementation of enterprise security risk management principles using modern web technologies. The prototype successfully:

1. ✓ Implements NIST RMF and FAIR frameworks
2. ✓ Provides centralized asset inventory management
3. ✓ Automates risk scoring using Likelihood × Impact methodology
4. ✓ Tracks risk treatment decisions and progress
5. ✓ Generates executive reports for stakeholder communication
6. ✓ Uses modern, scalable technology stack (Next.js, React, Tailwind)

The tool is suitable for organizations ranging from mid-market enterprises to large corporations, and can be extended with database persistence, authentication, threat intelligence integration, and advanced analytics to meet complex enterprise requirements.

This project demonstrates how systematic risk management, supported by appropriate tools and frameworks, enables organizations to make informed security decisions, allocate resources effectively, and communicate risk to executives and stakeholders in a clear, quantified manner.

---

## References & Resources

### Standards & Frameworks
- NIST Risk Management Framework (RMF) - https://csrc.nist.gov/projects/risk-management
- FAIR Institute - Factor Analysis of Information Risk - https://fairinstitute.org
- ISO/IEC 27001:2022 - Information Security Management
- OWASP Risk Assessment Framework

### Technology Documentation
- Next.js 16 - https://nextjs.org
- React 19 - https://react.dev
- Tailwind CSS v4 - https://tailwindcss.com
- shadcn/ui - https://ui.shadcn.com
- Recharts - https://recharts.org

### Threat Intelligence Sources
- MITRE ATT&CK - https://attack.mitre.org
- CISA Alerts - https://www.cisa.gov/alerts
- CVE Database - https://cve.mitre.org
- NIST NVD - https://nvd.nist.gov

---

**Document Version:** 1.0  
**Last Updated:** December 2025  
**Status:** Complete
