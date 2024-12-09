import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen } from 'lucide-react';

interface CategoryData {
  name: string;
  count: number;
  color: string;
}

interface CategoryDistributionProps {
  categories: CategoryData[];
}

export const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ categories }) => {
  const total = categories.reduce((sum, category) => sum + category.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
    >
      <div className="flex items-center space-x-2 mb-6">
        <FolderOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Categories
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {category.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {((category.count / total) * 100).toFixed(1)}% ({category.count})
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};