import { Service } from "@prisma/client";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify"
import _ from "lodash";
import { prismaClient } from "../../prisma";
import { PartialServiceWithoutId, ServiceParams, ServiceWithID } from "./index-service";
export default async function (server: FastifyInstance) {
    // addAuthorization(server);
    server.route({
        method: 'PUT',
        url: '/services',
        schema: {
            summary: 'Creates new service + all properties are required',
            tags: ['services'],
            body: ServiceWithID,
        },
        handler: async (request, reply) => {
            const service = request.body as Service;
            if (!ObjectId.isValid(service.service_id)) {
                reply.badRequest('service_id should be an ObjectId!');
            } else {
                return await prismaClient.service.upsert({
                    where: { service_id: service.service_id },
                    create: service,
                    update: _.omit(service, ['service_id']),
                });
            }
        },
    });
    server.route({
        method: 'PATCH',
        url: '/:service_id',
        schema: {
            summary: 'Update a Service by id + you dont need to pass all properties',
            tags: ['services'],
            body: PartialServiceWithoutId,
            params: ServiceParams,
        },
        handler: async (request, reply) => {
            const { service_id } = request.params as any;
            if (!ObjectId.isValid(service_id)) {
                reply.badRequest('Service_id should be an ObjectId!');
                return;
            }
            const service = request.body as Service;
            return prismaClient.service.update({
                where: { service_id },
                data: service,
            });
        },
    });
}