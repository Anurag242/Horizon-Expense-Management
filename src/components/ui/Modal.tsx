import React from "react";
import styles from "./Modal.module.css";
import Typography from "./Typography";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  supportText?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "small" | "large";
}

const Modal = ({
  isOpen,
  onClose,
  title,
  supportText,
  children,
  footer,
  size = "small"
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={`${styles.modal} ${styles[size]}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          {title && (
            <Typography variant="h3" as="h3" className={styles.title}>
              {title}
            </Typography>
          )}
          {supportText && (
            <Typography variant="body2" className={styles.supportText}>
              {supportText}
            </Typography>
          )}
        </div>
        
        <div className={styles.body}>
          {children}
        </div>

        {footer && (
          <div className={`${styles.footer} ${size === "small" ? styles.centerFooter : ""}`}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
