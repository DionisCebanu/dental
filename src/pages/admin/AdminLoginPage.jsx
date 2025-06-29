import React, { useState, useContext } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
    import { ShieldCheck, LogIn } from 'lucide-react';
    import { AppContext } from '@/App';
    import { LanguageContext } from '@/context/LanguageContext';
    import { useToast } from '@/components/ui/use-toast';

    const AdminLoginPage = () => {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const { setIsAdminAuthenticated } = useContext(AppContext);
      const { t } = useContext(LanguageContext);
      const navigate = useNavigate();
      const { toast } = useToast();

      const handleLogin = (e) => {
        e.preventDefault();
        // Placeholder login logic
        if (username === 'admin' && password === 'password') {
          setIsAdminAuthenticated(true);
          navigate('/admin/dashboard');
          toast({ title: t('adminLoginSuccessTitle'), description: t('adminLoginSuccessDesc') });
        } else {
          toast({ title: t('adminLoginErrorTitle'), description: t('adminLoginErrorDesc'), variant: 'destructive' });
        }
      };

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-primary/30 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          >
            <Card className="w-full max-w-md bg-slate-800/80 backdrop-blur-md border-slate-700 shadow-2xl shadow-primary/20">
              <CardHeader className="text-center">
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="inline-block p-4 bg-primary/20 rounded-full mb-4 mx-auto"
                >
                  <ShieldCheck size={48} className="text-primary" />
                </motion.div>
                <CardTitle className="text-3xl font-bold text-primary">{t('adminLoginTitle', { defaultText: "Admin Login"})}</CardTitle>
                <CardDescription className="text-slate-400">{t('adminLoginSubtitle', { defaultText: "Access The Golden Spoon CMS"})}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <Label htmlFor="username" className="text-slate-300">{t('adminLoginUsername', { defaultText: "Username"})}</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={t('adminLoginUsernamePlaceholder', { defaultText: "Enter your username"})}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-slate-300">{t('adminLoginPassword', { defaultText: "Password"})}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-primary"
                      required
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3 text-lg">
                      <LogIn size={20} className="mr-2" />
                      {t('adminLoginButton', { defaultText: "Login"})}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
              <CardFooter className="text-center">
                <p className="text-xs text-slate-500 w-full">{t('adminLoginFooterNote', { defaultText: "For authorized personnel only."})}</p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default AdminLoginPage;