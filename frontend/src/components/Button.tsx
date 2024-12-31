import React from "react";
import clsx from "clsx";

interface InputProps {
  children: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  onClick,
  className,
  style,
  onKeyDown,
}: InputProps) => {
  const buttonClass = clsx(
    "px-4 py-2 w-full rounded-lg transition:translate font-arcadeclassic",
    className
  );

  return (
    <button
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={buttonClass}
      style={style}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
