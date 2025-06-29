import React, { useContext } from 'react';
    import { NavLink, useNavigate } from 'react-router-dom';
    import { LayoutDashboard, CalendarDays, LayoutGrid, Settings, Utensils, MessageSquare, Newspaper, LogOut, ShieldCheck } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';
    import { AppContext } from '@/App';
    import { Button } from '@/components/ui/button';

    const AdminSidebar = ({ onLinkClick }) => {
      const { t } = useContext(LanguageContext);
      const { setIsAdminAuthenticated } = useContext(AppContext);
      const navigate = useNavigate();

      const handleLogout = () => {
        setIsAdminAuthenticated(false);
        if (onLinkClick) onLinkClick();
        navigate('/admin/login');
      };

      const handleNavLinkClick = () => {
        if (onLinkClick) {
          onLinkClick();
        }
      };

      const navItems = [
        { to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, labelKey: 'adminNavDashboard' },
        { to: '/admin/reservations', icon: <CalendarDays size={20} />, labelKey: 'adminNavReservations' },
        { to: '/admin/table-layout', icon: <LayoutGrid size={20} />, labelKey: 'adminNavTableLayout' },
        { to: '/admin/availability', icon: <Settings size={20} />, labelKey: 'adminNavAvailability' },
        { to: '/admin/menu-editor', icon: <Utensils size={20} />, labelKey: 'adminNavMenuEditor' },
        { to: '/admin/blog-events', icon: <Newspaper size={20} />, labelKey: 'adminNavBlogEvents' },
        { to: '/admin/contact-submissions', icon: <MessageSquare size={20} />, labelKey: 'adminNavContactSubmissions' },
      ];

      return (
        <aside className="w-64 h-full bg-slate-950 p-6 flex flex-col shadow-lg">
          <div className="flex items-center mb-10">
            <ShieldCheck size={32} className="text-primary mr-3" />
            <h1 className="text-2xl font-bold text-primary">{t('adminPanelTitle', { defaultText: "Admin Panel"})}</h1>
          </div>
          <nav className="flex-grow space-y-3">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={handleNavLinkClick}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ease-in-out
                  ${isActive 
                    ? 'bg-primary text-primary-foreground shadow-md scale-105' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  }`
                }
              >
                {item.icon}
                <span>{t(item.labelKey, { defaultText: item.labelKey.replace('adminNav', '') })}</span>
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto">
            <Button 
              variant="ghost" 
              onClick={handleLogout} 
              className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-red-700/20 hover:text-red-400 transition-colors duration-200"
            >
              <LogOut size={20} />
              <span>{t('adminLogoutButton', { defaultText: "Logout"})}</span>
            </Button>
          </div>
        </aside>
      );
    };

    export default AdminSidebar;