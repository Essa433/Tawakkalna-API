import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { ServiceWithoutId } from "./index-service";

export default async function (server: FastifyInstance) {
    // addAuthorization(server);


    server.route({
        method: 'POST',
        url: '/services',
        schema: {
            summary: 'Creates new Service',
            tags: ['services'],
            body: ServiceWithoutId,
        },
        handler: async (request, reply) => {
            const service = request.body as any;
            return await prismaClient.service.create({
                data: service,

            });
        },
    });
}