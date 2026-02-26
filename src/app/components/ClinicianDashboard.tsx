import { useState } from "react";
import { motion } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Users,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Search,
  Download,
  Filter,
  Bell,
  ChevronRight,
  Activity,
  Brain,
  FileText,
  ArrowUpDown,
} from "lucide-react";

const patients = [
  { id: "P-1042", name: "Margaret Collins", age: 72, risk: 78, trend: "declining", lastAssessment: "Feb 24, 2026", change: -8, domain: "Memory" },
  { id: "P-1038", name: "Robert Jenkins", age: 68, risk: 62, trend: "declining", lastAssessment: "Feb 22, 2026", change: -5, domain: "Executive" },
  { id: "P-1045", name: "Eleanor Wright", age: 75, risk: 45, trend: "stable", lastAssessment: "Feb 25, 2026", change: -2, domain: "Attention" },
  { id: "P-1033", name: "James Patterson", age: 70, risk: 35, trend: "stable", lastAssessment: "Feb 20, 2026", change: 0, domain: "Memory" },
  { id: "P-1029", name: "Dorothy Chen", age: 66, risk: 28, trend: "improving", lastAssessment: "Feb 23, 2026", change: 3, domain: "Language" },
  { id: "P-1051", name: "William Harris", age: 73, risk: 22, trend: "stable", lastAssessment: "Feb 26, 2026", change: -1, domain: "Attention" },
  { id: "P-1047", name: "Susan Garcia", age: 69, risk: 15, trend: "improving", lastAssessment: "Feb 21, 2026", change: 5, domain: "Memory" },
];

const trendData = [
  { month: "Sep", high: 12, moderate: 18, low: 45 },
  { month: "Oct", high: 14, moderate: 20, low: 42 },
  { month: "Nov", high: 13, moderate: 22, low: 44 },
  { month: "Dec", high: 15, moderate: 19, low: 46 },
  { month: "Jan", high: 16, moderate: 21, low: 43 },
  { month: "Feb", high: 14, moderate: 23, low: 48 },
];

const comparativeData = [
  { domain: "Memory", avg: 72, cohort: 78 },
  { domain: "Executive", avg: 75, cohort: 80 },
  { domain: "Language", avg: 82, cohort: 85 },
  { domain: "Attention", avg: 70, cohort: 77 },
  { domain: "Visuospatial", avg: 79, cohort: 82 },
];

const alerts = [
  { patient: "Margaret Collins", message: "Significant memory decline detected (-8 pts over 3 months)", severity: "high", time: "2h ago" },
  { patient: "Robert Jenkins", message: "Executive function trending below threshold", severity: "high", time: "5h ago" },
  { patient: "Eleanor Wright", message: "Attention scores showing increased variability", severity: "moderate", time: "1d ago" },
];

export default function ClinicianDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"risk" | "name" | "date">("risk");
  const [filterRisk, setFilterRisk] = useState<"all" | "high" | "moderate" | "low">("all");

  const filteredPatients = patients
    .filter((p) => {
      if (filterRisk === "high") return p.risk > 60;
      if (filterRisk === "moderate") return p.risk > 30 && p.risk <= 60;
      if (filterRisk === "low") return p.risk <= 30;
      return true;
    })
    .filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "risk") return b.risk - a.risk;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const getRiskBadge = (risk: number) => {
    if (risk > 60)
      return { bg: "bg-red-100 dark:bg-red-950", text: "text-red-600 dark:text-red-400", dot: "bg-red-500", label: "High" };
    if (risk > 30)
      return { bg: "bg-amber-100 dark:bg-amber-950", text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500", label: "Moderate" };
    return { bg: "bg-green-100 dark:bg-green-950", text: "text-green-600 dark:text-green-400", dot: "bg-green-500", label: "Low" };
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl text-foreground mb-2">Clinician Dashboard</h1>
            <p className="text-muted-foreground">Multi-patient cognitive screening overview</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl">
            <Download className="w-4 h-4" /> Export Reports
          </button>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Patients", value: "85", icon: Users, color: "text-primary" },
            { label: "High Risk", value: "14", icon: AlertTriangle, color: "text-red-500" },
            { label: "Declining Trend", value: "23", icon: TrendingDown, color: "text-amber-500" },
            { label: "Assessments Today", value: "12", icon: Activity, color: "text-green-500" },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl border border-border shadow-sm p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <p className="text-2xl text-foreground">{card.value}</p>
                <p className="text-muted-foreground text-sm">{card.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">Cognitive Decline Alerts</h3>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-xl border ${
                  alert.severity === "high"
                    ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/50"
                    : "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/50"
                }`}
              >
                <AlertTriangle
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    alert.severity === "high" ? "text-red-500" : "text-amber-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-foreground text-sm">
                    <strong>{alert.patient}</strong> — {alert.message}
                  </p>
                </div>
                <span className="text-muted-foreground text-xs whitespace-nowrap">{alert.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Patient Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h3 className="text-foreground">Patient Overview</h3>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-input-background rounded-xl border border-border text-sm focus:border-primary outline-none w-48"
                  placeholder="Search patients..."
                />
              </div>
              <div className="flex gap-1">
                {(["all", "high", "moderate", "low"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterRisk(f)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors capitalize ${
                      filterRisk === f
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 text-muted-foreground text-sm">Patient</th>
                  <th className="text-left py-3 px-3 text-muted-foreground text-sm">Age</th>
                  <th className="text-left py-3 px-3 text-muted-foreground text-sm cursor-pointer" onClick={() => setSortBy("risk")}>
                    <span className="flex items-center gap-1">Risk Score <ArrowUpDown className="w-3 h-3" /></span>
                  </th>
                  <th className="text-left py-3 px-3 text-muted-foreground text-sm">Status</th>
                  <th className="text-left py-3 px-3 text-muted-foreground text-sm">Change</th>
                  <th className="text-left py-3 px-3 text-muted-foreground text-sm">Primary Domain</th>
                  <th className="text-left py-3 px-3 text-muted-foreground text-sm">Last Assessment</th>
                  <th className="py-3 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => {
                  const badge = getRiskBadge(patient.risk);
                  return (
                    <tr key={patient.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-3">
                        <div>
                          <p className="text-foreground text-sm">{patient.name}</p>
                          <p className="text-muted-foreground text-xs">{patient.id}</p>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-foreground text-sm">{patient.age}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${badge.dot}`} style={{ width: `${patient.risk}%` }} />
                          </div>
                          <span className="text-foreground text-sm">{patient.risk}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs ${badge.bg} ${badge.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`flex items-center gap-1 text-sm ${
                          patient.change < 0 ? "text-red-500" : patient.change > 0 ? "text-green-500" : "text-muted-foreground"
                        }`}>
                          {patient.change < 0 ? <TrendingDown className="w-3.5 h-3.5" /> : patient.change > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : null}
                          {patient.change > 0 ? "+" : ""}{patient.change}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-muted-foreground text-sm">{patient.domain}</td>
                      <td className="py-3 px-3 text-muted-foreground text-sm whitespace-nowrap">{patient.lastAssessment}</td>
                      <td className="py-3 px-3">
                        <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl border border-border shadow-sm p-6"
          >
            <h3 className="text-foreground mb-4">Risk Distribution Trend</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="low" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} name="Low Risk" />
                  <Bar dataKey="moderate" stackId="a" fill="#f59e0b" name="Moderate" />
                  <Bar dataKey="high" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} name="High Risk" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl border border-border shadow-sm p-6"
          >
            <h3 className="text-foreground mb-4">Comparative Domain Performance</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparativeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" domain={[0, 100]} stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis type="category" dataKey="domain" stroke="var(--muted-foreground)" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="avg" fill="var(--primary)" radius={[0, 4, 4, 0]} name="Your Patients" />
                  <Bar dataKey="cohort" fill="var(--chart-2)" radius={[0, 4, 4, 0]} name="National Cohort" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
