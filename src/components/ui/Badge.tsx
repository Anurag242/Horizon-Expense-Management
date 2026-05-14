import React from "react";
import styles from "./Badge.module.css";

type BadgeVariant = 
  | "approved" 
  | "pending" 
  | "rejected" 
  | "hold" 
  | "request" 
  | "error" 
  | "success";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const Badge = ({
  variant,
  children,
  className = ""
}: BadgeProps) => {
  const badgeClasses = [
    styles.badge,
    styles[variant],
    className
  ].join(" ");

  return (
    <div className={badgeClasses}>
      {children}
    </div>
  );
};

export default Badge;
