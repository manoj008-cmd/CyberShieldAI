import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LiveTraffic from "./pages/LiveTraffic";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Incidents from "./pages/Incidents";
import ProtectedRoute from "./components/ProtectedRoute";
import UserManagement from "./pages/UserManagement";
import AttackDetails from "./pages/AttackDetails";
import Alerts from "./pages/Alerts";
import AdminRoute from "./components/AdminRoute";
import Architecture from "./pages/Architecture";
import ActivityLogs from "./pages/ActivityLogs";
function App() {
  return (
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/activity-logs"
      element={
        <ProtectedRoute>
          <ActivityLogs />
        </ProtectedRoute>
      }
    />
    <Route
      path="/alerts"
      element={
        <ProtectedRoute>
          <Alerts />
        </ProtectedRoute>
      }
    />
    <Route
      path="/users"
      element={
        <AdminRoute>
          <UserManagement />
        </AdminRoute>
      }
    />
    <Route
      path="/architecture"
      element={
        <ProtectedRoute>
          <Architecture />
        </ProtectedRoute>
      }
    />
    <Route
      path="/live"
      element={
        <ProtectedRoute>
          <LiveTraffic />
        </ProtectedRoute>
      }
    />
    <Route
      path="/attack/:attackId"
      element={
        <ProtectedRoute>
          <AttackDetails />
        </ProtectedRoute>
      }
    />
    <Route
      path="/analytics"
      element={
        <ProtectedRoute>
          <Analytics />
        </ProtectedRoute>
      }
    />
    <Route
      path="/reports"
      element={
        <ProtectedRoute>
          <Reports />
        </ProtectedRoute>
      }
    />
    <Route
      path="/incidents"
      element={
        <ProtectedRoute>
          <Incidents />
        </ProtectedRoute>
      }
    />
    <Route
      path="/settings"
      element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      }
    />
  </Routes>
</BrowserRouter>
  )}
export default App;