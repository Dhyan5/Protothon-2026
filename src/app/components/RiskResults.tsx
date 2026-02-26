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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Download,
  Share2,
  Brain,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Lightbulb,
  Calendar,
  ChevronDown,
  ChevronUp,
  Shield,
} from "lucide-react";

const trendData = [
  { month: "Oct", score: 78 },
  { month: "Nov", score: 75 },
  { month: "Dec", score: 73 },
  { month: "Jan", score: 70 },
  { month: "Feb", score: 68 },
];

const domainData = [
  { domain: "Memory", score: 68, fullMark: 100 },
  { domain: "Executive", score: 75, fullMark: 100 },
  { domain: "Language", score: 82, fullMark: 100 },
  { domain: "Attention", score: 71, fullMark: 100 },
  { domain: "Visuospatial", score: 79, fullMark: 100 },
];

const domainDetails = [
  {
    name: "Memory",
    score: 68,
    change: -3,
    description: "Word recall and recognition memory showed mild decline. Delayed recall was most affected.",
    risk: "moderate",
  },
  {
    name: "Executive Function",
    score: 75,
    change: -1,
    description: "Planning and organization tasks performed within normal range with slight slowing.",
    risk: "low",
  },
  {
    name: "Language",
    score: 82,
    change: 0,
    description: "Verbal fluency and naming abilities remain strong. No significant changes detected.",
    risk: "low",
  },
  {
    name: "Attention",
    score: 71,
    change: -4,
    description: "Sustained attention showed some variability. Reaction times slightly elevated.",
    risk: "moderate",
  },
];

export default function RiskResults() {
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  const riskScore = 35;

  const getRiskColor = (score: number) => {
    if (score <= 30) return { bg: "bg-green-500", text: "text-green-600", label: "Low Risk", lightBg: "bg-green-50 dark:bg-green-950" };
    if (score <= 60) return { bg: "bg-amber-500", text: "text-amber-600", label: "Moderate Risk", lightBg: "bg-amber-50 dark:bg-amber-950" };
    return { bg: "bg-red-500", text: "text-red-600", label: "High Risk", lightBg: "bg-red-50 dark:bg-red-950" };
  };

  const risk = getRiskColor(riskScore);

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl text-foreground mb-2">
              AI Risk Analysis Results
            </h1>
            <p className="text-muted-foreground">
              Assessment completed on February 26, 2026
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-muted-foreground hover:bg-muted transition-colors">
              <Download className="w-4 h-4" /> PDF Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
              <Share2 className="w-4 h-4" /> Share with Doctor
            </button>
          </div>
        </motion.div>

        {/* Risk Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-8 mb-6"
        >
          <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-center">
            <div className="text-center">
              <div className="relative w-44 h-44 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${riskScore * 2.64} 264`}
                    className={risk.text}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl text-foreground">{riskScore}</span>
                  <span className="text-muted-foreground text-sm">/100</span>
                </div>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl mt-4 ${risk.lightBg}`}>
                <div className={`w-2.5 h-2.5 rounded-full ${risk.bg}`} />
                <span className={risk.text}>{risk.label}</span>
              </div>
            </div>
            <div>
              <h3 className="text-foreground mb-3">Risk Score Interpretation</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-green-500 via-amber-500 to-red-500" />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 - Low</span>
                  <span>30 - Moderate</span>
                  <span>60 - High</span>
                  <span>100</span>
                </div>
              </div>
              <div className="mt-4 bg-muted/50 rounded-xl p-4 border border-border">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground text-sm">
                      Your cognitive screening indicates a <strong>moderate</strong> risk level. 
                      Some areas show mild changes that may warrant clinical follow-up.
                    </p>
                    <p className="text-muted-foreground text-xs mt-2">
                      This score is based on cognitive tests and behavioral patterns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground">Cognitive Performance Trend</h3>
              <div className="flex items-center gap-1 text-amber-500 text-sm">
                <TrendingDown className="w-4 h-4" />
                <span>-10 pts</span>
              </div>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis domain={[50, 100]} stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    dot={{ fill: "var(--primary)", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border shadow-sm p-6"
          >
            <h3 className="text-foreground mb-4">Domain Breakdown</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={domainData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="domain" stroke="var(--muted-foreground)" fontSize={12} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="var(--primary)"
                    fill="var(--primary)"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Domain Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-6"
        >
          <h3 className="text-foreground mb-4">Detailed Domain Analysis</h3>
          <div className="space-y-3">
            {domainDetails.map((domain) => {
              const isExpanded = expandedDomain === domain.name;
              const riskInfo = getRiskColor(domain.risk === "low" ? 20 : domain.risk === "moderate" ? 45 : 75);
              return (
                <div
                  key={domain.name}
                  className="border border-border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedDomain(isExpanded ? null : domain.name)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-2.5 h-2.5 rounded-full ${riskInfo.bg}`} />
                      <span className="text-foreground">{domain.name}</span>
                      <span className="text-muted-foreground text-sm">{domain.score}/100</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm flex items-center gap-1 ${
                          domain.change < 0 ? "text-amber-500" : domain.change > 0 ? "text-green-500" : "text-muted-foreground"
                        }`}
                      >
                        {domain.change < 0 ? <TrendingDown className="w-3.5 h-3.5" /> : domain.change > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : null}
                        {domain.change !== 0 ? `${domain.change > 0 ? "+" : ""}${domain.change}` : "No change"}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </button>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="px-4 pb-4 border-t border-border pt-3"
                    >
                      <p className="text-muted-foreground text-sm">{domain.description}</p>
                      <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${riskInfo.bg}`}
                          style={{ width: `${domain.score}%` }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Explainable AI Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">Explainable AI Summary</h3>
          </div>
          <div className="bg-muted/50 rounded-xl p-5 border border-border space-y-3">
            <p className="text-foreground text-sm">
              <strong>Key Factors Contributing to Risk Score:</strong>
            </p>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <Brain className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Delayed recall</strong> showed 2 fewer words recalled compared to baseline, suggesting mild episodic memory changes.</span>
              </li>
              <li className="flex items-start gap-2">
                <Brain className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Clock drawing</strong> showed minor asymmetry in number placement and hand positioning, indicating mild visuospatial changes.</span>
              </li>
              <li className="flex items-start gap-2">
                <Brain className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Pattern recognition</strong> showed slight hesitation on complex sequences, suggesting mild processing speed changes.</span>
              </li>
              <li className="flex items-start gap-2">
                <Brain className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Reaction time</strong> increased by 15% compared to previous assessment, possibly age-related.</span>
              </li>
              <li className="flex items-start gap-2">
                <Brain className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Protective factors:</strong> Strong language fluency and preserved visuospatial abilities.</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <button className="flex flex-col items-center gap-2 p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
            <Download className="w-6 h-6 text-primary" />
            <span className="text-foreground text-sm">Download PDF Report</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
            <Share2 className="w-6 h-6 text-primary" />
            <span className="text-foreground text-sm">Share with Doctor</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
            <Calendar className="w-6 h-6 text-primary" />
            <span className="text-foreground text-sm">Schedule Reassessment</span>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 bg-muted/50 rounded-xl p-4 border border-border">
          <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-muted-foreground text-xs">
            <strong>Disclaimer:</strong> This is a screening tool, not a medical diagnosis. The risk score is generated by AI models 
            and should be interpreted by a qualified healthcare professional. This tool does not replace clinical evaluation, 
            neuropsychological testing, or neuroimaging. Please consult your physician for a comprehensive assessment.
          </p>
        </div>
      </div>
    </div>
  );
}