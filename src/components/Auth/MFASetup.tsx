import React, { useState } from 'react';
import { X, Smartphone, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode.react';

interface MFASetupProps {
  onClose: () => void;
}

export const MFASetup: React.FC<MFASetupProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // In a real app, this would be generated on the server
  const secretKey = 'JBSWY3DPEHPK3PXP';
  const qrCodeUrl = `otpauth://totp/NeoPass:user@example.com?secret=${secretKey}&issuer=NeoPass`;

  const copySecretKey = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would verify the code with the server
    if (verificationCode === '123456') {
      setStep(3);
    } else {
      setError('Invalid verification code');
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
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Setup Two-Factor Authentication</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Two-factor authentication adds an extra layer of security to your account. You'll need to enter a code from your authenticator app when signing in.
              </p>
              <div className="flex justify-center">
                <Smartphone className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1. Install an authenticator app like Google Authenticator or Authy
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  2. Scan the QR code or enter the secret key manually
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  3. Enter the verification code to complete setup
                </p>
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Begin Setup
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg">
                  <QRCode value={qrCodeUrl} size={200} />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={secretKey}
                  readOnly
                  className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 font-mono text-sm"
                />
                <button
                  onClick={copySecretKey}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>

              <form onSubmit={handleVerification} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Enter 6-digit code"
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Verify
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <Check className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Setup Complete!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Two-factor authentication has been enabled for your account.
              </p>
              <button
                onClick={onClose}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};