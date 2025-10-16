/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('swipes').del()
  await knex('swipes').insert([
    // Sarah's swipes
    { id: 1, user_id: 1, movie_id: 1, liked: true },
    { id: 2, user_id: 1, movie_id: 2, liked: true },
    { id: 3, user_id: 1, movie_id: 3, liked: true },
    { id: 4, user_id: 1, movie_id: 4, liked: false },
    { id: 5, user_id: 1, movie_id: 6, liked: true },
    { id: 6, user_id: 1, movie_id: 8, liked: false },
    // John's swipes
    { id: 7, user_id: 2, movie_id: 1, liked: false },
    { id: 8, user_id: 2, movie_id: 2, liked: true },
    { id: 9, user_id: 2, movie_id: 3, liked: true },
    { id: 10, user_id: 2, movie_id: 4, liked: true },
    { id: 11, user_id: 2, movie_id: 6, liked: true },
    { id: 12, user_id: 2, movie_id: 7, liked: true },
    // Emma's swipes
    { id: 13, user_id: 3, movie_id: 1, liked: true },
    { id: 14, user_id: 3, movie_id: 5, liked: true },
    { id: 15, user_id: 3, movie_id: 6, liked: true },
    { id: 16, user_id: 3, movie_id: 8, liked: true },
    { id: 17, user_id: 3, movie_id: 9, liked: false },
    // Mike's swipes
    { id: 18, user_id: 4, movie_id: 1, liked: true },
    { id: 19, user_id: 4, movie_id: 5, liked: false },
    { id: 20, user_id: 4, movie_id: 6, liked: true },
    { id: 21, user_id: 4, movie_id: 8, liked: true },
    { id: 22, user_id: 4, movie_id: 10, liked: true },
    // Lisa's swipes
    { id: 23, user_id: 5, movie_id: 2, liked: true },
    { id: 24, user_id: 5, movie_id: 3, liked: true },
    { id: 25, user_id: 5, movie_id: 7, liked: true },
    { id: 26, user_id: 5, movie_id: 9, liked: true },
    // Alex's swipes
    { id: 27, user_id: 6, movie_id: 2, liked: false },
    { id: 28, user_id: 6, movie_id: 3, liked: true },
    { id: 29, user_id: 6, movie_id: 7, liked: true },
    { id: 30, user_id: 6, movie_id: 9, liked: true },
  ])
}
