import { Options } from "@mikro-orm/core";
import type { MongoDriver } from "@mikro-orm/mongodb";

const config: Options<MongoDriver> = {
  entities: ["*/services/**/entity.js"],
  type: "mongo",
  debug: true,
  clientUrl: process.env.MONGO_CLIENT_URL,
  dbName: process.env.MONGO_DB_NAME,
  tsNode: true,
};

if (process.env.MIKRO_CONFIG_ENTITIES_TS === "true") {
  config.entitiesTs = ["*/services/**/entity.ts"];
}

export default config;
