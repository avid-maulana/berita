import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-xl bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-700",
        className
      )}
    >
      {children}
    </button>
  );
}