import React, { useState } from 'react';
import { PlusCircle, Upload, Key, Shield, Users, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PasswordList } from '../components/Dashboard/PasswordList';
import { PasswordGenerator } from '../components/Dashboard/PasswordGenerator';
import { AddPasswordForm } from '../components/Dashboard/AddPasswordForm';
import { ImportPasswords } from '../components/Dashboard/ImportPasswords';
import { StatCard } from '../components/Dashboard/Stats/StatCard';
import { PasswordStrengthChart } from '../components/Dashboard/Charts/PasswordStrengthChart';
import { CategoryDistribution } from '../components/Dashboard/Charts/CategoryDistribution';
import { RecentActivity } from '../components/Dashboard/RecentActivity';
import { PasswordEntry } from '../types';

export const Dashboard: React.FC = () => {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([
    {
      id: '1',
      title: 'Gmail Account',
      username: 'user@gmail.com',
      password: 'securepass123',
      url: 'https://gmail.com',
      category: 'Email',
      tags: ['personal', 'email'],
      strength: 0.8,
      lastModified: new Date(),
    },
    {
      id: '2',
      title: 'GitHub',
      username: 'developer123',
      password: 'githubpass456',
      url: 'https://github.com',
      category: 'Development',
      tags: ['work', 'dev'],
      strength: 0.9,
      lastModified: new Date(),
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);

  // Mock data for demonstration
  const stats = {
    totalPasswords: passwords.length,
    averageStrength: 85,
    reusedPasswords: 2,
    weakPasswords: 3,
  };

  const strengthDistribution = {
    veryWeak: 1,
    weak: 2,
    moderate: 4,
    strong: 8,
    veryStrong: 5,
  };

  const categories = [
    { name: 'Social Media', count: 5, color: '#818CF8' },
    { name: 'Finance', count: 4, color: '#34D399' },
    { name: 'Work', count: 6, color: '#F472B6' },
    { name: 'Personal', count: 3, color: '#FBBF24' },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'create' as const,
      title: 'Added new password',
      timestamp: new Date(),
      details: 'Created password for Netflix account',
    },
    {
      id: '2',
      type: 'update' as const,
      title: 'Updated password',
      timestamp: new Date(Date.now() - 3600000),
      details: 'Modified GitHub account password',
    },
  ];

  return (
    <div className="container mx-auto px-4 pt-20 pb-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Password Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and monitor your password security
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Passwords"
          value={stats.totalPasswords}
          icon={Key}
          description="Stored passwords"
        />
        <StatCard
          title="Average Strength"
          value={`${stats.averageStrength}%`}
          icon={Shield}
          change={5}
        />
        <StatCard
          title="Reused Passwords"
          value={stats.reusedPasswords}
          icon={Users}
          description="Passwords used multiple times"
        />
        <StatCard
          title="Weak Passwords"
          value={stats.weakPasswords}
          icon={AlertTriangle}
          description="Passwords needing attention"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <PasswordStrengthChart distribution={strengthDistribution} />
        </div>
        <CategoryDistribution categories={categories} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Password Vault
              </h2>
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Add Password</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowImportForm(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <Upload className="w-5 h-5" />
                  <span>Import</span>
                </motion.button>
              </div>
            </div>
            <PasswordList
              passwords={passwords}
              onDelete={(id) => setPasswords(passwords.filter((p) => p.id !== id))}
            />
          </div>
        </div>
        <div className="space-y-6">
          <PasswordGenerator />
          <RecentActivity activities={recentActivities} />
        </div>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <AddPasswordForm
            onClose={() => setShowAddForm(false)}
            onSubmit={(data) => {
              const newPassword: PasswordEntry = {
                ...data,
                id: (passwords.length + 1).toString(),
                strength: 0.8,
                lastModified: new Date(),
              };
              setPasswords([...passwords, newPassword]);
            }}
          />
        )}
        {showImportForm && (
          <ImportPasswords
            onClose={() => setShowImportForm(false)}
            onImport={(importedPasswords) => {
              const newPasswords = importedPasswords.map((pass, index) => ({
                id: (passwords.length + index + 1).toString(),
                title: pass.title || 'Imported Password',
                username: pass.username || '',
                password: pass.password || '',
                url: pass.url || '',
                category: pass.category || 'Imported',
                tags: pass.tags || ['imported'],
                strength: 0.8,
                lastModified: new Date(),
              }));
              setPasswords([...passwords, ...newPasswords]);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};