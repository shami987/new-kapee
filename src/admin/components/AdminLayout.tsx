import type { ReactNode } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <AdminHeader title={title} />

        {/* Page Content */}
        <div className="p-8 bg-gray-50 min-h-[calc(100vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};
