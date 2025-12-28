# CNC 419 Final Project Proposal

## Project Title
**Applied IT Security & Risk Management Solution: Enterprise Risk Management Tool**

## Team Information
- **Team Size:** 2 students
- **Team Members:** [Student Name 1], [Student Name 2]
- **Submission Date:** December 2025

## Problem Statement

Modern organizations manage thousands of IT assets exposed to sophisticated cyber threats. Risk management frameworks like NIST RMF and ISO 27001 require systematic identification and quantification of organizational risks, yet many organizations lack tools to operationalize these frameworks effectively.

**Key Challenges:**
- Manual risk assessment processes are time-consuming and inconsistent
- Lack of centralized asset inventory and threat mapping
- Difficulty tracking risk mitigation progress and effectiveness
- Inability to generate objective risk reports for executive communication
- No standardized scoring mechanism for comparing risks across the organization

## Solution Overview

We will develop a **Risk Management Tool** - a working web-based application that enables security teams and risk managers to:

1. Build and maintain an asset inventory
2. Map organizational threats to critical assets
3. Automatically calculate standardized risk scores
4. Track risk treatment decisions and progress
5. Generate executive reports for compliance and board-level communication

## Selected Domain
**Risk Management (RM)** - Aligned with CNC 419 course content on risk assessment, quantification, and treatment strategies.

## Proposed Features

### Minimum Requirements (MVP)
✓ Asset Inventory Module
  - Create, read, update assets
  - Classify by type, department, criticality, location
  - Track ownership and responsibility

✓ Threat & Vulnerability Assessment
  - Map threats to assets
  - Document vulnerabilities
  - Link to CVE identifiers

✓ Risk Calculation Engine
  - Automated Likelihood × Impact scoring
  - Risk level classification (Critical, High, Medium, Low)
  - Consistent scoring methodology

✓ Risk Dashboard
  - Real-time risk visualization
  - KPI metrics and trends
  - Asset and threat analytics

✓ Report Generation
  - Executive summary reports
  - Risk treatment tracking
  - PDF export capability

### Phase 1 Deliverables
1. Working web application with all MVP features
2. Database schema supporting 1000+ assets
3. Sample data (8 assets, 8 threats, 8+ risk assessments)
4. User interface for all core functions
5. API endpoints for asset, threat, and risk management

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, Tailwind CSS v4, shadcn/ui |
| **Backend** | Node.js, API Routes, Next.js Server Actions |
| **Database** | PostgreSQL / Neon (persistent storage) |
| **Visualization** | Recharts library |
| **Deployment** | Vercel |

## Implementation Timeline

- **Week 1:** Database schema design, API endpoint scaffolding
- **Week 2:** Asset inventory module, basic CRUD operations
- **Week 3:** Risk assessment module, calculation engine
- **Week 4:** Dashboard and visualization, report generation
- **Week 5:** Testing, optimization, documentation
- **Week 6:** Final polish, presentation preparation

## Success Criteria

✓ Fully functional web application  
✓ Automated risk scoring (not manual)  
✓ Asset inventory with 8+ sample items  
✓ 8+ risk assessments demonstrating calculation engine  
✓ Risk treatment tracking  
✓ Executive report with PDF export  
✓ Professional UI with security-focused aesthetic  
✓ Complete 10-12 page documentation  
✓ Live 10-12 minute demo with Q&A  

## Expected Learning Outcomes

Through this project, we will:
1. **Apply** risk management frameworks (NIST, FAIR, ISO 27001)
2. **Implement** quantitative risk assessment methodologies
3. **Demonstrate** full-stack web development skills
4. **Create** a practical tool addressing real organizational needs
5. **Communicate** security concepts to technical and non-technical audiences

## Differentiation & Innovation

While risk management tools exist in the enterprise market (Qualys, Rapid7, etc.), our implementation focuses on:
- **Simplicity:** Clean UI optimized for SMB/mid-market needs
- **Transparency:** Visible risk calculation methodology
- **Auditability:** Complete change tracking for compliance
- **Extensibility:** API-first design for future integrations
- **Demonstration Value:** Practical showcase of risk concepts

## Resources & Tools

- **Development Tools:** VS Code, Git/GitHub, Next.js CLI
- **Documentation:** Markdown, system architecture diagrams
- **Frameworks Referenced:** NIST RMF, FAIR, ISO 27001, OWASP
- **Open-Source Libraries:** Recharts, shadcn/ui, Tailwind CSS
- **Threat Data:** Sample threats based on MITRE ATT&CK

## Risk Mitigation

**Risk: Database integration delays**
- Mitigation: Start with mock API data, add persistence later

**Risk: Complex risk calculation algorithm**
- Mitigation: Use simplified but valid Likelihood × Impact model

**Risk: Time constraints**
- Mitigation: Focus on MVP first, Phase 2 features as stretch goals

## Conclusion

This project demonstrates practical application of IT security risk management principles through a working software tool. It showcases both technical implementation skills and understanding of risk frameworks essential for security careers.

---

**Prepared by:** [Team Names]  
**Date:** December 2025
