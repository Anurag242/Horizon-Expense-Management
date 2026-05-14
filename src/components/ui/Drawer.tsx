import React from "react";
import styles from "./Drawer.module.css";
import { X } from "lucide-react";
import Typography from "./Typography";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  return (
    <div 
      className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`} 
      onClick={onClose}
    >
      <div 
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

/* Sub-Components */

const DrawerHeader = ({ title, onClose }: { title: string; onClose: () => void }) => (
  <div className={styles.header}>
    <Typography variant="h3" as="h3">{title}</Typography>
    <button 
      onClick={onClose} 
      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-black)' }}
    >
      <X size={24} />
    </button>
  </div>
);

const DrawerBody = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.body}>{children}</div>
);

const DrawerFooter = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.footer}>{children}</div>
);

/* Attaching sub-components to the main Drawer */
Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;

export default Drawer;
