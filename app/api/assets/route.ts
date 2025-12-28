export async function GET() {
  try {
    const mockAssets = [
      {
        id: 1,
        name: "Production Database Server",
        type: "Server",
        department: "Infrastructure",
        criticality: "Critical",
        owner: "John Smith",
      },
      {
        id: 2,
        name: "Email System",
        type: "Application",
        department: "IT Operations",
        criticality: "High",
        owner: "Sarah Johnson",
      },
      {
        id: 3,
        name: "Customer Portal",
        type: "Application",
        department: "Product",
        criticality: "High",
        owner: "Mike Chen",
      },
      {
        id: 4,
        name: "File Sharing Service",
        type: "Application",
        department: "IT Operations",
        criticality: "Medium",
        owner: "Lisa Anderson",
      },
      {
        id: 5,
        name: "Employee Workstations",
        type: "Server",
        department: "IT Operations",
        criticality: "Medium",
        owner: "James Wilson",
      },
      {
        id: 6,
        name: "Payment Processing",
        type: "Application",
        department: "Finance",
        criticality: "Critical",
        owner: "Rachel Green",
      },
      {
        id: 7,
        name: "CRM System",
        type: "Application",
        department: "Sales",
        criticality: "High",
        owner: "David Martinez",
      },
      {
        id: 8,
        name: "Backup Systems",
        type: "Server",
        department: "Infrastructure",
        criticality: "Critical",
        owner: "Tom Rodriguez",
      },
    ]
    return Response.json(mockAssets)
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Asset created:", body)
    return Response.json({ success: true, id: Math.random() })
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
