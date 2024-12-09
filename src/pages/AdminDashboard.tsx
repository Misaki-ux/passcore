import React from 'react';
import { UserManagement } from '../components/Admin/UserManagement';
import { useStore } from '../store/useStore';
import { Navigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { user } = useStore();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container mx-auto px-4 pt-20 pb-8">
      <UserManagement />
    </div>
  );
};