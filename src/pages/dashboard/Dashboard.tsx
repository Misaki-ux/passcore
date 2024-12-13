import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Key, 
  Shield, 
  AlertTriangle, 
  Search, 
  Plus,
  Folder,
  Star,
  Trash2,
  Grid,
  List,
  Copy,
  Check,
  Eye,
  EyeOff,
  HardDrive,
  Cloud,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { NewPasswordModal } from '../../components/modals/NewPasswordModal';
import { storage } from '../../utils/storage';

interface Password {
  id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  category: string;
  favorite: boolean;
  lastModified: Date;
}

interface PasswordData {
  title: string;
  username: string;
  password: string;
  url?: string;
  category: string;
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  passwordTitle: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, passwordTitle }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Delete Password
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete the password for "{passwordTitle}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={onClose}
                variant="outline"
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const mockPasswords: Password[] = [
  {
    id: '1',
    title: 'Google Account',
    username: 'user@gmail.com',
    password: '********',
    url: 'https://google.com',
    category: 'Personal',
    favorite: true,
    lastModified: new Date('2024-03-10')
  },
  {
    id: '2',
    title: 'GitHub',
    username: 'developer',
    password: '********',
    url: 'https://github.com',
    category: 'Work',
    favorite: false,
    lastModified: new Date('2024-03-09')
  },
  {
    id: '3',
    title: 'Netflix',
    username: 'entertainment@email.com',
    password: '********',
    url: 'https://netflix.com',
    category: 'Entertainment',
    favorite: true,
    lastModified: new Date('2024-03-08')
  }
];

const categories = ['All', 'Personal', 'Work', 'Entertainment', 'Finance', 'Social'];

export const Dashboard: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isNewPasswordModalOpen, setIsNewPasswordModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [passwords, setPasswords] = useState<Password[]>(mockPasswords);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
  const [savingState, setSavingState] = useState<{ [key: string]: 'local' | 'cloud' | null }>({});
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; password: Password | null }>({
    isOpen: false,
    password: null,
  });

  useEffect(() => {
    const localPasswords = storage.local.getAllPasswords();
    if (localPasswords.length > 0) {
      setPasswords(localPasswords);
    }
  }, []);

  const handleSaveToLocal = async (password: Password) => {
    setSavingState(prev => ({ ...prev, [password.id]: 'local' }));
    const success = await storage.local.savePassword(password);
    if (success) {
      setTimeout(() => {
        setSavingState(prev => ({ ...prev, [password.id]: null }));
      }, 1500);
    } else {
      setSavingState(prev => ({ ...prev, [password.id]: null }));
      // TODO: Show error toast
    }
  };

  const handleSaveToCloud = async (password: Password) => {
    setSavingState(prev => ({ ...prev, [password.id]: 'cloud' }));
    const success = await storage.cloud.savePassword(password);
    if (success) {
      setTimeout(() => {
        setSavingState(prev => ({ ...prev, [password.id]: null }));
      }, 1500);
    } else {
      setSavingState(prev => ({ ...prev, [password.id]: null }));
      // TODO: Show error toast
    }
  };

  const handleSavePassword = (passwordData: PasswordData) => {
    const newPassword: Password = {
      id: Date.now().toString(), // temporary ID generation
      ...passwordData,
      favorite: false,
      lastModified: new Date()
    };
    
    setPasswords(prev => [newPassword, ...prev]);
  };

  const handleCopyPassword = async (password: Password) => {
    try {
      await navigator.clipboard.writeText(password.password);
      setCopiedId(password.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDeletePassword = async (password: Password) => {
    setDeleteModal({ isOpen: true, password });
  };

  const confirmDelete = async () => {
    if (!deleteModal.password) return;

    // Remove from state
    setPasswords(prev => prev.filter(p => p.id !== deleteModal.password?.id));

    // Remove from storage
    await storage.local.removePassword(deleteModal.password.id);
    await storage.cloud.removePassword(deleteModal.password.id);

    // Close modal
    setDeleteModal({ isOpen: false, password: null });
  };

  const filteredPasswords = passwords.filter(password => {
    const matchesCategory = selectedCategory === 'All' || password.category === selectedCategory;
    const matchesSearch = password.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         password.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <motion.div {...fadeIn} className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Password Vault</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your secure passwords</p>
        </motion.div>

        <motion.div {...fadeIn} className="flex space-x-4">
          <Button
            onClick={() => setIsNewPasswordModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Password</span>
          </Button>
        </motion.div>
      </div>

      <NewPasswordModal 
        isOpen={isNewPasswordModalOpen}
        onClose={() => setIsNewPasswordModalOpen(false)}
        onSave={handleSavePassword}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <motion.div {...fadeIn} className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Search passwords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-lg ${view === 'grid' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <Grid className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Button>
                <Button
                  onClick={() => setView('list')}
                  className={`p-2 rounded-lg ${view === 'list' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <List className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Button>
              </div>
            </div>

            <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
              {filteredPasswords.map((password) => (
                <motion.div
                  key={password.id}
                  className={`bg-gray-50 dark:bg-gray-900 rounded-lg p-4 ${
                    view === 'list' ? 'flex items-center justify-between' : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <Key className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {password.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {password.username}
                      </p>
                      <div className="relative flex items-center space-x-2">
                        <input
                          type={showPassword[password.id] ? 'text' : 'password'}
                          value={password.password}
                          readOnly
                          className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm text-gray-900 dark:text-white w-full"
                        />
                        <button
                          onClick={() => togglePasswordVisibility(password.id)}
                          className="absolute right-20 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                        >
                          {showPassword[password.id] ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                        <button
                          onClick={() => handleCopyPassword(password)}
                          className="absolute right-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                        >
                          {copiedId === password.id ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <Button 
                      onClick={() => handleSaveToLocal(password)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      disabled={savingState[password.id] !== null}
                    >
                      {savingState[password.id] === 'local' ? (
                        <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
                      ) : (
                        <HardDrive className="h-5 w-5 text-gray-400 hover:text-indigo-500" />
                      )}
                    </Button>
                    <Button 
                      onClick={() => handleSaveToCloud(password)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      disabled={savingState[password.id] !== null}
                    >
                      {savingState[password.id] === 'cloud' ? (
                        <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
                      ) : (
                        <Cloud className="h-5 w-5 text-gray-400 hover:text-indigo-500" />
                      )}
                    </Button>
                    <Button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
                      <Star 
                        className={`h-5 w-5 ${
                          password.favorite ? 'text-yellow-400 fill-current' : 'text-gray-400'
                        }`}
                      />
                    </Button>
                    <Button 
                      onClick={() => handleDeletePassword(password)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5 text-gray-400 hover:text-red-500" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeIn} className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Folder className="h-5 w-5" />
                    <span>{category}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
            <div className="flex items-center space-x-3 text-yellow-500">
              <AlertTriangle className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Security Alert</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              2 passwords haven't been changed in over 90 days. Consider updating them.
            </p>
          </div>
        </motion.div>
      </div>
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, password: null })}
        onConfirm={confirmDelete}
        passwordTitle={deleteModal.password?.title || ''}
      />
    </div>
  );
};