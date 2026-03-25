"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BuilderLayout } from "@/components/builder/BuilderLayout";
import { useBuilderStore } from "@/store/useBuilderStore";
import { TemplateNumber } from "@/types/wedding";

function BuilderContent() {
  const searchParams = useSearchParams();
  const setTemplate = useBuilderStore((s) => s.setTemplate);

  useEffect(() => {
    const template = searchParams.get("template");
    if (template) {
      const num = parseInt(template);
      if (num >= 1 && num <= 6) {
        setTemplate(num as TemplateNumber);
      }
    }
  }, [searchParams, setTemplate]);

  return <BuilderLayout />;
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#111]" />}>
      <BuilderContent />
    </Suspense>
  );
}
