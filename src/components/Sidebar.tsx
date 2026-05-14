import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import logoImg from "../assets/logo.png";
import { 
  LayoutDashboard, 
  Wallet, 
  CreditCard, 
  Users, 
  FileText, 
  CreditCard as CardsIcon,
  Building2,
  Building,
  Tags,
  ShieldCheck,
  Upload,
  UserSquare2,
  Settings,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const overviewItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
  ];

  const paymentItems = [
    { id: 'claims', label: 'Claims & Advance', icon: <Wallet size={18} />, path: '/claims' },
    { id: 'vendor', label: 'Vendor Payment', icon: <CreditCard size={18} />, path: '/vendor' },
  ];

  const managementItems = [
    { id: 'users', label: 'Users', icon: <Users size={18} />, path: '/users' },
    { id: 'policy', label: 'Policy', icon: <FileText size={18} />, path: '/policy' },
    { id: 'cards', label: 'Cards', icon: <CardsIcon size={18} />, path: '/cards' },
  ];

  const masterItems = [
    { id: 'department', label: 'Department', icon: <Building2 size={18} />, path: '/department' },
    { id: 'entity', label: 'Entity', icon: <Building size={18} />, path: '/entity' },
    { id: 'spend', label: 'Spend Categories', icon: <Tags size={18} />, path: '/spend' },
    { id: 'role', label: 'Role Management', icon: <ShieldCheck size={18} />, path: '/role' },
    { id: 'bulk', label: 'Bulk Upload', icon: <Upload size={18} />, path: '/bulk' },
    { id: 'vendor-master', label: 'Vendor', icon: <UserSquare2 size={18} />, path: '/vendor-master' },
  ];

  const renderMenuItem = (item: any) => {
    const isActive = location.pathname === item.path;
    return (
      <div 
        key={item.id}
        className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
        onClick={() => navigate(item.path)}
      >
        {item.icon}
        <span>{item.label}</span>
      </div>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <img src={logoImg} alt="Anchor Point" className={styles.logoImage} />
          <span className={styles.logoText}>Anchor Point</span>
        </div>
      </div>

      <div className={styles.menuContainer}>
        <div className={styles.menuSection}>
          <div className={styles.sectionTitle}>Overview</div>
          {overviewItems.map(renderMenuItem)}
        </div>

        <div className={styles.menuSection}>
          <div className={styles.sectionTitle}>Payments</div>
          {paymentItems.map(renderMenuItem)}
        </div>

        <div className={styles.menuSection}>
          <div className={styles.sectionTitle}>Management</div>
          {managementItems.map(renderMenuItem)}
        </div>

        <div className={styles.menuSection}>
          <div className={styles.sectionTitle}>Master</div>
          {masterItems.map(renderMenuItem)}
        </div>

        <div className={styles.menuSection}>
          <div className={styles.sectionTitle}>Preferences</div>
          <div className={styles.menuItem} onClick={() => navigate("/settings")}>
            <Settings size={18} />
            <span>Settings</span>
          </div>
          <div className={`${styles.menuItem} ${styles.logout}`} onClick={() => navigate("/login")}>
            <LogOut size={18} />
            <span>Logout</span>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        Powered by <span className={styles.horizonText}>Horizon</span>
      </div>
    </aside>
  );
}
