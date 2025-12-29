/**
 * Migration to clean up duplicates and add unique constraint to swipes table.
 * SQLite requires recreating the table to add constraints.
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .alterTable('swipes', (table) => {
      // First, remove duplicates, keeping the first occurrence
      // This is done via raw SQL since SQLite doesn't support unique constraints on existing tables easily
    })
    .then(() => {
      // Delete duplicate rows keeping only the first occurrence for each user-movie combo
      return knex.raw(`
      DELETE FROM swipes
      WHERE id NOT IN (
        SELECT MIN(id)
        FROM swipes
        GROUP BY user_id, movie_id
      )
    `)
    })
    .then(() => {
      // Recreate the swipes table with a unique constraint
      return knex.raw(`
      CREATE TABLE IF NOT EXISTS swipes_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movie_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        liked BOOLEAN,
        UNIQUE(user_id, movie_id)
      );
      
      INSERT INTO swipes_new SELECT * FROM swipes;
      DROP TABLE swipes;
      ALTER TABLE swipes_new RENAME TO swipes;
    `)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  // Rollback by recreating without the unique constraint
  return knex.raw(`
    CREATE TABLE IF NOT EXISTS swipes_new (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      movie_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      liked BOOLEAN
    );
    
    INSERT INTO swipes_new SELECT * FROM swipes;
    DROP TABLE swipes;
    ALTER TABLE swipes_new RENAME TO swipes;
  `)
}
