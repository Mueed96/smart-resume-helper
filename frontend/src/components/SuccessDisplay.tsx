import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SuccessDisplayProps {
  onStartAnalysis: () => void;
}

export function SuccessDisplay({ onStartAnalysis }: SuccessDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-6 text-center"
    >
      <CheckCircle2 className="h-20 w-20 text-emerald-500 mb-6" /> {/* Large green check icon */}
      <h2 className="text-2xl font-bold text-text-heading mb-4">
        Resume uploaded successfully!
      </h2>
      <button
        onClick={onStartAnalysis}
        className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-hover transition-transform duration-200 hover:scale-105"
      >
        Start Analysis
      </button>
    </motion.div>
  );
}