-- Sample data for demonstration purposes

-- Insert sample assets
INSERT INTO assets (name, type, department, criticality, location, owner) VALUES
('Production Database Server', 'Server', 'Infrastructure', 'Critical', 'Data Center A', 'John Smith'),
('Email System', 'Application', 'IT Operations', 'High', 'Cloud', 'Sarah Johnson'),
('Customer Portal', 'Application', 'Product', 'High', 'Cloud', 'Mike Chen'),
('File Sharing Service', 'Application', 'IT Operations', 'Medium', 'Cloud', 'Lisa Anderson'),
('Employee Workstations', 'Server', 'IT Operations', 'Medium', 'Office Network', 'James Wilson'),
('Payment Processing', 'Application', 'Finance', 'Critical', 'Cloud', 'Rachel Green'),
('CRM System', 'Application', 'Sales', 'High', 'Cloud', 'David Martinez'),
('Backup Systems', 'Server', 'Infrastructure', 'Critical', 'Data Center B', 'Tom Rodriguez');

-- Insert sample threats
INSERT INTO threats (name, description, threat_type, source, likelihood) VALUES
('Ransomware Attack', 'Encryption of critical data and systems', 'Malware', 'External', 'High'),
('Phishing Campaign', 'Targeted emails to harvest credentials', 'Social Engineering', 'External', 'High'),
('Insider Threat', 'Malicious actions by employees or contractors', 'Insider Threat', 'Internal', 'Medium'),
('Data Breach', 'Unauthorized access and exfiltration of sensitive data', 'Data Breach', 'External', 'Medium'),
('DDoS Attack', 'Distributed denial of service on critical systems', 'Network Attack', 'External', 'Medium'),
('Zero-Day Vulnerability', 'Exploitation of previously unknown vulnerabilities', 'Malware', 'External', 'Low'),
('Social Engineering', 'Manipulation to gain unauthorized access', 'Social Engineering', 'External', 'High'),
('Supply Chain Attack', 'Compromise through third-party vendors', 'External', 'External', 'Medium');

-- Insert sample vulnerabilities
INSERT INTO vulnerabilities (name, description, severity, asset_id, cve_id, mitigation) VALUES
('Unpatched Server', 'Production server missing critical OS patches', 'Critical', 1, 'CVE-2024-1234', 'Apply security patches immediately'),
('Weak Password Policy', 'Default password policy allows weak passwords', 'High', 2, NULL, 'Implement strong password requirements'),
('SQL Injection Risk', 'Input validation issues in customer portal', 'Critical', 3, 'CVE-2023-5678', 'Implement parameterized queries'),
('Missing Encryption', 'Data in transit not encrypted', 'High', 4, NULL, 'Enable TLS 1.3 for all connections'),
('No MFA', 'Multi-factor authentication not enforced', 'High', 5, NULL, 'Deploy MFA across all systems'),
('Outdated Framework', 'Payment system uses legacy framework', 'Critical', 6, 'CVE-2024-9999', 'Update to latest secure version'),
('Insufficient Logging', 'CRM lacks comprehensive audit logs', 'Medium', 7, NULL, 'Enable detailed logging and monitoring'),
('Unencrypted Backups', 'Backup data stored without encryption', 'High', 8, NULL, 'Implement encryption at rest');

-- Insert sample risk assessments
INSERT INTO risk_assessments (asset_id, threat_id, vulnerability_id, likelihood, impact, risk_score, risk_level, treatment_status, treatment_plan, responsible_party, target_date) VALUES
(1, 1, 1, 'High', 'High', 25, 'Critical', 'Mitigate', 'Apply patches, update monitoring, incident response plan', 'John Smith', '2025-01-15'),
(3, 4, 3, 'Medium', 'High', 20, 'High', 'Mitigate', 'Code review and refactoring for SQL injection fixes', 'Mike Chen', '2025-02-01'),
(6, 1, 6, 'High', 'High', 25, 'Critical', 'Mitigate', 'Framework upgrade with security hardening', 'Rachel Green', '2025-01-30'),
(2, 2, 2, 'High', 'Medium', 15, 'High', 'Mitigate', 'Deploy security awareness training and MFA', 'Sarah Johnson', '2025-02-15'),
(5, 2, 5, 'High', 'Medium', 15, 'High', 'Mitigate', 'Enforce MFA on all workstations', 'James Wilson', '2025-01-20'),
(8, 5, 8, 'Medium', 'High', 20, 'High', 'Mitigate', 'Implement encryption for backup data', 'Tom Rodriguez', '2025-02-28'),
(4, 7, 4, 'Medium', 'Medium', 12, 'Medium', 'Mitigate', 'Enable TLS encryption, rotate credentials', 'Lisa Anderson', '2025-03-15'),
(7, 3, 7, 'Low', 'Medium', 8, 'Medium', 'Accept', 'Implement enhanced monitoring and alerting', 'David Martinez', '2025-04-01');
