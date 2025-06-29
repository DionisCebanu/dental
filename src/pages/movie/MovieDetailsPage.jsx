import React, { useContext } from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Star, Users, Clock, CalendarDays, Film, Ticket, ChevronLeft, Info } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';
    import { getMovieById } from '@/data/movieData.js';

    const pageVariants = {
      initial: { opacity: 0, x: 50 },
      in: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
      out: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeInOut" } }
    };

    const MovieDetailsPage = () => {
      const { movieId } = useParams();
      const { t } = useContext(LanguageContext);
      const movie = getMovieById(movieId);

      if (!movie) {
        return <div className="container mx-auto py-40 text-center text-xl">Movie not found.</div>;
      }

      const DetailItem = ({ icon, labelKey, value }) => (
        <motion.div 
          className="flex items-start space-x-3"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {React.cloneElement(icon, { size: 20, className: "text-accent mt-1" })}
          <div>
            <p className="text-sm text-gray-400">{t(labelKey)}</p>
            <p className="text-md font-semibold text-gray-200">{value}</p>
          </div>
        </motion.div>
      );

      return (
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 sm:py-32 sm:pt-40 min-h-screen"
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button variant="outline" asChild className="text-gray-300 hover:text-accent hover:border-accent">
              <Link to="/"><ChevronLeft size={18} className="mr-2" /> Back to Movies</Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 shadow-xl overflow-hidden">
                <img  
                  className="w-full h-auto object-cover aspect-[2/3]" 
                  alt={t(movie.titleKey, movie.defaultTitle)}
                 src="https://images.unsplash.com/photo-1569587889770-9134d27b292e" />
              </Card>
            </motion.div>

            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1 }}
            >
              <motion.h1 
                className="text-4xl sm:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t(movie.titleKey, movie.defaultTitle)}
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-400 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t(movie.genreKey, movie.defaultGenre)}
              </motion.p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 mb-8">
                <DetailItem icon={<Star />} labelKey="rating" value={`${movie.rating}/5`} />
                <DetailItem icon={<Info />} labelKey="ageRating" value={movie.ageRating} />
                <DetailItem icon={<Clock />} labelKey="duration" value={movie.duration} />
                <DetailItem icon={<Film />} labelKey="director" value={t(movie.directorKey, movie.defaultDirector)} />
                <DetailItem icon={<Users />} labelKey="cast" value={movie.defaultCast.join(', ')} />
                {movie.status === 'upcoming' && <DetailItem icon={<CalendarDays />} labelKey="releaseDate" value={new Date(movie.releaseDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} />}
              </div>
              
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-semibold text-primary mb-2">{t('synopsis')}</h2>
                <p className="text-gray-300 leading-relaxed">{t(movie.synopsisKey, movie.defaultSynopsis)}</p>
              </motion.div>

              {movie.status === 'showing' && movie.showtimes && movie.showtimes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-semibold text-primary mb-4">{t('showtimes')}</h2>
                  <div className="flex flex-wrap gap-3">
                    {movie.showtimes.map(showtime => (
                      <motion.div
                        key={showtime.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white transition-all">
                          <Link to={`/booking/${movie.id}/${showtime.id}`}>
                            {showtime.time} <span className="ml-1.5 text-xs opacity-80">({showtime.screenType})</span>
                            <Ticket size={16} className="ml-2"/>
                          </Link>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              {movie.status === 'upcoming' && (
                 <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center"
                >
                  <p className="text-blue-300 font-semibold">{t('upcomingMovies')} - {t('releaseDate')}: {new Date(movie.releaseDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="text-sm text-gray-400 mt-1">Check back soon for showtimes and booking!</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      );
    };

    export default MovieDetailsPage;