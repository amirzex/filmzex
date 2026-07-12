import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiInfo } from "react-icons/fi";

/**
 * Lightweight toast — no third-party dependency.
 */
export default function Toast({ open, message, onClose, duration = 4500 }) {
  useEffect(() => {
    if (!open) return undefined;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 z-[100] w-[min(92vw,420px)] -translate-x-1/2"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-gray-900/95 px-4 py-3.5 shadow-2xl shadow-black/50 backdrop-blur-md">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
              <FiInfo className="h-4 w-4" />
            </div>
            <p className="flex-1 pt-1 text-sm leading-relaxed text-gray-200">
              {message}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Dismiss"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
