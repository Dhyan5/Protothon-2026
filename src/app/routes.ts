import { createBrowserRouter } from "react-router";
import RootLayout from "./components/RootLayout";
import LandingPage from "./components/LandingPage";
import Registration from "./components/Registration";
import CognitiveAssessment from "./components/CognitiveAssessment";
import RiskResults from "./components/RiskResults";
import ClinicianDashboard from "./components/ClinicianDashboard";
import AdminPanel from "./components/AdminPanel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "register", Component: Registration },
      { path: "assessment", Component: CognitiveAssessment },
      { path: "results", Component: RiskResults },
      { path: "clinician", Component: ClinicianDashboard },
      { path: "admin", Component: AdminPanel },
    ],
  },
]);