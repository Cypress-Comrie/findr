/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('relationships', (table) => {
    table.increments('id').primary() // Changed to auto-increment integer
    table.integer('user1_id').notNullable() // Changed from user_id1 to user1_id
    table.integer('user2_id').notNullable() // Changed from user_id2 to user2_id
    table.foreign('user1_id').references('users.id')
    table.foreign('user2_id').references('users.id')
    table.string('paring_code').notNullable().unique() // Fixed typo: paring → pairing
    table.string('status').defaultTo('pending') // Added status
    table.timestamp('created_at').defaultTo(knex.fn.now()) // Added timestamp
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('relationships')
}
