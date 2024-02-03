import knex from "knex";
import knexConfig from "./knexfile";

const db = knex(knexConfig.development);
console.log("Database connected");

export default db;
