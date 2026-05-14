import styles from "./RadioButton.module.css";

interface RadioButtonProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  name?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

const RadioButton = ({
  checked = false,
  onChange,
  label,
  name,
  disabled = false,
  error = false,
  className = ""
}: RadioButtonProps) => {
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
        type="radio" 
        name={name}
        className={styles.hiddenInput}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <div className={styles.radioBase}>
        <div className={styles.dot} />
      </div>
      {label && <span className={styles.labelText}>{label}</span>}
    </label>
  );
};

export default RadioButton;
