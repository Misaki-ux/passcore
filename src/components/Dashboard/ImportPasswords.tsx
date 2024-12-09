import React, { useState, useRef } from 'react';
import { Upload, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImportPasswordsProps {
  onClose: () => void;
  onImport: (passwords: any[]) => void;
}

export const ImportPasswords: React.FC<ImportPasswordsProps> = ({ onClose, onImport }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await handleFiles(files);
    }
  };

  const handleFiles = async (files: File[]) => {
    setError(null);
    setSuccess(null);

    const file = files[0];
    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase();
    const validExtensions = ['csv', 'kdbx', '1pif', 'json'];
    
    if (!validExtensions.includes(extension || '')) {
      setError('Invalid file format. Please upload a CSV, KDBX, 1PIF, or JSON file.');
      return;
    }

    try {
      // Here you would implement the actual import logic based on file type
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // This is a simplified example - you'd need proper parsing logic for each format
          const content = e.target?.result as string;
          let passwords = [];
          
          if (extension === 'json') {
            passwords = JSON.parse(content);
          } else if (extension === 'csv') {
            // Simple CSV parsing (you'd want a proper CSV parser in production)
            passwords = content.split('\n').slice(1).map(line => {
              const [title, username, password] = line.split(',');
              return { title, username, password };
            });
          }
          // Add parsing logic for other formats

          onImport(passwords);
          setSuccess('Passwords imported successfully!');
          setTimeout(onClose, 2000);
        } catch (err) {
          setError('Failed to parse file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    } catch (err) {
      setError('An error occurred while importing the file.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Import Passwords</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-300 dark:border-gray-700'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".csv,.kdbx,.1pif,.json"
              onChange={handleChange}
              className="hidden"
            />

            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Drag and drop your password file, or{' '}
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              >
                browse
              </button>
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Supported formats: CSV, KDBX, 1PIF, JSON
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center space-x-2"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center space-x-2"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{success}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};