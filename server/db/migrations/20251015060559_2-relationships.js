/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.table('relationships', (table) => {
    table.string('id').primary()
    table.string('user_id1')
    table.string('user_id2')
    table.foreign('user_id1').references('users.id')
    table.foreign('user_id2').references('users.id')
    table.string('paring_code').unique()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('relationships')
}
