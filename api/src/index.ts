import Fastify, { FastifyInstance } from "fastify";
import FastifyCors from "@fastify/cors";
import {
  CustomLogger,
  LoggerPlugin,
  ConfigPlugin,
  MikroPlugin,
} from "./plugin";
import { StatusRouter } from "./services";

async function server() {
  const fastify: FastifyInstance = Fastify({
    logger: CustomLogger,
  });

  // Register plugins
  fastify.register(FastifyCors, {
    origin: process.env.ORIGIN,
  });
  fastify.register(ConfigPlugin);
  fastify.register(LoggerPlugin);
  // fastify.register(MikroPlugin);

  // Register routes
  fastify.register(StatusRouter);

  try {
    await fastify.ready();
  } catch (e) {
    fastify.log.fatal(`Unable to initialize plugins due to ${e}`);
    process.exit(1);
  }

  fastify.listen(
    {
      port: fastify.config.port,
      host: "0.0.0.0",
    },
    (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    }
  );
}

server();
