export async function GET() {
  try {
    const mockThreats = [
      { id: 1, name: "Ransomware Attack", threat_type: "Malware", likelihood: "High" },
      { id: 2, name: "Phishing Campaign", threat_type: "Social Engineering", likelihood: "High" },
      { id: 3, name: "Insider Threat", threat_type: "Insider Threat", likelihood: "Medium" },
      { id: 4, name: "Data Breach", threat_type: "Data Breach", likelihood: "Medium" },
      { id: 5, name: "DDoS Attack", threat_type: "Network Attack", likelihood: "Medium" },
      { id: 6, name: "Zero-Day Vulnerability", threat_type: "Malware", likelihood: "Low" },
      { id: 7, name: "Social Engineering", threat_type: "Social Engineering", likelihood: "High" },
      { id: 8, name: "Supply Chain Attack", threat_type: "External", likelihood: "Medium" },
    ]
    return Response.json(mockThreats)
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
