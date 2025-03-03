import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from './components/DashboardLayout';
import Calendar from './components/Calendar/Calendar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard"  />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
