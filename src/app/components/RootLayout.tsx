import { useState, createContext, useContext } from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  Brain,
  Moon,
  Sun,
  Menu,
  X,
  Shield,
  Home,
  UserPlus,
  ClipboardList,
  BarChart3,
  Stethoscope,
  Settings,
} from "lucide-react";

type DarkModeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/register", label: "Register", icon: UserPlus },
  { to: "/assessment", label: "Assessment", icon: ClipboardList },
  { to: "/results", label: "Results", icon: BarChart3 },
  { to: "/clinician", label: "Clinician", icon: Stethoscope },
  { to: "/admin", label: "Admin", icon: Settings },
];

export default function RootLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-primary hidden sm:inline">BrainPath<span className="text-muted-foreground">.ai</span></span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Toggle dark mode"
                  >
                    {darkMode ? (
                      <Sun className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Moon className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Toggle menu"
                  >
                    {mobileMenuOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
              <div className="lg:hidden border-t border-border bg-card">
                <nav className="px-4 py-3 space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.to;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            )}
          </header>

          {/* Main Content */}
          <main>
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="bg-card border-t border-border mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                      <Brain className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-primary">
                      NeuroDetect<span className="text-muted-foreground">.ai</span>
                    </span>
                  </div>
                  <p className="text-muted-foreground max-w-sm mb-4">
                    AI-powered cognitive screening platform designed to support
                    early detection of dementia through non-invasive assessments.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                      <span className="text-muted-foreground text-xs">HIPAA Compliant</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                      <span className="text-muted-foreground text-xs">GDPR Ready</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 text-foreground">Platform</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><Link to="/assessment" className="hover:text-primary transition-colors">Assessments</Link></li>
                    <li><Link to="/clinician" className="hover:text-primary transition-colors">For Clinicians</Link></li>
                    <li><Link to="/admin" className="hover:text-primary transition-colors">Research</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 text-foreground">Legal</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Data Security</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-border mt-8 pt-8">
                <p className="text-muted-foreground text-center text-xs">
                  <strong>Medical Disclaimer:</strong> NeuroDetect.ai is a cognitive screening tool and does not provide medical diagnoses.
                  Results should be reviewed by a qualified healthcare professional. This tool is not intended to replace professional medical
                  advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
                </p>
                <p className="text-muted-foreground text-center text-xs mt-3">
                  &copy; 2026 NeuroDetect.ai. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </DarkModeContext.Provider>
  );
}