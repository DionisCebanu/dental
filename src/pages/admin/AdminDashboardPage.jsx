import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';
    import { Users, CalendarCheck, Utensils, MessageCircle, LayoutGrid, Settings } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const StatCard = ({ title, value, icon, description, colorClass = "text-primary" }) => (
      <Card className="bg-slate-800 border-slate-700 hover:shadow-primary/20 transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
          {React.cloneElement(icon, { className: `h-5 w-5 ${colorClass}` })}
        </CardHeader>
        <CardContent>
          <div className={`text-3xl font-bold ${colorClass}`}>{value}</div>
          <p className="text-xs text-slate-400 pt-1">{description}</p>
        </CardContent>
      </Card>
    );

    const QuickLinkCard = ({ title, to, icon, description }) => (
      <Link to={to} className="block hover:no-underline">
        <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700/70 transition-all duration-300 h-full flex flex-col">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              {React.cloneElement(icon, { className: "h-8 w-8 text-accent" })}
              <CardTitle className="text-xl text-primary">{title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <CardDescription className="text-slate-300">{description}</CardDescription>
          </CardContent>
          <CardContent className="pt-0">
             <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              {title}
            </Button>
          </CardContent>
        </Card>
      </Link>
    );


    const AdminDashboardPage = () => {
      const { t } = useContext(LanguageContext);

      const stats = [
        { title: t('adminDashboardStatReservationsToday', { defaultText: "Reservations Today"}), value: "12", icon: <CalendarCheck />, description: t('adminDashboardStatReservationsTodayDesc', { defaultText: "+5 from yesterday"}), colorClass: "text-green-400" },
        { title: t('adminDashboardStatTotalGuests', { defaultText: "Total Guests This Week"}), value: "128", icon: <Users />, description: t('adminDashboardStatTotalGuestsDesc', { defaultText: "Avg. 4 per booking"}), colorClass: "text-blue-400" },
        { title: t('adminDashboardStatPopularDish', { defaultText: "Most Popular Dish"}), value: t('supaZeamaName'), icon: <Utensils />, description: t('adminDashboardStatPopularDishDesc', { defaultText: "Ordered 35 times this week"}), colorClass: "text-orange-400" },
        { title: t('adminDashboardStatNewMessages', { defaultText: "New Contact Messages"}), value: "3", icon: <MessageCircle />, description: t('adminDashboardStatNewMessagesDesc', { defaultText: "Unread messages"}), colorClass: "text-purple-400" },
      ];

      const quickLinks = [
        { title: t('adminNavReservations'), to: "/admin/reservations", icon: <CalendarCheck />, description: t('adminDashboardLinkReservationsDesc', { defaultText: "View, edit, and manage all bookings."}) },
        { title: t('adminNavMenuEditor'), to: "/admin/menu-editor", icon: <Utensils />, description: t('adminDashboardLinkMenuDesc', { defaultText: "Add, remove, or update menu items and categories."}) },
        { title: t('adminNavTableLayout'), to: "/admin/table-layout", icon: <LayoutGrid />, description: t('adminDashboardLinkTableDesc', { defaultText: "Configure your restaurant's table arrangement."}) },
        { title: t('adminNavAvailability'), to: "/admin/availability", icon: <Settings />, description: t('adminDashboardLinkAvailabilityDesc', { defaultText: "Set opening hours and block specific dates."}) },
      ];

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-8">{t('adminDashboardTitle', { defaultText: "Admin Dashboard"})}</h1>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-200 mb-4">{t('adminDashboardOverviewTitle', { defaultText: "Quick Overview"})}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <StatCard {...stat} />
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-200 mb-6">{t('adminDashboardQuickLinksTitle', { defaultText: "Quick Links"})}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                 <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="h-full"
                >
                  <QuickLinkCard {...link} />
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      );
    };

    export default AdminDashboardPage;