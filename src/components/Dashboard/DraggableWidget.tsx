import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grip, X } from 'lucide-react';

interface DraggableWidgetProps {
  id: string;
  title: string;
  onRemove: (id: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  id,
  title,
  onRemove,
  children,
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className={`${className} ${
        isDragging ? 'z-50 shadow-xl' : ''
      } bg-white dark:bg-gray-800 rounded-xl shadow-sm`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="cursor-move">
            <Grip className="w-5 h-5 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        <button
          onClick={() => onRemove(id)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  );
};