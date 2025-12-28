/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('movies', (table) => {
    table.increments('id').primary()
    table.integer('tmdb_id').notNullable().unique()
    table.string('title').notNullable()
    table.string('release_date')
    table.string('poster_path')
    table.string('genres')
    table.text('overview')
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
