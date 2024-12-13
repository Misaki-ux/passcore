import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, ExternalLink, Cloud, CloudOff, RefreshCw } from 'lucide-react';
import { usePasswordStore } from '../../store/passwordStore';
import { Card } from '../ui/Card';
import type { PasswordEntry } from '../../types/password';

export const PasswordList: React.FC = () => {
  const { entries, isLoading, loadPasswords, syncStatus, syncPasswords } = usePasswordStore();

  useEffect(() => {
    loadPasswords();
  }, [loadPasswords]);

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log('Delete password:', id);
  };

  const formatLastSync = (date: string | null) => {
    if (!date) return 'Never';
    const lastSync = new Date(date);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - lastSync.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="flex items-center">
            {syncStatus.isSyncing ? (
              <RefreshCw className="h-4 w-4 animate-spin text-indigo-600" />
            ) : syncStatus.error ? (
              <CloudOff className="h-4 w-4 text-red-500" />
            ) : (
              <Cloud className="h-4 w-4 text-green-500" />
            )}
            <span className="ml-2">
              Last synced: {formatLastSync(syncStatus.lastSync)}
            </span>
          </div>
        </div>
        <button
          onClick={() => syncPasswords()}
          disabled={syncStatus.isSyncing}
          className="flex items-center px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          {syncStatus.isSyncing ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>

      {entries.map((entry: PasswordEntry) => (
        <Card key={entry.id} className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
              <p className="text-sm text-gray-500">{entry.username}</p>
            </div>
            <div className="flex items-center space-x-2">
              {entry.url && (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ExternalLink className="h-5 w-5 text-gray-500" />
                </a>
              )}
              <Link
                to={`/passwords/${entry.id}/edit`}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Edit2 className="h-5 w-5 text-gray-500" />
              </Link>
              <button
                onClick={() => handleDelete(entry.id)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Trash2 className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
          {entry.notes && (
            <p className="mt-2 text-sm text-gray-600">{entry.notes}</p>
          )}
          <div className="mt-2 text-xs text-gray-500">
            Last synced: {formatLastSync(entry.lastSync)}
          </div>
        </Card>
      ))}
    </div>
  );
};