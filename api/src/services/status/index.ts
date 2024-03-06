import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function StatusRouter(fastify: FastifyInstance): Promise<void> {
  fastify.get(
    "/ping",
    async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      reply.send("pong");
    }
  );
}
