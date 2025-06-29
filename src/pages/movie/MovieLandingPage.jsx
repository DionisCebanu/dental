import React, { useContext } from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { PlayCircle, CalendarDays, Star, Ticket } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';
    import { movies } from '@/data/movieData.js';

    const pageVariants = {
      initial: { opacity: 0 },
      in: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.5 } },
      out: { opacity: 0, transition: { duration: 0.3 } }
    };

    const itemVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    const MovieCard = ({ movie, t }) => (
      <motion.div variants={itemVariants} className="h-full">
        <Card className="h-full flex flex-col bg-slate-800/70 border-slate-700 hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 group overflow-hidden">
          <div className="relative h-72 w-full overflow-hidden">
            <img  
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" 
              alt={t(movie.titleKey, movie.defaultTitle)}
             src="https://images.unsplash.com/photo-1661171984027-ec48d8efcca0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">{t(movie.titleKey, movie.defaultTitle)}</h3>
              <p className="text-xs text-gray-300">{t(movie.genreKey, movie.defaultGenre)}</p>
            </div>
            {movie.status === 'showing' && (
              <div className="absolute top-3 right-3 bg-accent text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                <PlayCircle size={14} className="mr-1" /> Now Showing
              </div>
            )}
             {movie.status === 'upcoming' && (
              <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                <CalendarDays size={14} className="mr-1" /> Upcoming
              </div>
            )}
          </div>
          <CardContent className="pt-4 flex-grow">
            <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
              <span className="flex items-center"><Star size={14} className="mr-1 text-yellow-400" /> {movie.rating}/5</span>
              <span>{movie.ageRating}</span>
              <span>{movie.duration}</span>
            </div>
            <CardDescription className="text-gray-400 text-xs line-clamp-3">
              {t(movie.synopsisKey, movie.defaultSynopsis)}
            </CardDescription>
          </CardContent>
          <CardFooter className="pt-0">
            <Button asChild variant="secondary" className="w-full group-hover:bg-accent/90 transition-colors">
              <Link to={`/movie/${movie.id}`}>
                {movie.status === 'showing' ? t('bookTickets') : t('viewDetails')}
                <Ticket size={16} className="ml-2"/>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );

    const MovieLandingPage = () => {
      const { t } = useContext(LanguageContext);
      const showingMovies = movies.filter(m => m.status === 'showing');
      const upcomingMovies = movies.filter(m => m.status === 'upcoming');

      return (
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 sm:py-32 sm:pt-40"
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          <motion.section variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              {t('landingTitle')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              {t('landingSubtitle')}
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-primary flex items-center">
              <PlayCircle size={32} className="mr-3 text-accent"/> {t('currentlyShowing')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {showingMovies.map(movie => <MovieCard key={movie.id} movie={movie} t={t} />)}
            </div>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-primary flex items-center">
              <CalendarDays size={32} className="mr-3 text-accent"/> {t('upcomingMovies')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {upcomingMovies.map(movie => <MovieCard key={movie.id} movie={movie} t={t} />)}
            </div>
          </motion.section>
        </motion.div>
      );
    };

    export default MovieLandingPage;