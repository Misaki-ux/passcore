import React, { useState, useEffect } from 'react';
import { RefreshCw, Copy, Check, Shield, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generatePassword, calculatePasswordStrength, getStrengthColor } from '../../utils/passwordUtils';

export const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [strength, setStrength] = useState({ score: 0, feedback: { warning: '', suggestions: [] } });

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(length, options);
    setPassword(newPassword);
    setStrength(calculatePasswordStrength(newPassword));
  };

  useEffect(() => {
    if (password) {
      setStrength(calculatePasswordStrength(password));
    }
  }, [password]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
    >
      <div 
        className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Password Generator
          </h2>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={password}
                    readOnly
                    className="flex-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Click generate to create password"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGeneratePassword}
                    className="p-3 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors shadow-sm"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm relative group"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {copied ? 'Copied!' : 'Copy password'}
                    </span>
                  </motion.button>
                </div>

                {password && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 dark:text-gray-400">Strength:</span>
                      <span className={getStrengthColor(strength.score)}>
                        {['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][strength.score]}
                      </span>
                    </div>
                    {strength.feedback.warning && (
                      <p className="text-orange-500 dark:text-orange-400 mt-1">
                        {strength.feedback.warning}
                      </p>
                    )}
                  </motion.div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span>Length: {length} characters</span>
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="32"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(options).map(([key, value]) => (
                    <label
                      key={key}
                      className="relative inline-flex items-center cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      <span className="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {key}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};