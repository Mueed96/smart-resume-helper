import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
}

const steps = ['Select File', 'Uploading', 'Success', 'Analysis'];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Bar */}
        <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 transform -translate-y-1/2"></div>
        <motion.div
          className="absolute left-0 top-1/2 h-1 bg-primary transform -translate-y-1/2"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        ></motion.div>

        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={label} className="relative flex flex-col items-center z-10">
              <motion.div
                animate={isCompleted ? "completed" : isActive ? "active" : "inactive"}
                variants={{
                  completed: { scale: 1, backgroundColor: '#10B981', borderColor: '#10B981' },
                  active: { scale: 1.1, backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
                  inactive: { scale: 1, backgroundColor: '#FFFFFF', borderColor: '#D1D5DB' },
                }}
                transition={{ duration: 0.2 }}
                className={`
                  w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-colors duration-300
                `}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <span className={isActive ? 'text-white' : 'text-gray-400'}>{stepNumber}</span>
                )}
              </motion.div>
              <p className={`
                absolute top-12 text-center text-xs transition-colors duration-300
                ${isActive ? 'text-text-heading font-bold' : 'text-text-subtle'}
              `}>
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}