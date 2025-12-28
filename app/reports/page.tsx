"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Download } from "lucide-react"
import { mockAssets, mockAssessments, mockThreats } from "@/lib/mock-data"
import jsPDF from "jspdf"
import "jspdf-autotable"

export default function ReportsPage() {
  const reportData = useMemo(() => {
    const criticalRisks = mockAssessments.filter((a) => a.risk_level === "Critical").length
    const highRisks = mockAssessments.filter((a) => a.risk_level === "High").length
    const mediumRisks = mockAssessments.filter((a) => a.risk_level === "Medium").length
    const lowRisks = mockAssessments.filter((a) => a.risk_level === "Low").length

    const riskTreatmentActions = mockAssessments.map((assessment) => {
      const asset = mockAssets.find((a) => a.id === assessment.asset_id)
      const threat = mockThreats.find((t) => t.id === assessment.threat_id)
      return {
        asset: asset?.name || "Unknown",
        threat: threat?.name || "Unknown",
        risk_level: assessment.risk_level,
        risk_score: assessment.risk_score,
        treatment: assessment.treatment_status,
        responsible_party: assessment.responsible_party,
        target_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      }
    })

    return {
      totalAssets: mockAssets.length,
      totalAssessments: mockAssessments.length,
      criticalRisks,
      highRisks,
      mediumRisks,
      lowRisks,
      riskTreatmentActions,
    }
  }, [])

  const generatePDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 15
    let yPosition = margin

    // Title
    doc.setFontSize(20)
    doc.setTextColor(40, 40, 40)
    doc.text("Risk Management Report", margin, yPosition)
    yPosition += 10

    // Date
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition)
    yPosition += 8

    // Executive Summary
    doc.setFontSize(14)
    doc.setTextColor(40, 40, 40)
    doc.text("Executive Summary", margin, yPosition)
    yPosition += 7

    doc.setFontSize(11)
    doc.setTextColor(60, 60, 60)
    const summaryText = doc.splitTextToSize(
      `This report provides a comprehensive overview of the organization's current risk posture. It details all identified assets, associated threats, calculated risk scores, and the treatment actions being taken to mitigate identified risks. The assessment methodology uses a 5x5 likelihood and impact matrix resulting in risk scores from 1-25.`,
      pageWidth - 2 * margin,
    )
    doc.text(summaryText, margin, yPosition)
    yPosition += summaryText.length * 5 + 5

    // Risk Statistics
    doc.setFontSize(12)
    doc.setTextColor(40, 40, 40)
    doc.text("Risk Overview", margin, yPosition)
    yPosition += 7

    const statsData = [
      ["Total Assets", reportData.totalAssets.toString()],
      ["Total Risk Assessments", reportData.totalAssessments.toString()],
      ["Critical Risks", reportData.criticalRisks.toString()],
      ["High Risks", reportData.highRisks.toString()],
      ["Medium Risks", reportData.mediumRisks.toString()],
      ["Low Risks", reportData.lowRisks.toString()],
    ]

    doc.autoTable({
      startY: yPosition,
      head: [["Metric", "Count"]],
      body: statsData,
      margin: { left: margin, right: margin },
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255], fontStyle: "bold" },
      bodyStyles: { textColor: [60, 60, 60] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    })

    yPosition = (doc as any).lastAutoTable.finalY + 10

    // Risk Treatment Actions Table
    if (yPosition > pageHeight - 50) {
      doc.addPage()
      yPosition = margin
    }

    doc.setFontSize(12)
    doc.setTextColor(40, 40, 40)
    doc.text("Risk Treatment Actions", margin, yPosition)
    yPosition += 7

    const treatmentData = reportData.riskTreatmentActions.map((action) => [
      action.asset,
      action.threat,
      action.risk_score.toString(),
      action.risk_level,
      action.treatment,
      action.responsible_party,
    ])

    doc.autoTable({
      startY: yPosition,
      head: [["Asset", "Threat", "Score", "Level", "Treatment", "Owner"]],
      body: treatmentData,
      margin: { left: margin, right: margin },
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255], fontStyle: "bold" },
      bodyStyles: { textColor: [60, 60, 60] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      columnStyles: {
        2: { halign: "center" },
        3: { halign: "center" },
      },
    })

    yPosition = (doc as any).lastAutoTable.finalY + 10

    // Footer
    if (yPosition > pageHeight - 30) {
      doc.addPage()
      yPosition = pageHeight - 20
    }

    doc.setFontSize(9)
    doc.setTextColor(150, 150, 150)
    doc.text("This report is confidential and for internal use only.", margin, yPosition)

    // Save PDF
    doc.save("Risk_Management_Report.pdf")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-card/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Risk Reports</h1>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Summary */}
        <Card className="bg-card border-border mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Risk Management Report</CardTitle>
              <CardDescription>Executive summary of current risk posture</CardDescription>
            </div>
            <Button onClick={generatePDF} className="gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Assets</p>
                <p className="text-2xl font-bold">{reportData.totalAssets}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Assessments</p>
                <p className="text-2xl font-bold">{reportData.totalAssessments}</p>
              </div>
              <div className="risk-critical p-3 rounded-lg">
                <p className="text-sm font-medium">Critical</p>
                <p className="text-2xl font-bold">{reportData.criticalRisks}</p>
              </div>
              <div className="risk-high p-3 rounded-lg">
                <p className="text-sm font-medium">High</p>
                <p className="text-2xl font-bold">{reportData.highRisks}</p>
              </div>
              <div className="risk-medium p-3 rounded-lg">
                <p className="text-sm font-medium">Medium</p>
                <p className="text-2xl font-bold">{reportData.mediumRisks}</p>
              </div>
              <div className="risk-low p-3 rounded-lg">
                <p className="text-sm font-medium">Low</p>
                <p className="text-2xl font-bold">{reportData.lowRisks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Treatment Actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Risk Treatment Actions</CardTitle>
            <CardDescription>Mitigation and acceptance actions pending completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Asset</TableHead>
                    <TableHead>Threat</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Responsible Party</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.riskTreatmentActions.map((action, idx) => (
                    <TableRow key={idx} className="border-border hover:bg-muted/50">
                      <TableCell className="font-medium">{action.asset}</TableCell>
                      <TableCell>{action.threat}</TableCell>
                      <TableCell>{action.risk_score}</TableCell>
                      <TableCell>
                        <Badge variant={action.risk_level === "Critical" ? "destructive" : "default"}>
                          {action.risk_level}
                        </Badge>
                      </TableCell>
                      <TableCell>{action.treatment}</TableCell>
                      <TableCell>{action.responsible_party}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
