import React from 'react';
import { motion } from 'framer-motion';
import { getStrengthColor } from '../../utils/passwordUtils';

interface PasswordStrengthMeterProps {
  score: number;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ score }) => {
  const segments = [0, 1, 2, 3];

  return (
    <div className="flex space-x-1">
      {segments.map((segment) => (
        <motion.div
          key={segment}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: segment <= score ? 1 : 0.3 }}
          className={`h-1.5 w-6 rounded-full ${
            segment <= score
              ? getStrengthColor(score)
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
          style={{ originY: 0 }}
          transition={{ duration: 0.2, delay: segment * 0.1 }}
        />
      ))}
    </div>
  );
};