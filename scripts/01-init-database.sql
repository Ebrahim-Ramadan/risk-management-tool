-- Risk Management Tool Database Schema

-- Assets table
CREATE TABLE IF NOT EXISTS assets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL, -- Server, Application, Data, Network, etc.
  department VARCHAR(100),
  criticality VARCHAR(20) NOT NULL, -- Critical, High, Medium, Low
  location VARCHAR(255),
  owner VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Threats table
CREATE TABLE IF NOT EXISTS threats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  threat_type VARCHAR(100) NOT NULL, -- Malware, Social Engineering, Phishing, etc.
  source VARCHAR(100), -- Internal, External, Both
  likelihood VARCHAR(20) NOT NULL, -- High, Medium, Low
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vulnerabilities table
CREATE TABLE IF NOT EXISTS vulnerabilities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  severity VARCHAR(20) NOT NULL, -- Critical, High, Medium, Low
  asset_id INTEGER REFERENCES assets(id),
  cve_id VARCHAR(20),
  mitigation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Risk Assessment table
CREATE TABLE IF NOT EXISTS risk_assessments (
  id SERIAL PRIMARY KEY,
  asset_id INTEGER NOT NULL REFERENCES assets(id),
  threat_id INTEGER NOT NULL REFERENCES threats(id),
  vulnerability_id INTEGER REFERENCES vulnerabilities(id),
  likelihood VARCHAR(20) NOT NULL, -- High, Medium, Low
  impact VARCHAR(20) NOT NULL, -- High, Medium, Low
  risk_score INTEGER NOT NULL, -- Calculated: 1-25
  risk_level VARCHAR(20) NOT NULL, -- Critical, High, Medium, Low
  treatment_status VARCHAR(50) NOT NULL DEFAULT 'Pending', -- Pending, Mitigate, Accept, Transfer, Avoid
  treatment_plan TEXT,
  responsible_party VARCHAR(255),
  target_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Risk History (audit trail)
CREATE TABLE IF NOT EXISTS risk_history (
  id SERIAL PRIMARY KEY,
  risk_assessment_id INTEGER NOT NULL REFERENCES risk_assessments(id),
  old_risk_level VARCHAR(20),
  new_risk_level VARCHAR(20),
  change_reason TEXT,
  changed_by VARCHAR(255),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_assets_criticality ON assets(criticality);
CREATE INDEX idx_threats_likelihood ON threats(likelihood);
CREATE INDEX idx_vulnerabilities_severity ON vulnerabilities(severity);
CREATE INDEX idx_risk_assessments_asset ON risk_assessments(asset_id);
CREATE INDEX idx_risk_assessments_threat ON risk_assessments(threat_id);
CREATE INDEX idx_risk_assessments_risk_level ON risk_assessments(risk_level);
