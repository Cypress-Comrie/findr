/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {
      id: 1,
      tmdb_id: 550,
      title: 'Fight Club',
      release_year: 1999,
      genres: 'Drama, Thriller',
      poster_url:
        'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      rating: 8.4,
      description:
        'An insomniac office worker and a devil-may-care soap maker form an underground fight club.',
    },
    {
      id: 2,
      tmdb_id: 13,
      title: 'Forrest Gump',
      release_year: 1994,
      genres: 'Drama, Romance',
      poster_url:
        'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
      rating: 8.8,
      description:
        'The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man.',
    },
    {
      id: 3,
      tmdb_id: 278,
      title: 'The Shawshank Redemption',
      release_year: 1994,
      genres: 'Drama, Crime',
      poster_url:
        'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      rating: 9.3,
      description:
        'Two imprisoned men bond over a number of years, finding solace and redemption.',
    },
    {
      id: 4,
      tmdb_id: 238,
      title: 'The Godfather',
      release_year: 1972,
      genres: 'Drama, Crime',
      poster_url:
        'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      rating: 8.7,
      description:
        'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.',
    },
    {
      id: 5,
      tmdb_id: 680,
      title: 'Pulp Fiction',
      release_year: 1994,
      genres: 'Crime, Drama',
      poster_url:
        'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      rating: 8.9,
      description:
        'The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine.',
    },
    {
      id: 6,
      tmdb_id: 27205,
      title: 'Inception',
      release_year: 2010,
      genres: 'Action, Sci-Fi, Thriller',
      poster_url:
        'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      rating: 8.8,
      description:
        'A thief who steals corporate secrets through dream-sharing technology.',
    },
    {
      id: 7,
      tmdb_id: 157336,
      title: 'Interstellar',
      release_year: 2014,
      genres: 'Adventure, Drama, Sci-Fi',
      poster_url:
        'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      rating: 8.6,
      description:
        'A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival.',
    },
    {
      id: 8,
      tmdb_id: 155,
      title: 'The Dark Knight',
      release_year: 2008,
      genres: 'Action, Crime, Drama',
      poster_url:
        'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      rating: 9.0,
      description:
        'When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests.',
    },
    {
      id: 9,
      tmdb_id: 497,
      title: 'The Green Mile',
      release_year: 1999,
      genres: 'Fantasy, Drama, Crime',
      poster_url:
        'https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg',
      rating: 8.6,
      description:
        'The lives of guards on Death Row are affected by one of their charges: a man accused of murder.',
    },
    {
      id: 10,
      tmdb_id: 424,
      title: "Schindler's List",
      release_year: 1993,
      genres: 'Drama, History, War',
      poster_url:
        'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
      rating: 8.9,
      description:
        'In German-occupied Poland, industrialist Oskar Schindler becomes concerned for his Jewish workforce.',
    },
  ])
}
