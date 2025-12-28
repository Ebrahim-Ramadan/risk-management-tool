"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Shield, AlertTriangle, TrendingUp, Database } from "lucide-react"
import { mockAssets, mockAssessments } from "@/lib/mock-data"

export default function Dashboard() {
  const stats = useMemo(() => {
    const criticalRisks = mockAssessments.filter((a) => a.risk_level === "Critical").length
    const highRisks = mockAssessments.filter((a) => a.risk_level === "High").length
    const mediumRisks = mockAssessments.filter((a) => a.risk_level === "Medium").length
    const lowRisks = mockAssessments.filter((a) => a.risk_level === "Low").length

    return {
      totalAssets: mockAssets.length,
      criticalRisks,
      highRisks,
      mediumRisks,
      lowRisks,
    }
  }, [])

  const riskData = [
    { name: "Critical", value: stats.criticalRisks, color: "#dc2626" },
    { name: "High", value: stats.highRisks, color: "#ea580c" },
    { name: "Medium", value: stats.mediumRisks, color: "#eab308" },
    { name: "Low", value: stats.lowRisks, color: "#16a34a" },
  ]

  const assetTypeData = [
    { name: "Server", count: mockAssets.filter((a) => a.type === "Server").length },
    { name: "Application", count: mockAssets.filter((a) => a.type === "Application").length },
    { name: "Network", count: mockAssets.filter((a) => a.type === "Network").length },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-card/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Risk Management</h1>
              <p className="text-sm text-muted-foreground">Enterprise IT Security</p>
            </div>
          </div>
          <nav className="flex gap-4">
            <Link href="/assets">
              <Button variant="outline">Assets</Button>
            </Link>
            <Link href="/assessments">
              <Button variant="outline">Assessments</Button>
            </Link>
            <Link href="/reports">
              <Button>Generate Report</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{stats.totalAssets}</div>
                <Database className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border risk-critical">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Critical Risks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{stats.criticalRisks}</div>
                <AlertTriangle className="w-8 h-8 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border risk-high">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">High Risks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{stats.highRisks}</div>
                <TrendingUp className="w-8 h-8 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border risk-medium">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Medium Risks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.mediumRisks}</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border risk-low">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Low Risks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.lowRisks}</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Risk Distribution</CardTitle>
              <CardDescription>Overview of risks by severity level</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Assets by Type</CardTitle>
              <CardDescription>Distribution of asset inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={assetTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(20,20,30,0.9)", border: "1px solid rgba(255,255,255,0.2)" }}
                  />
                  <Bar dataKey="count" fill="hsl(240, 100%, 50%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
