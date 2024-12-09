import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface PasswordStrengthDistribution {
  veryWeak: number;
  weak: number;
  moderate: number;
  strong: number;
  veryStrong: number;
}

interface PasswordStrengthChartProps {
  distribution: PasswordStrengthDistribution;
}

export const PasswordStrengthChart: React.FC<PasswordStrengthChartProps> = ({ distribution }) => {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);
  
  const getPercentage = (value: number) => ((value / total) * 100).toFixed(1);
  
  const strengthColors = {
    veryWeak: 'bg-red-500 dark:bg-red-600',
    weak: 'bg-orange-500 dark:bg-orange-600',
    moderate: 'bg-yellow-500 dark:bg-yellow-600',
    strong: 'bg-blue-500 dark:bg-blue-600',
    veryStrong: 'bg-green-500 dark:bg-green-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Password Strength Distribution
        </h3>
      </div>

      <div className="space-y-4">
        {Object.entries(distribution).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {getPercentage(value)}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getPercentage(value)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${strengthColors[key as keyof typeof strengthColors]}`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};