import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from './components/DashboardLayout';
import Calendar from './components/Calendar/Calendar';
import Inventory from './components/InventoryRequest';
import NewMarkets from './components/onboarding/NewMarkets';
import DemandForecast from './components/onboarding/DemandForecast';
import UploadDocuments from "./components/onboarding/UploadDocuments";
import ForgotPassword from './components/auth/ForgotPassword';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ForgotPassword />} />
        {/* <Route path="/" element={<Navigate to="/dashboard"  />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="calendar" element={<Calendar />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="markets" element={<NewMarkets />} />
          <Route path="forecast" element={<DemandForecast />} />
          <Route path="documents" element={<UploadDocuments />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
