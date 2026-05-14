import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = ({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    styles.btn,
    styles[variant],
    styles[size],
    className
  ].join(" ");

  return (
    <button 
      className={buttonClasses} 
      disabled={disabled}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
