/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('relationships').del()
  await knex('relationships').insert([
    { id: 1, user1_id: 1, user2_id: 2, paring_code: 'MOVIE2024' },
    { id: 2, user1_id: 3, user2_id: 4, paring_code: 'FLIX789' },
    { id: 3, user1_id: 5, user2_id: 6, paring_code: 'WATCH456' },
  ])
}
