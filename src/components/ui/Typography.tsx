import React from "react";
import styles from "./Typography.module.css";

type TypographyVariant = 
  | "h1" | "h2" | "h3" | "h4" 
  | "subtitle1" | "subtitle2" | "subtitle4"
  | "body1" | "body2" | "body3"
  | "label" | "caption12" | "caption10" | "overline"
  | "tableHeader" | "tableBody";

interface TypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

const Typography = ({ 
  variant, 
  children, 
  className = "", 
  style,
  as: Component = "span" 
}: TypographyProps) => {
  const typographyClasses = [
    styles[variant],
    className
  ].join(" ");

  return (
    <Component className={typographyClasses} style={style}>
      {children}
    </Component>
  );
};

export default Typography;
