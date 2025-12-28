# Risk Management Tool - Quick Start Guide

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd risk-management-tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

## Using the Application

### Dashboard (Home Page)
- View real-time KPIs: Total Assets, Critical/High/Medium/Low Risk counts
- See risk distribution pie chart and asset type breakdown
- Navigate to detailed modules via buttons

### Asset Inventory
- Click "Add Asset" to create new IT assets
- View complete list of assets with criticality levels
- Required fields: Name, Type, Department, Criticality, Owner
- Asset Types: Server, Application, Data, Network

### Risk Assessments
- Click "New Assessment" to create risk evaluations
- Select Asset and Threat from dropdowns
- Rate Likelihood (High/Medium/Low)
- Rate Impact (High/Medium/Low)
- System auto-calculates Risk Score (1-25) and Risk Level
- Document treatment plan and responsible party

### Risk Reports
- View executive summary with all KPIs
- See table of treatment actions and responsible parties
- Click "Export PDF" to download report (demo only - returns mock PDF)

## Sample Data

The application includes 8 pre-populated items:

**Assets:**
1. Production Database Server (Critical)
2. Email System (High)
3. Customer Portal (High)
4. File Sharing Service (Medium)
5. Employee Workstations (Medium)
6. Payment Processing (Critical)
7. CRM System (High)
8. Backup Systems (Critical)

**Threats:**
- Ransomware Attack
- Phishing Campaign
- Insider Threat
- Data Breach
- DDoS Attack
- Zero-Day Vulnerability
- Social Engineering
- Supply Chain Attack

**Pre-configured Risk Assessments:**
- 2 Critical risks (Database, Payment)
- 3 High risks (Portal, Email, Workstations)
- 2 Medium risks (Backup, File Sharing)
- 1 Low risk (CRM)

## Risk Scoring Reference

**Risk Score Matrix:**
```
         High Impact    Medium Impact   Low Impact
High     25 (Critical)  15 (High)       5 (Low)
Prob     
Medium   20 (High)      12 (Medium)     8 (Medium)
Prob
Low      10 (Medium)    6 (Low)         3 (Low)
```

**Risk Levels:**
- **25 (Critical):** Red badge - Immediate remediation required
- **15-20 (High):** Orange badge - Remediate within 30 days
- **8-14 (Medium):** Yellow badge - Remediate within 90 days
- **3-7 (Low):** Green badge - Accept or remediate opportunistically

## Key Workflows

### Creating a Risk Assessment

1. Navigate to "Assessments" page
2. Click "New Assessment" button
3. Select an Asset (e.g., "Production Database Server")
4. Select a Threat (e.g., "Ransomware Attack")
5. Set Likelihood to "High"
6. Set Impact to "High"
7. Enter Responsible Party (e.g., "John Smith")
8. Click "Create Assessment"
9. System calculates Risk Score = 25 (Critical)

### Generating a Report

1. Navigate to "Risk Reports" page
2. View executive summary metrics
3. Review treatment action tracking table
4. Click "Export PDF" to download report
5. (Demo version returns mock PDF)

## Troubleshooting

**Dashboard shows no data:**
- Refresh the page
- Check browser console for errors
- Clear browser cache

**Can't create new assessment:**
- Ensure asset and threat are selected
- Fill in all required fields
- Check browser console for error messages

**PDF export not working:**
- This is a demo feature - returns mock PDF
- In production, integrate PDF library (puppeteer, pdfkit)

## Database Integration (Future)

To connect to a real database:

1. Set up PostgreSQL/Neon database
2. Create tables using scripts in `/scripts` folder
3. Set DATABASE_URL environment variable
4. Update API routes to use real database instead of mock data

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel auto-detects Next.js and deploys
4. Set environment variables in Vercel dashboard

## File Structure

```
app/
  ├── page.tsx              # Dashboard
  ├── layout.tsx            # Root layout
  ├── globals.css           # Theme and styles
  ├── api/
  │   ├── assets/
  │   ├── threats/
  │   ├── assessments/
  │   ├── stats/
  │   └── reports/
  ├── assets/
  │   └── page.tsx          # Asset inventory
  ├── assessments/
  │   └── page.tsx          # Risk assessments
  └── reports/
      └── page.tsx          # Risk reports
```

## For Developers

### Adding a New Feature

1. Create component in `/components`
2. Create API route in `/app/api/<feature>`
3. Create page in `/app/<feature>/page.tsx`
4. Add navigation link in header

### Styling

- Use Tailwind CSS classes
- Reference color tokens from globals.css
- Risk levels use: `risk-critical`, `risk-high`, `risk-medium`, `risk-low`

### API Endpoints

All endpoints return JSON:
- `GET /api/assets` - List all assets
- `POST /api/assets` - Create asset
- `GET /api/threats` - List threats
- `GET /api/assessments` - List assessments
- `POST /api/assessments` - Create assessment
- `GET /api/stats` - Dashboard statistics
- `GET /api/reports` - Report data
- `POST /api/reports/export` - Generate PDF

## Next Steps

1. Run the application locally
2. Explore all four modules (Dashboard, Assets, Assessments, Reports)
3. Create a few sample assessments
4. Try exporting a report
5. Review the complete documentation in DOCUMENTATION.md

For questions or issues, refer to DOCUMENTATION.md or the inline code comments.
