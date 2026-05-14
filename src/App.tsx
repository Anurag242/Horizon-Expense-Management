import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Claims from "./pages/Claims";
import VendorPayment from "./pages/VendorPayment";
import AddInvoice from "./pages/AddInvoice";
import DesignSystem from "./pages/DesignSystem";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/vendor" element={<VendorPayment />} />
        <Route path="/vendor/add" element={<AddInvoice />} />
        <Route path="/design-system" element={<DesignSystem />} />
        
        {/* Placeholder Routes */}
        <Route path="/users" element={<ComingSoon title="Users Management" />} />
        <Route path="/policy" element={<ComingSoon title="Policy Management" />} />
        <Route path="/cards" element={<ComingSoon title="Cards Management" />} />
        <Route path="/department" element={<ComingSoon title="Department Master" />} />
        <Route path="/entity" element={<ComingSoon title="Entity Master" />} />
        <Route path="/spend" element={<ComingSoon title="Spend Categories" />} />
        <Route path="/role" element={<ComingSoon title="Role Management" />} />
        <Route path="/bulk" element={<ComingSoon title="Bulk Upload" />} />
        <Route path="/vendor-master" element={<ComingSoon title="Vendor Master" />} />
        <Route path="/settings" element={<ComingSoon title="Settings" />} />
      </Routes>
    </BrowserRouter>
  );
}
