import React from "react";
import clsx from "clsx";

interface InputProps {
  children: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const Button = ({ children, onClick, className, style }: InputProps) => {
  const buttonClass = clsx(
    "px-4 py-2 w-full rounded-lg transition:translate font-pencil",
    className
  );

  return (
    <button onClick={onClick} className={buttonClass} style={style} type="button">
      {children}
    </button>
  );
};

export default Button;