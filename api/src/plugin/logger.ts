import { FastifyInstance, FastifyLoggerOptions } from "fastify";
import fp from "fastify-plugin";
import DotEnv from "dotenv";
DotEnv.config();

class Logger {
  private static localDriver = "local";

  public static async init(fastify: FastifyInstance): Promise<void> {
    fastify.addHook("onRequest", async (req) => {
      try {
        req.log = req.log.child({});
      } catch (e: unknown) {
        req.log.error(`Unable to initialize child logger, using default: ${e}`);
      }
    });
  }

  public static get(): FastifyLoggerOptions {
    // This is called when we create the fastify instance, so env pluggin is not yet available.
    const level = process.env.LOG_LEVEL;
    const driver = process.env.LOG_DRIVER;
    switch (driver) {
      case Logger.localDriver:
        return {
          level, //"info", "warn", "error", "fatal", "trace", "debug"
        };

      default:
        throw new Error(
          `Unknown driver: ${driver}: Must be set in LOG_DRIVER env var and one of ${Logger.localDriver}`
        );
    }
  }
}

export const CustomLogger = Logger.get();
export const LoggerPlugin = fp(Logger.init, { name: "logger" });
