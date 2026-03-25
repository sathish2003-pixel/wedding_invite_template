"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "dark" | "light";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, variant = "dark", className = "", ...props }, ref) {
    const isDark = variant === "dark";

    return (
      <div className="w-full">
        {label && (
          <label
            className={`block font-sans text-[13px] uppercase tracking-wider mb-1 ${
              isDark ? "text-white/65" : "text-gray-600"
            }`}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full rounded-xl px-4 py-3 min-h-[48px] font-sans text-[15px]
            transition-all duration-200 outline-none
            ${
              isDark
                ? "bg-white/[0.07] border border-white/[0.14] text-white placeholder:text-white/35 focus:border-[#B76E79] focus:shadow-[0_0_0_3px_rgba(183,110,121,0.2)]"
                : "bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#B76E79] focus:shadow-[0_0_0_3px_rgba(183,110,121,0.15)]"
            }
            ${error ? "border-red-400" : ""}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 font-sans text-[13px] text-red-400">{error}</p>
        )}
      </div>
    );
  }
);
