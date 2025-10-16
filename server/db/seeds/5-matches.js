/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('matches').del()
  await knex('matches').insert([
    // Sarah & John matches
    { id: 1, relationship_id: 1, movie_id: 2, watched: true },
    { id: 2, relationship_id: 1, movie_id: 3, watched: false },
    { id: 3, relationship_id: 1, movie_id: 6, watched: false },
    // Emma & Mike matches
    { id: 4, relationship_id: 2, movie_id: 1, watched: true },
    { id: 5, relationship_id: 2, movie_id: 6, watched: false },
    { id: 6, relationship_id: 2, movie_id: 8, watched: true },
    // Lisa & Alex matches
    { id: 7, relationship_id: 3, movie_id: 3, watched: false },
    { id: 8, relationship_id: 3, movie_id: 7, watched: true },
    { id: 9, relationship_id: 3, movie_id: 9, watched: false },
  ])
}
