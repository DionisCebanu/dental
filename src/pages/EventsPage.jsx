import React, { useState, useEffect, useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { CalendarDays, Clock, Newspaper } from 'lucide-react';
    import { Link } from 'react-router-dom';

    const pageVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const itemVariants = {
      hidden: { opacity: 0, scale: 0.9 },
      visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: i * 0.1, type: 'spring', stiffness: 100 },
      }),
    };

    const EventsPage = () => {
      const { t } = useContext(LanguageContext);
      const [posts, setPosts] = useState([]);
      const [filter, setFilter] = useState('all'); 

      useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('restaurantBlogAndEvents')) || [];
        setPosts(storedPosts.sort((a, b) => new Date(b.date) - new Date(a.date)));
      }, []);

      const filteredPosts = posts.filter(post => {
        if (filter === 'all') return true;
        return post.type === filter;
      });

      return (
        <motion.div
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 py-8 sm:py-12"
        >
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold text-primary mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {t('eventsPageTitle', { defaultText: 'News & Events' })}
            </motion.h1>
            <motion.p 
              className="text-lg text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t('eventsPageSubtitle', { defaultText: 'Stay updated with our latest announcements, blog posts, and upcoming events.' })}
            </motion.p>
          </div>

          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              onClick={() => setFilter('all')}
              className={`${filter === 'all' ? 'bg-primary text-primary-foreground' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}`}
            >
              {t('eventsFilterAll', { defaultText: 'All' })}
            </Button>
            <Button 
              variant={filter === 'blog' ? 'default' : 'outline'} 
              onClick={() => setFilter('blog')}
              className={`${filter === 'blog' ? 'bg-primary text-primary-foreground' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}`}
            >
              {t('eventsFilterBlog', { defaultText: 'Blog' })}
            </Button>
            <Button 
              variant={filter === 'event' ? 'default' : 'outline'} 
              onClick={() => setFilter('event')}
              className={`${filter === 'event' ? 'bg-primary text-primary-foreground' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}`}
            >
              {t('eventsFilterEvents', { defaultText: 'Events' })}
            </Button>
          </motion.div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div key={post.id} custom={index} variants={itemVariants}>
                  <Card className="bg-slate-800 border-slate-700 hover:shadow-primary/20 transition-all duration-300 h-full flex flex-col">
                    {post.imageUrl && (
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                        <img  
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                         src="https://images.unsplash.com/photo-1694388001616-1176f534d72f" />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl text-primary">{post.title}</CardTitle>
                      <CardDescription className="text-xs text-slate-400 flex items-center gap-x-2 flex-wrap pt-1">
                        <span className="flex items-center"><CalendarDays size={14} className="mr-1 text-accent"/> {new Date(post.date).toLocaleDateString()}</span>
                        {post.time && post.type === 'event' && <span className="flex items-center"><Clock size={14} className="mr-1 text-accent"/> {post.time}</span>}
                        <span className={`capitalize px-2 py-0.5 rounded-full text-xs font-semibold ${post.type === 'blog' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                          {t(`postType${post.type.charAt(0).toUpperCase() + post.type.slice(1)}`, { defaultText: post.type })}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow pt-0 pb-3">
                      <p className="text-slate-300 line-clamp-4">{post.content}</p>
                       {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {post.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded-full">{tag}</span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="mt-auto border-t border-slate-700 pt-3">
                      <Button asChild variant="link" className="text-accent p-0 h-auto hover:text-accent/80">
                         <Link to={`#`}>{t('readMoreLink', { defaultText: 'Read More' })}</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-16 text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Newspaper size={48} className="mx-auto mb-4 text-slate-500" />
              <p className="text-xl">{t('eventsNoPosts', { defaultText: 'No posts found for this category yet.' })}</p>
            </motion.div>
          )}
        </motion.div>
      );
    };

    export default EventsPage;