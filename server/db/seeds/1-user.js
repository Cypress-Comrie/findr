/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      username: 'sarah_m',
      email: 'sarah.martinez@email.com',
      full_name: 'Sarah Martinez',
    },
    {
      id: 2,
      username: 'john_d',
      email: 'john.davis@email.com',
      full_name: 'John Davis',
    },
    {
      id: 3,
      username: 'emma_w',
      email: 'emma.wilson@email.com',
      full_name: 'Emma Wilson',
    },
    {
      id: 4,
      username: 'mike_j',
      email: 'mike.johnson@email.com',
      full_name: 'Mike Johnson',
    },
    {
      id: 5,
      username: 'lisa_t',
      email: 'lisa.thompson@email.com',
      full_name: 'Lisa Thompson',
    },
    {
      id: 6,
      username: 'alex_r',
      email: 'alex.rodriguez@email.com',
      full_name: 'Alex Rodriguez',
    },
  ])
}
