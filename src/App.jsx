import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from './components/DashboardLayout';
import Calendar from './components/Calendar/Calendar';
import Inventory from './components/InventoryRequest';
import NewMarkets from './components/onboarding/NewMarkets';
import DemandForecast from './components/onboarding/DemandForecast';
import UploadDocuments from "./components/onboarding/UploadDocuments";
import VerifyOtp from "./components/auth/VerifyOtp";
import AuthenticateLayout from "./components/AuthenticateLayout";
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/verify-otp" />} />
        
        {/* Authentication routes */}
        <Route path="/auth" element={<AuthenticateLayout />}>
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="calendar" element={<Calendar />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="markets" element={<NewMarkets />} />
          <Route path="forecast" element={<DemandForecast />} />
          <Route path="documents" element={<UploadDocuments />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
