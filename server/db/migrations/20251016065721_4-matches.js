/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('matches', (table) => {
    table.string('id').primary()
    table.string('relationship_id')
    table.string('movie_id')
    table.boolean('watched').defaultTo('false')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('matches')
}
