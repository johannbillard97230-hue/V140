"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";

export function SocialProof() {
  const [isVisible, setIsVisible] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);

  // Generate a realistic viewer count
  const generateCount = useCallback(() => {
    // Random between 3 and 12 for realism
    return Math.floor(Math.random() * 10) + 3;
  }, []);

  useEffect(() => {
    // Show after 3 seconds on page load
    const initialTimer = setTimeout(() => {
      setViewerCount(generateCount());
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(initialTimer);
  }, [generateCount]);

  useEffect(() => {
    if (!isVisible) return;

    // Hide after 10 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(hideTimer);
  }, [isVisible]);

  useEffect(() => {
    // Reappear every 2-3 minutes with new count
    const interval = setInterval(() => {
      const delay = Math.floor(Math.random() * 60000) + 120000; // 2-3 min
      const timer = setTimeout(() => {
        setViewerCount(generateCount());
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }, 180000);

    return () => clearInterval(interval);
  }, [generateCount]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 left-4 z-[65] max-w-[280px]"
        >
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-3 flex items-center gap-3">
            {/* Green pulse dot */}
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 leading-tight">
                <span className="text-green-600 font-bold">{viewerCount}</span> personnes consultent cette page en ce moment
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
