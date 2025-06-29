import React, { useState } from 'react';
    import { Outlet } from 'react-router-dom';
    import AdminSidebar from '@/components/admin/AdminSidebar';
    import AdminHeader from '@/components/admin/AdminHeader';
    import { Button } from '@/components/ui/button';
    import { Menu as MenuIcon, X as XIcon } from 'lucide-react';

    const AdminLayout = () => {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);

      return (
        <div className="flex h-screen bg-slate-900 text-slate-100">
          {/* Mobile Sidebar Toggle Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="fixed top-4 left-4 z-50 md:hidden text-slate-100 hover:bg-slate-700"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </Button>

          {/* Sidebar */}
          <div className={`fixed inset-y-0 left-0 z-40 md:static md:z-auto transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
            <AdminSidebar onLinkClick={() => setIsSidebarOpen(false)} />
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-800 p-4 sm:p-6 md:p-8">
              <Outlet />
            </main>
          </div>
        </div>
      );
    };

    export default AdminLayout;