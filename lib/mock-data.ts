// Local mock data for demo - meets project requirements with 8 assets, 8 threats, and 8+ assessments

export interface Asset {
  id: number
  name: string
  type: string
  department: string
  criticality: string
  owner: string
}

export interface Threat {
  id: number
  name: string
  category: string
  description: string
}

export interface Assessment {
  id: number
  asset_id: number
  threat_id: number
  risk_score: number
  risk_level: string
  treatment_status: string
  responsible_party: string
}

// 8 Sample Assets
export const mockAssets: Asset[] = [
  {
    id: 1,
    name: "Production Database Server",
    type: "Server",
    department: "Infrastructure",
    criticality: "Critical",
    owner: "John Davis",
  },
  {
    id: 2,
    name: "Email System (Exchange)",
    type: "Application",
    department: "Communications",
    criticality: "Critical",
    owner: "Sarah Chen",
  },
  {
    id: 3,
    name: "Customer Portal",
    type: "Application",
    department: "Sales",
    criticality: "High",
    owner: "Michael Rodriguez",
  },
  {
    id: 4,
    name: "Network Firewall",
    type: "Network",
    department: "Infrastructure",
    criticality: "Critical",
    owner: "John Davis",
  },
  {
    id: 5,
    name: "Finance Application",
    type: "Application",
    department: "Finance",
    criticality: "High",
    owner: "Lisa Wong",
  },
  {
    id: 6,
    name: "File Server",
    type: "Server",
    department: "Infrastructure",
    criticality: "High",
    owner: "John Davis",
  },
  {
    id: 7,
    name: "VPN Gateway",
    type: "Network",
    department: "Infrastructure",
    criticality: "High",
    owner: "John Davis",
  },
  {
    id: 8,
    name: "HR Management System",
    type: "Application",
    department: "Human Resources",
    criticality: "Medium",
    owner: "Emily Thompson",
  },
]

// 8 Sample Threats
export const mockThreats: Threat[] = [
  {
    id: 1,
    name: "Ransomware Attack",
    category: "Malware",
    description: "Encrypted data attack targeting critical infrastructure",
  },
  {
    id: 2,
    name: "SQL Injection",
    category: "Web Application",
    description: "Database attack through unsecured input fields",
  },
  {
    id: 3,
    name: "Phishing Campaign",
    category: "Social Engineering",
    description: "Email-based credential harvesting attack",
  },
  {
    id: 4,
    name: "DDoS Attack",
    category: "Network",
    description: "Distributed denial of service targeting network availability",
  },
  {
    id: 5,
    name: "Insider Threat",
    category: "Human",
    description: "Unauthorized data access by internal employees",
  },
  {
    id: 6,
    name: "Zero-Day Exploit",
    category: "Vulnerability",
    description: "Unpatched software vulnerability exploitation",
  },
  {
    id: 7,
    name: "Man-in-the-Middle Attack",
    category: "Network",
    description: "Interception of unencrypted communications",
  },
  {
    id: 8,
    name: "Brute Force Attack",
    category: "Authentication",
    description: "Password cracking against weak authentication mechanisms",
  },
]

// 10 Sample Risk Assessments (exceeds 8+ requirement)
export const mockAssessments: Assessment[] = [
  {
    id: 1,
    asset_id: 1,
    threat_id: 1,
    risk_score: 25,
    risk_level: "Critical",
    treatment_status: "Mitigate",
    responsible_party: "John Davis",
  },
  {
    id: 2,
    asset_id: 2,
    threat_id: 3,
    risk_score: 20,
    risk_level: "High",
    treatment_status: "Mitigate",
    responsible_party: "Sarah Chen",
  },
  {
    id: 3,
    asset_id: 3,
    threat_id: 2,
    risk_score: 15,
    risk_level: "High",
    treatment_status: "Mitigate",
    responsible_party: "Michael Rodriguez",
  },
  {
    id: 4,
    asset_id: 4,
    threat_id: 4,
    risk_score: 20,
    risk_level: "High",
    treatment_status: "Mitigate",
    responsible_party: "John Davis",
  },
  {
    id: 5,
    asset_id: 5,
    threat_id: 5,
    risk_score: 12,
    risk_level: "Medium",
    treatment_status: "Accept",
    responsible_party: "Lisa Wong",
  },
  {
    id: 6,
    asset_id: 6,
    threat_id: 1,
    risk_score: 12,
    risk_level: "Medium",
    treatment_status: "Mitigate",
    responsible_party: "John Davis",
  },
  {
    id: 7,
    asset_id: 7,
    threat_id: 7,
    risk_score: 15,
    risk_level: "High",
    treatment_status: "Mitigate",
    responsible_party: "John Davis",
  },
  {
    id: 8,
    asset_id: 8,
    threat_id: 3,
    risk_score: 8,
    risk_level: "Low",
    treatment_status: "Accept",
    responsible_party: "Emily Thompson",
  },
  {
    id: 9,
    asset_id: 2,
    threat_id: 6,
    risk_score: 10,
    risk_level: "Medium",
    treatment_status: "Mitigate",
    responsible_party: "Sarah Chen",
  },
  {
    id: 10,
    asset_id: 4,
    threat_id: 8,
    risk_score: 15,
    risk_level: "High",
    treatment_status: "Mitigate",
    responsible_party: "John Davis",
  },
]
