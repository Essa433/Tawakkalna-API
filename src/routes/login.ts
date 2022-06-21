import { FastifyInstance } from "fastify";
import { request } from "http";

export default async function (server: FastifyInstance ) {

    server.get('login', async (request, reply) => {});
    
}
