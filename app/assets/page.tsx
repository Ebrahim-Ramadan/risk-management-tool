"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Plus, X } from "lucide-react"
import { mockAssets as initialAssets } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"

interface Asset {
  id: number
  name: string
  type: string
  department: string
  criticality: string
  owner: string
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "Server",
    department: "",
    criticality: "Medium",
    owner: "",
  })

  useEffect(() => {
    const stored = localStorage.getItem("assets")
    if (stored) {
      setAssets(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("assets", JSON.stringify(assets))
  }, [assets])

  const handleAddAsset = () => {
    if (!formData.name || !formData.department || !formData.owner) {
      alert("Please fill in all required fields")
      return
    }

    const newAsset: Asset = {
      id: Math.max(0, ...assets.map((a) => a.id)) + 1,
      ...formData,
    }

    setAssets([...assets, newAsset])
    setFormData({
      name: "",
      type: "Server",
      department: "",
      criticality: "Medium",
      owner: "",
    })
    setShowForm(false)
  }

  const handleDeleteAsset = (id: number) => {
    setAssets(assets.filter((a) => a.id !== id))
  }

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-card/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Asset Inventory</h1>
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
              <CardTitle>Assets</CardTitle>
              <CardDescription>Manage organizational IT assets and resources ({assets.length} total)</CardDescription>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Asset
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {showForm && (
              <div className="border border-border rounded-lg p-4 space-y-3 bg-muted/50">
                <Input
                  placeholder="Asset Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <select
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option>Server</option>
                  <option>Application</option>
                  <option>Network</option>
                  <option>Database</option>
                </select>
                <Input
                  placeholder="Department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
                <select
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  value={formData.criticality}
                  onChange={(e) => setFormData({ ...formData, criticality: e.target.value })}
                >
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <Input
                  placeholder="Owner Name"
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddAsset} className="flex-1">
                    Add Asset
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
                    <TableHead>Asset Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Criticality</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead className="w-10">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id} className="border-border hover:bg-muted/50">
                      <TableCell className="font-medium">{asset.name}</TableCell>
                      <TableCell>{asset.type}</TableCell>
                      <TableCell>{asset.department}</TableCell>
                      <TableCell>
                        <Badge variant={getCriticalityColor(asset.criticality)}>{asset.criticality}</Badge>
                      </TableCell>
                      <TableCell>{asset.owner}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDeleteAsset(asset.id)}
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
