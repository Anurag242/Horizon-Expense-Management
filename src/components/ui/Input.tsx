import React from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  error?: string;
}

export const Input = ({
  label,
  leftAddon,
  rightAddon,
  error,
  className = "",
  ...props
}: InputProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {leftAddon && <div className={styles.addon}>{leftAddon}</div>}
        <input className={styles.inputField} {...props} />
        {rightAddon && <div className={`${styles.addon} ${styles.addonRight}`}>{rightAddon}</div>}
      </div>
      {error && <span style={{ color: 'var(--color-error)', fontSize: '12px' }}>{error}</span>}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = ({
  label,
  error,
  className = "",
  ...props
}: TextAreaProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        <textarea className={`${styles.inputField} styles.textarea`} {...props} />
      </div>
      {error && <span style={{ color: 'var(--color-error)', fontSize: '12px' }}>{error}</span>}
    </div>
  );
};
