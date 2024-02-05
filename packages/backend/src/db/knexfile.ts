import type { Knex } from "knex";
console.log(process.env.DATABASE_URL);
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection:
      "postgresql://sayyidmuhammada:Eu5jsPMWkSZ7@ep-super-queen-a1kn41xr.ap-southeast-1.aws.neon.tech/jamali_pay?sslmode=require",
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

export default config;
