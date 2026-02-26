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
} from "recharts";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Database,
  Cpu,
  RefreshCw,
  TrendingUp,
  Shield,
  Server,
  BarChart3,
  Zap,
} from "lucide-react";

const accuracyData = [
  { version: "v3.1", accuracy: 91.2, fp: 6.8 },
  { version: "v3.2", accuracy: 92.5, fp: 5.9 },
  { version: "v3.3", accuracy: 93.1, fp: 5.2 },
  { version: "v3.4", accuracy: 93.8, fp: 4.7 },
  { version: "v3.5", accuracy: 94.3, fp: 4.3 },
  { version: "v3.6", accuracy: 94.7, fp: 3.9 },
];

const datasetLogs = [
  { date: "Feb 26, 2026", action: "New dataset batch ingested", records: "2,450", status: "complete" },
  { date: "Feb 24, 2026", action: "Data validation pipeline run", records: "48,200", status: "complete" },
  { date: "Feb 22, 2026", action: "Anonymization pass completed", records: "48,200", status: "complete" },
  { date: "Feb 20, 2026", action: "Feature extraction updated", records: "45,750", status: "complete" },
  { date: "Feb 18, 2026", action: "New speech corpus added", records: "1,200", status: "complete" },
  { date: "Feb 15, 2026", action: "Dataset quality audit", records: "45,750", status: "warning" },
];

const modelMetrics = [
  { label: "Model Accuracy", value: "94.7%", icon: Activity, trend: "+0.4%", color: "text-green-500" },
  { label: "False Positive Rate", value: "3.9%", icon: AlertTriangle, trend: "-0.4%", color: "text-green-500" },
  { label: "Sensitivity (Recall)", value: "92.1%", icon: TrendingUp, trend: "+0.3%", color: "text-green-500" },
  { label: "Specificity", value: "96.2%", icon: Shield, trend: "+0.2%", color: "text-green-500" },
  { label: "AUC-ROC", value: "0.973", icon: BarChart3, trend: "+0.005", color: "text-green-500" },
  { label: "F1 Score", value: "0.934", icon: Zap, trend: "+0.003", color: "text-green-500" },
];

export default function AdminPanel() {
  const [retrainingStatus, setRetrainingStatus] = useState<"idle" | "running" | "complete">("idle");

  const startRetraining = () => {
    setRetrainingStatus("running");
    setTimeout(() => setRetrainingStatus("complete"), 4000);
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
            <h1 className="text-2xl sm:text-3xl text-foreground mb-2">AI Monitoring Panel</h1>
            <p className="text-muted-foreground">Model performance, dataset management, and system health</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-950 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-600 dark:text-green-400 text-sm">All Systems Operational</span>
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {modelMetrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl border border-border shadow-sm p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className={`text-xs flex items-center gap-1 ${metric.color}`}>
                    <TrendingUp className="w-3 h-3" />
                    {metric.trend}
                  </span>
                </div>
                <p className="text-2xl text-foreground">{metric.value}</p>
                <p className="text-muted-foreground text-sm mt-1">{metric.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Accuracy & FP Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border shadow-sm p-6"
          >
            <h3 className="text-foreground mb-4">Model Accuracy Over Versions</h3>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="version" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis domain={[88, 96]} stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    dot={{ fill: "var(--primary)", r: 4 }}
                    name="Accuracy %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl border border-border shadow-sm p-6"
          >
            <h3 className="text-foreground mb-4">False Positive Rate Trend</h3>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="version" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis domain={[2, 8]} stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="fp"
                    stroke="#ef4444"
                    strokeWidth={2.5}
                    dot={{ fill: "#ef4444", r: 4 }}
                    name="FP Rate %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Retraining Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              <h3 className="text-foreground">Model Retraining</h3>
            </div>
            <button
              onClick={startRetraining}
              disabled={retrainingStatus === "running"}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                retrainingStatus === "running"
                  ? "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${retrainingStatus === "running" ? "animate-spin" : ""}`} />
              {retrainingStatus === "running" ? "Training..." : "Start Retraining"}
            </button>
          </div>

          <div className="grid sm:grid-cols-4 gap-4">
            <div className="bg-muted/50 rounded-xl p-4 border border-border">
              <p className="text-muted-foreground text-xs mb-1">Current Version</p>
              <p className="text-foreground">v3.6.2</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 border border-border">
              <p className="text-muted-foreground text-xs mb-1">Training Dataset</p>
              <p className="text-foreground">48,200 records</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 border border-border">
              <p className="text-muted-foreground text-xs mb-1">Last Trained</p>
              <p className="text-foreground">Feb 19, 2026</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 border border-border">
              <p className="text-muted-foreground text-xs mb-1">Status</p>
              <div className="flex items-center gap-2">
                {retrainingStatus === "idle" && (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-green-600 dark:text-green-400">Ready</span>
                  </>
                )}
                {retrainingStatus === "running" && (
                  <>
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-amber-600 dark:text-amber-400">Training</span>
                  </>
                )}
                {retrainingStatus === "complete" && (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-green-600 dark:text-green-400">Complete</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {retrainingStatus === "running" && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Training progress</span>
                <span className="text-foreground">67%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: "10%" }}
                  animate={{ width: "67%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Dataset Update Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">Dataset Update Logs</h3>
          </div>
          <div className="space-y-3">
            {datasetLogs.map((log, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors"
              >
                <div className="flex-shrink-0">
                  {log.status === "complete" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm">{log.action}</p>
                  <p className="text-muted-foreground text-xs">{log.records} records</p>
                </div>
                <span className="text-muted-foreground text-xs whitespace-nowrap">{log.date}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {[
            { label: "API Gateway", status: "Healthy", uptime: "99.97%", icon: Server, color: "green" },
            { label: "ML Pipeline", status: "Healthy", uptime: "99.94%", icon: Cpu, color: "green" },
            { label: "Data Storage", status: "Healthy", uptime: "99.99%", icon: Database, color: "green" },
          ].map((sys, i) => {
            const Icon = sys.icon;
            return (
              <div key={i} className="bg-card rounded-2xl border border-border shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-green-600 dark:text-green-400 text-xs">{sys.status}</span>
                  </div>
                </div>
                <p className="text-foreground">{sys.label}</p>
                <p className="text-muted-foreground text-sm">Uptime: {sys.uptime}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}