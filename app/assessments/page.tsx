"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Plus, X } from "lucide-react"
import { mockAssets, mockThreats, mockAssessments as initialAssessments } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"

interface Asset {
  id: number
  name: string
  type: string
  department: string
  criticality: string
  owner: string
}

interface Assessment {
  id: number
  asset_id: number
  threat_id: number
  risk_score: number
  risk_level: string
  treatment_status: string
  responsible_party: string
}

export default function AssessmentsPage() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets)
  const [assessments, setAssessments] = useState<Assessment[]>(initialAssessments)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    asset_id: 1,
    threat_id: 1,
    likelihood: 5,
    impact: 5,
    responsible_party: "",
  })

  useEffect(() => {
    const storedAssets = localStorage.getItem("assets")
    if (storedAssets) {
      setAssets(JSON.parse(storedAssets))
    }

    const storedAssessments = localStorage.getItem("assessments")
    if (storedAssessments) {
      setAssessments(JSON.parse(storedAssessments))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("assessments", JSON.stringify(assessments))
  }, [assessments])

  const calculateRiskScore = (likelihood: number, impact: number) => {
    return likelihood * impact
  }

  const getRiskLevel = (score: number): string => {
    if (score >= 20) return "Critical"
    if (score >= 15) return "High"
    if (score >= 8) return "Medium"
    return "Low"
  }

  const handleAddAssessment = () => {
    if (!formData.responsible_party) {
      alert("Please enter responsible party")
      return
    }

    const risk_score = calculateRiskScore(formData.likelihood, formData.impact)
    const risk_level = getRiskLevel(risk_score)

    const newAssessment: Assessment = {
      id: Math.max(0, ...assessments.map((a) => a.id)) + 1,
      asset_id: formData.asset_id,
      threat_id: formData.threat_id,
      risk_score: Math.min(25, risk_score),
      risk_level,
      treatment_status: "Mitigate",
      responsible_party: formData.responsible_party,
    }

    setAssessments([...assessments, newAssessment])
    setFormData({
      asset_id: 1,
      threat_id: 1,
      likelihood: 5,
      impact: 5,
      responsible_party: "",
    })
    setShowForm(false)
  }

  const handleDeleteAssessment = (id: number) => {
    setAssessments(assessments.filter((a) => a.id !== id))
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Critical":
        return "destructive"
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getAssetName = (assetId: number) => {
    return assets.find((a) => a.id === assetId)?.name || "Unknown"
  }

  const getThreatName = (threatId: number) => {
    return mockThreats.find((t) => t.id === threatId)?.name || "Unknown"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-card/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Risk Assessments</h1>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Risk Assessments</CardTitle>
              <CardDescription>
                Evaluate threats, vulnerabilities, and calculated risk scores ({assessments.length} assessments)
              </CardDescription>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Assessment
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {showForm && (
              <div className="border border-border rounded-lg p-4 space-y-3 bg-muted/50">
                <select
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  value={formData.asset_id}
                  onChange={(e) => setFormData({ ...formData, asset_id: Number.parseInt(e.target.value) })}
                >
                  {assets.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.name}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  value={formData.threat_id}
                  onChange={(e) => setFormData({ ...formData, threat_id: Number.parseInt(e.target.value) })}
                >
                  {mockThreats.map((threat) => (
                    <option key={threat.id} value={threat.id}>
                      {threat.name}
                    </option>
                  ))}
                </select>
                <div>
                  <label className="text-sm font-medium">Likelihood (1-5)</label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.likelihood}
                    onChange={(e) => setFormData({ ...formData, likelihood: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Impact (1-5)</label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.impact}
                    onChange={(e) => setFormData({ ...formData, impact: Number.parseInt(e.target.value) })}
                  />
                </div>
                <Input
                  placeholder="Responsible Party"
                  value={formData.responsible_party}
                  onChange={(e) => setFormData({ ...formData, responsible_party: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddAssessment} className="flex-1">
                    Add Assessment
                  </Button>
                  <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Asset</TableHead>
                    <TableHead>Threat</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Responsible Party</TableHead>
                    <TableHead className="w-10">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessments.map((assessment) => (
                    <TableRow key={assessment.id} className="border-border hover:bg-muted/50">
                      <TableCell className="font-medium">{getAssetName(assessment.asset_id)}</TableCell>
                      <TableCell>{getThreatName(assessment.threat_id)}</TableCell>
                      <TableCell>
                        <span className="font-bold">{assessment.risk_score}/25</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRiskColor(assessment.risk_level)}>{assessment.risk_level}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{assessment.treatment_status}</Badge>
                      </TableCell>
                      <TableCell>{assessment.responsible_party}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDeleteAssessment(assessment.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </TableCell>
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
