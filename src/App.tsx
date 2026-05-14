import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Claims from "./pages/Claims";
import VendorPayment from "./pages/VendorPayment";
import AddInvoice from "./pages/AddInvoice";

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
      </Routes>
    </BrowserRouter>
  );
}
