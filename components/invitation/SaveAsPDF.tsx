"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SaveAsPDFProps {
  brideName: string;
  groomName: string;
}

export function SaveAsPDF({ brideName, groomName }: SaveAsPDFProps) {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(true);

  const generatePDF = useCallback(async () => {
    setGenerating(true);
    setProgress(10);

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      setProgress(20);

      // Get all major sections
      const sections = document.querySelectorAll("section");
      if (sections.length === 0) {
        setGenerating(false);
        return;
      }

      // A4 dimensions in mm
      const pageWidth = 210;
      const pageHeight = 297;
      const pdf = new jsPDF("p", "mm", "a4");
      let firstPage = true;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        setProgress(20 + Math.floor((i / sections.length) * 70));

        const canvas = await html2canvas(section, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          logging: false,
          windowWidth: 414, // Mobile width for best look
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * pageWidth) / canvas.width;

        // Split into pages if section is taller than one page
        let yOffset = 0;
        while (yOffset < imgHeight) {
          if (!firstPage) {
            pdf.addPage();
          }
          firstPage = false;

          pdf.addImage(
            imgData,
            "JPEG",
            0,
            -yOffset,
            imgWidth,
            imgHeight
          );

          yOffset += pageHeight;
        }
      }

      setProgress(95);

      const fileName = `${groomName}-weds-${brideName}-invitation.pdf`
        .toLowerCase()
        .replace(/[^a-z0-9.-]/g, "-");

      pdf.save(fileName);
      setProgress(100);

      setTimeout(() => {
        setGenerating(false);
        setProgress(0);
      }, 1500);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setGenerating(false);
      setProgress(0);
    }
  }, [brideName, groomName]);

  return (
    <>
      {/* Floating download button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 md:bottom-20 left-4 z-30"
          >
            <button
              onClick={generating ? undefined : generatePDF}
              disabled={generating}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-gray-800 font-sans text-[13px] font-medium px-4 py-2.5 rounded-full shadow-lg hover:bg-white transition-all disabled:opacity-70"
            >
              {generating ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin" />
                  <span>{progress}%</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Save PDF
                </>
              )}
            </button>

            {/* Close/hide button */}
            <button
              onClick={() => setShowButton(false)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-500 text-white text-[10px] flex items-center justify-center hover:bg-gray-600"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress overlay */}
      <AnimatePresence>
        {generating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-xs w-full mx-4 text-center shadow-2xl">
              <div className="w-12 h-12 mx-auto mb-4 relative">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#f3f3f3" strokeWidth="4" />
                  <circle
                    cx="24" cy="24" r="20" fill="none" stroke="#B76E79" strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-sans text-[11px] font-bold text-[#B76E79]">
                  {progress}%
                </span>
              </div>
              <p className="font-serif text-[18px] text-gray-800">
                {progress < 90 ? "Generating your PDF..." : "Almost done!"}
              </p>
              <p className="font-sans text-[13px] text-gray-400 mt-1">
                Creating a beautiful keepsake
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
