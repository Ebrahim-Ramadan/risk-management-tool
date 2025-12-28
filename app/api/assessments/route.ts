export async function GET() {
  try {
    const mockAssessments = [
      {
        id: 1,
        asset_id: 1,
        threat_id: 1,
        risk_score: 25,
        risk_level: "Critical",
        treatment_status: "Mitigate",
        responsible_party: "John Smith",
      },
      {
        id: 2,
        asset_id: 3,
        threat_id: 4,
        risk_score: 20,
        risk_level: "High",
        treatment_status: "Mitigate",
        responsible_party: "Mike Chen",
      },
      {
        id: 3,
        asset_id: 6,
        threat_id: 1,
        risk_score: 25,
        risk_level: "Critical",
        treatment_status: "Mitigate",
        responsible_party: "Rachel Green",
      },
      {
        id: 4,
        asset_id: 2,
        threat_id: 2,
        risk_score: 15,
        risk_level: "High",
        treatment_status: "Mitigate",
        responsible_party: "Sarah Johnson",
      },
      {
        id: 5,
        asset_id: 5,
        threat_id: 2,
        risk_score: 15,
        risk_level: "High",
        treatment_status: "Mitigate",
        responsible_party: "James Wilson",
      },
      {
        id: 6,
        asset_id: 8,
        threat_id: 5,
        risk_score: 20,
        risk_level: "High",
        treatment_status: "Mitigate",
        responsible_party: "Tom Rodriguez",
      },
      {
        id: 7,
        asset_id: 4,
        threat_id: 7,
        risk_score: 12,
        risk_level: "Medium",
        treatment_status: "Mitigate",
        responsible_party: "Lisa Anderson",
      },
      {
        id: 8,
        asset_id: 7,
        threat_id: 3,
        risk_score: 8,
        risk_level: "Medium",
        treatment_status: "Accept",
        responsible_party: "David Martinez",
      },
    ]
    return Response.json(mockAssessments)
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Assessment created:", body)
    return Response.json({ success: true, id: Math.random() })
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
