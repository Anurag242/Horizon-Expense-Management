import React from "react";
import styles from "./Checkbox.module.css";
import { Check } from "lucide-react";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

const Checkbox = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  error = false,
  className = ""
}: CheckboxProps) => {
  const containerClasses = [
    styles.container,
    checked ? styles.checked : "",
    disabled ? styles.disabled : "",
    error ? styles.error : "",
    className
  ].join(" ");

  return (
    <label className={containerClasses}>
      <input 
        type="checkbox" 
        className={styles.hiddenInput}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <div className={styles.checkboxBase}>
        {checked && <Check size={14} strokeWidth={4} className={styles.checkIcon} />}
      </div>
      {label && <span className={styles.labelText}>{label}</span>}
    </label>
  );
};

export default Checkbox;
