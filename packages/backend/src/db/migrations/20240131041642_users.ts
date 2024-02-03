import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.string("username");
    table.string("email").notNullable();
    table.string("password");
    table.string("provider").notNullable();
    table.boolean("verified").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
