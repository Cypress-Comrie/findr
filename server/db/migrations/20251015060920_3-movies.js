/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('movies', (table) => {
    table.increments('id').primary() // Changed from string to auto-increment
    table.integer('tmdb_id').notNullable().unique() // Changed from imdb_id to tmdb_id
    table.string('title').notNullable()
    table.integer('release_year') // Changed from 'year' string to 'release_year' integer
    table.string('poster_url') // Changed from 'poster' to 'poster_url'
    table.string('genres')
    table.text('description') // Changed to text for longer descriptions
    table.float('rating')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('movies')
}
