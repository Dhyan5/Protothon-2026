import { Link } from "react-router";
import {
  Brain,
  BarChart3,
  ClipboardList,
  Shield,
  ArrowRight,
  Star,
  CheckCircle,
  Activity,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const steps = [
  {
    icon: ClipboardList,
    title: "Cognitive Test",
    description:
      "Complete interactive memory, pattern recognition, and language assessments designed by neurologists.",
    color: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400",
  },
  {
    icon: BarChart3,
    title: "AI Risk Evaluation",
    description:
      "Machine learning models generate a comprehensive risk score with explainable AI insights.",
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
];

const testimonials = [
  {
    name: "Margaret C.",
    role: "Patient, Age 68",
    quote:
      "The assessment was calm and easy to follow. My doctor received the results immediately and we could discuss next steps together.",
    avatar: "https://images.unsplash.com/photo-1758686254593-7c5cd55b2621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    stars: 5,
  },
  {
    name: "Dr. James Whitfield",
    role: "Neurologist, Mayo Clinic",
    quote:
      "NeuroDetect provides a validated screening layer that helps us prioritize patients who need deeper evaluation. The AI insights are remarkably accurate.",
    avatar: "https://images.unsplash.com/photo-1615177393114-bd2917a4f74a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    stars: 5,
  },
  {
    name: "Sandra M.",
    role: "Caregiver",
    quote:
      "As a caregiver for my mother, this tool gave us peace of mind and helped us catch early signs that we would have otherwise missed.",
    avatar: "https://images.unsplash.com/photo-1765896387398-1e1ae8d2eb85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    stars: 5,
  },
];

const stats = [
  { value: "94.7%", label: "Model Accuracy" },
  { value: "50K+", label: "Screenings Completed" },
  { value: "200+", label: "Partner Clinics" },
  { value: "<15min", label: "Average Assessment" },
];

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary text-sm">FDA Breakthrough Device Designation</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6 !leading-tight">
                AI-Powered Early{" "}
                <span className="text-primary">Dementia Detection</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl leading-relaxed">
                Non-invasive cognitive screening powered by advanced machine
                learning. Detect early signs of cognitive decline through
                interactive assessments and AI-driven risk
                evaluation.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Start Assessment
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/clinician"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-xl hover:bg-muted transition-all"
                >
                  For Clinicians
                </Link>
              </div>
              
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1630155923002-17db0f219f1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                  alt="AI Brain Neural Network"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-xl p-4 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-foreground">94.7% Accuracy</p>
                    <p className="text-muted-foreground text-sm">Model Performance</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A simple, two-step process designed to be comfortable and
              accessible for users of all ages.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <span>{i + 1}</span>
                    </div>
                    <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700"
                alt="Doctor consultation"
                className="rounded-2xl w-full h-[350px] object-cover shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl text-foreground mb-4">
                Designed for Clinical Confidence
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our platform integrates seamlessly with clinical workflows,
                providing neurologists with actionable insights backed by
                explainable AI.
              </p>
              <ul className="space-y-3">
                {[
                  "Multi-domain cognitive assessment battery",
                  "Longitudinal tracking with trend analytics",
                  "Exportable PDF reports for clinical records",
                  "HIPAA-compliant data handling",
                  "Explainable AI-powered risk scoring",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary to-cyan-600 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
            <div className="relative z-10">
              <Brain className="w-12 h-12 text-white/80 mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl text-white mb-4">
                Start Your Cognitive Screening Today
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Early detection matters. Take a 15-minute assessment from the
                comfort of your home.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary rounded-xl hover:bg-white/90 transition-all shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}