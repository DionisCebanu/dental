import React, { useState, useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { UserCircle, Mail, Lock } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';

    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "circOut" } },
      out: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "circIn" } }
    };

    const AuthPage = () => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();
      const [isLogin, setIsLogin] = useState(true);
      const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
      const [errors, setErrors] = useState({});

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
          setErrors(prev => ({ ...prev, [name]: null }));
        }
      };

      const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
          newErrors.email = t('errorRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = t('errorEmailInvalid');
        }
        if (!formData.password) {
          newErrors.password = t('errorRequired');
        } else if (formData.password.length < 6) {
          newErrors.password = t('errorMinLength', {length: 6});
        }
        if (!isLogin && formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          // Simulate API call
          console.log(`${isLogin ? 'Login' : 'Sign Up'} Data:`, {email: formData.email, password: formData.password});
          toast({
            title: isLogin ? "Login Successful (Simulated)" : "Sign Up Successful (Simulated)",
            description: `Welcome, ${formData.email}!`,
            variant: "default",
          });
          // Reset form
           setFormData({ email: '', password: '', confirmPassword: '' });
        } else {
           toast({
            title: "Validation Error",
            description: "Please check the form for errors.",
            variant: "destructive",
          });
        }
      };

      return (
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center min-h-[calc(100vh-10rem)]"
        >
          <Card className="w-full max-w-md bg-card shadow-2xl">
            <CardHeader className="text-center">
               <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="inline-block p-3 bg-primary/10 rounded-full mb-3"
              >
                <UserCircle size={40} className="text-primary" />
              </motion.div>
              <CardTitle className="text-3xl font-bold text-primary">
                {isLogin ? t('authLoginButton') : t('authSignUpButton')}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base">{t('authPageSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="flex items-center mb-1.5 text-foreground/90"><Mail size={16} className="mr-2 text-accent" />{t('authFormEmail')}</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t('authFormEmailPlaceholder')} className={`bg-input border-border focus:ring-primary ${errors.email ? 'border-destructive' : ''}`} />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="password" className="flex items-center mb-1.5 text-foreground/90"><Lock size={16} className="mr-2 text-accent" />{t('authFormPassword')}</Label>
                  <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder={t('authFormPasswordPlaceholder')} className={`bg-input border-border focus:ring-primary ${errors.password ? 'border-destructive' : ''}`} />
                  {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
                </div>
                {!isLogin && (
                  <div>
                    <Label htmlFor="confirmPassword" className="flex items-center mb-1.5 text-foreground/90"><Lock size={16} className="mr-2 text-accent" />Confirm Password</Label>
                    <Input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" className={`bg-input border-border focus:ring-primary ${errors.confirmPassword ? 'border-destructive' : ''}`} />
                    {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                )}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3 text-lg transition-all duration-300 transform hover:shadow-lg hover:shadow-accent/50">
                    {isLogin ? t('authLoginButton') : t('authSignUpButton')}
                  </Button>
                </motion.div>
              </form>
              <div className="mt-6 text-center">
                <Button variant="link" onClick={() => { setIsLogin(!isLogin); setErrors({}); }} className="text-sm text-accent hover:text-accent/80">
                  {isLogin ? t('authNoAccount') + ` ${t('authSignUpButton')}` : t('authHaveAccount') + ` ${t('authLoginButton')}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default AuthPage;