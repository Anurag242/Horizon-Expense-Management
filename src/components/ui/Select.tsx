import React from "react";
import styles from "./Input.module.css";
import { ChevronDown, ChevronsUpDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  variant?: "single" | "double"; // double for the Dropdown 2 style with up/down arrows
  error?: string;
}

const Select = ({
  label,
  variant = "single",
  error,
  children,
  className = "",
  ...props
}: SelectProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper} style={{ position: 'relative' }}>
        <select 
          className={styles.inputField} 
          style={{ appearance: 'none', paddingRight: '40px' }} 
          {...props}
        >
          {children}
        </select>
        <div 
          className={styles.icon} 
          style={{ position: 'absolute', right: 0, top: 0, bottom: 0, pointerEvents: 'none' }}
        >
          {variant === "single" ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronsUpDown size={16} />
          )}
        </div>
      </div>
      {error && <span style={{ color: 'var(--color-error)', fontSize: '12px' }}>{error}</span>}
    </div>
  );
};

export default Select;
