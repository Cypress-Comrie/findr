/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('swipes', (table) => {
    table.increments('id').primary()
    table.integer('movie_id').notNullable()
    table.integer('user_id').notNullable()
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
