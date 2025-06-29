import React from 'react';
    
    export const movies = [
      {
        id: 'movie-1',
        titleKey: 'movie1Title', defaultTitle: 'Echoes of Tomorrow',
        genreKey: 'genreSciFi', defaultGenre: 'Sci-Fi, Action',
        rating: 4.5,
        ageRating: 'PG-13',
        duration: '2h 15m',
        directorKey: 'director1Name', defaultDirector: 'Jane Director',
        castKeys: ['actorA', 'actorB'], defaultCast: ['Actor A', 'Actor B'],
        synopsisKey: 'movie1Synopsis', defaultSynopsis: 'In a future where time travel is possible, a historian must prevent a catastrophic event that threatens to erase history itself. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        imageText: 'Futuristic cityscape with flying vehicles for Echoes of Tomorrow movie poster',
        releaseDate: '2025-06-20', 
        showtimes: [
          { id: 'st1-1', time: '14:00', screenType: 'Standard' },
          { id: 'st1-2', time: '17:30', screenType: 'IMAX' },
          { id: 'st1-3', time: '21:00', screenType: 'Standard' },
        ],
        status: 'showing' 
      },
      {
        id: 'movie-2',
        titleKey: 'movie2Title', defaultTitle: 'The Last Adventure',
        genreKey: 'genreAdventure', defaultGenre: 'Adventure, Fantasy',
        rating: 4.2,
        ageRating: 'PG',
        duration: '1h 55m',
        directorKey: 'director2Name', defaultDirector: 'John Smith',
        castKeys: ['actorC', 'actorD'], defaultCast: ['Actor C', 'Actor D'],
        synopsisKey: 'movie2Synopsis', defaultSynopsis: 'A group of unlikely heroes embarks on a perilous journey to find a mythical artifact before it falls into the wrong hands. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
        imageText: 'Fantasy landscape with adventurers for The Last Adventure movie poster',
        releaseDate: '2025-07-10',
        showtimes: [
          { id: 'st2-1', time: '13:00', screenType: 'Standard' },
          { id: 'st2-2', time: '16:00', screenType: '3D' },
          { id: 'st2-3', time: '19:30', screenType: 'Standard' },
        ],
        status: 'showing'
      },
      {
        id: 'movie-3',
        titleKey: 'movie3Title', defaultTitle: 'Cybernetic Dreams',
        genreKey: 'genreThriller', defaultGenre: 'Thriller, Mystery',
        rating: 4.8,
        ageRating: 'R',
        duration: '2h 05m',
        directorKey: 'director3Name', defaultDirector: 'Alice Wonderland',
        castKeys: ['actorE', 'actorF'], defaultCast: ['Actor E', 'Actor F'],
        synopsisKey: 'movie3Synopsis', defaultSynopsis: 'A detective investigates a series of strange occurrences linked to a new virtual reality technology that blurs the line between dreams and reality. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.',
        imageText: 'Dark, neon-lit alleyway for Cybernetic Dreams movie poster',
        releaseDate: '2025-08-15',
        showtimes: [],
        status: 'upcoming'
      },
       {
        id: 'movie-4',
        titleKey: 'movie4Title', defaultTitle: 'Guardians of the Galaxy Vol. 3',
        genreKey: 'genreActionComedy', defaultGenre: 'Action, Comedy, Sci-Fi',
        rating: 4.9,
        ageRating: 'PG-13',
        duration: '2h 29m',
        directorKey: 'directorJamesGunn', defaultDirector: 'James Gunn',
        castKeys: ['chrisPratt', 'zoeSaldana', 'daveBautista'], defaultCast: ['Chris Pratt', 'Zoe Saldaña', 'Dave Bautista'],
        synopsisKey: 'movie4Synopsis', defaultSynopsis: 'Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own - a mission that could mean the end of the Guardians if not successful.',
        imageText: 'Guardians of the Galaxy team posing in space for movie poster',
        releaseDate: '2023-05-05',
        showtimes: [
          { id: 'st4-1', time: '12:00', screenType: 'IMAX' },
          { id: 'st4-2', time: '15:30', screenType: 'Standard' },
          { id: 'st4-3', time: '19:00', screenType: '3D' },
        ],
        status: 'showing'
      },
    ];

    export const getMovieById = (id) => movies.find(movie => movie.id === id);