import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { ServiceParams } from "./index-service";

export default async function (server: FastifyInstance) {
    // addAuthorization(server);


    // /// Delete one by id
    server.route({
        method: 'DELETE',
        url: '/:service_id',
        schema: {
            summary: 'Deletes a service',
            tags: ['services'],
            params: ServiceParams,
        },
        handler: async (request, reply) => {
            const { service_id } = request.params as any;
            if (!ObjectId.isValid(service_id)) {
                reply.badRequest('service_id should be an ObjectId!');
                return;
            }

            return prismaClient.service.delete({
                where: { service_id },
            });
        },
    });

}