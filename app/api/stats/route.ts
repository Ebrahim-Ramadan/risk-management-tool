export async function GET() {
  try {
    const mockData = {
      totalAssets: 8,
      criticalRisks: 2,
      highRisks: 3,
      mediumRisks: 2,
      lowRisks: 1,
    }
    return Response.json(mockData)
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
