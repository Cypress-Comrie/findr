/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.table('movies', (table) => {
    table.string('id').primary()
    table.string('imdb_id').unique()
    table.string('title')
    table.string('year')
    table.string('poster')
    table.string('genre')
    table.string('description')
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
