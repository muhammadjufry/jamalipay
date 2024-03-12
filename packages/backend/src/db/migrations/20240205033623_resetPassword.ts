import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("reset-password", (table) => {
    table.increments("id");
    table.string("email").notNullable().unique();
    table.string("token").notNullable().unique();
    table.string("expires").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("reset-password");
}
