/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.table('swipes', (table) => {
    table.string('id').primary()
    table.string('movie_id')
    table.string('user_id')
    table.boolean('liked')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('swipes')
}
