import {
  User,
  Calendar,
  Heart,
  Users,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Eye,
  Shield,
  Accessibility,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

const steps = ["Personal Info", "Medical History", "Consent & Preferences"];

export default function Registration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [largeTextMode, setLargeTextMode] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    medicalHistory: [] as string[],
    familyHistory: "",
    medications: "",
    dataConsent: false,
    emergencyName: "",
    emergencyPhone: "",
  });

  const textClass = largeTextMode ? "text-lg" : "";

  const updateForm = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMedicalHistory = (condition: string) => {
    setForm((prev) => ({
      ...prev,
      medicalHistory: prev.medicalHistory.includes(condition)
        ? prev.medicalHistory.filter((c) => c !== condition)
        : [...prev.medicalHistory, condition],
    }));
  };

  const medicalConditions = [
    "Hypertension",
    "Diabetes",
    "Heart Disease",
    "Stroke",
    "Depression",
    "Anxiety",
    "Sleep Disorders",
    "Head Injury",
    "Thyroid Disorder",
    "None of the above",
  ];

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl text-foreground mb-2">
            Create Your Profile
          </h1>
          <p className="text-muted-foreground">
            Let's set up your account for a personalized cognitive assessment.
          </p>
        </motion.div>

        {/* Accessibility Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setLargeTextMode(!largeTextMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border transition-colors ${
              largeTextMode ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            <Accessibility className="w-4 h-4" />
            <span className="text-sm">Large Text</span>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    i <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-sm">{i + 1}</span>
                  )}
                </div>
                <span
                  className={`hidden sm:block text-sm ${
                    i <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-3 rounded-full transition-colors ${
                    i < currentStep ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-8"
        >
          {/* Step 1: Personal Info */}
          {currentStep === 0 && (
            <div className={`space-y-5 ${textClass}`}>
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-foreground">Personal Information</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-foreground text-sm">First Name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => updateForm("firstName", e.target.value)}
                    className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-foreground text-sm">Last Name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => updateForm("lastName", e.target.value)}
                    className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1.5 text-foreground text-sm">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-foreground text-sm">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Age
                  </label>
                  <input
                    type="number"
                    value={form.age}
                    onChange={(e) => updateForm("age", e.target.value)}
                    className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="65"
                    min="18"
                    max="120"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-foreground text-sm">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => updateForm("gender", e.target.value)}
                    className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Medical History */}
          {currentStep === 1 && (
            <div className={`space-y-5 ${textClass}`}>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-primary" />
                <h2 className="text-foreground">Medical History</h2>
              </div>
              <div>
                <label className="block mb-2 text-foreground text-sm">
                  Existing Conditions (select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {medicalConditions.map((condition) => (
                    <button
                      key={condition}
                      onClick={() => toggleMedicalHistory(condition)}
                      className={`px-3 py-2.5 rounded-xl border text-left text-sm transition-all ${
                        form.medicalHistory.includes(condition)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-1.5 text-foreground text-sm">
                  <Users className="w-4 h-4 inline mr-1" />
                  Family History of Dementia
                </label>
                <select
                  value={form.familyHistory}
                  onChange={(e) => updateForm("familyHistory", e.target.value)}
                  className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                >
                  <option value="">Select</option>
                  <option value="none">No known family history</option>
                  <option value="parent">Parent(s) diagnosed</option>
                  <option value="grandparent">Grandparent(s) diagnosed</option>
                  <option value="sibling">Sibling(s) diagnosed</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
              <div>
                <label className="block mb-1.5 text-foreground text-sm">
                  Current Medications
                </label>
                <textarea
                  value={form.medications}
                  onChange={(e) => updateForm("medications", e.target.value)}
                  className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  rows={3}
                  placeholder="List current medications (optional)"
                />
              </div>
            </div>
          )}

          {/* Step 3: Consent & Preferences */}
          {currentStep === 2 && (
            <div className={`space-y-5 ${textClass}`}>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="text-foreground">Consent & Preferences</h2>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 border border-border">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground text-sm mb-2">Data Processing Consent</p>
                    <p className="text-muted-foreground text-sm mb-3">
                      Your assessment data will be processed by our AI models to generate risk scores. 
                      All data is anonymized and stored securely.
                    </p>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.dataConsent}
                        onChange={(e) => updateForm("dataConsent", e.target.checked)}
                        className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-foreground text-sm">I consent to data processing</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-foreground text-sm mb-3">
                  <Users className="w-4 h-4 inline mr-1" />
                  Emergency Contact (Optional)
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={form.emergencyName}
                    onChange={(e) => updateForm("emergencyName", e.target.value)}
                    className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Contact name"
                  />
                  <input
                    type="tel"
                    value={form.emergencyPhone}
                    onChange={(e) => updateForm("emergencyPhone", e.target.value)}
                    className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors ${
                currentStep === 0
                  ? "invisible"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={() => {
                if (currentStep < steps.length - 1) {
                  setCurrentStep(currentStep + 1);
                } else {
                  navigate("/assessment");
                }
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all"
            >
              {currentStep === steps.length - 1 ? "Start Assessment" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}