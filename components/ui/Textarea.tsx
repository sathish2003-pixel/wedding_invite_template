"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant?: "dark" | "light";
  maxChars?: number;
  currentLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, error, variant = "dark", maxChars, currentLength, className = "", ...props },
    ref
  ) {
    const isDark = variant === "dark";

    return (
      <div className="w-full">
        {label && (
          <div className="flex items-center justify-between mb-1">
            <label
              className={`block font-sans text-[13px] uppercase tracking-wider ${
                isDark ? "text-white/65" : "text-gray-600"
              }`}
            >
              {label}
            </label>
            {maxChars !== undefined && currentLength !== undefined && (
              <span
                className={`font-sans text-[12px] ${
                  currentLength > maxChars ? "text-red-400" : isDark ? "text-white/40" : "text-gray-400"
                }`}
              >
                {currentLength}/{maxChars}
              </span>
            )}
          </div>
        )}
        <textarea
          ref={ref}
          className={`
            w-full rounded-xl px-4 py-3 font-sans text-[15px] resize-none
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
