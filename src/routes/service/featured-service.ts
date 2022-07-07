import { Service } from "@prisma/client";
import { Type } from "@sinclair/typebox";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import _ from "lodash";
import { prismaClient } from "../../prisma";
import { ServiceWithID, UserQuery } from "./index-service";
export default async function (server: FastifyInstance) {
    // addAuthorization(server);
    // Upsert one but all The most prominent services
    server.route({
        method: 'PUT',
        url: '/featuredService',
        schema: {
            summary: 'Creates new featured services + all properties are required',
            tags: ['featuredService'],
            body: ServiceWithID,
        },
        handler: async (request: any, reply: any) => {
            const service = request.body as Service;
            if (!ObjectId.isValid(service.service_id)) {
                reply.badRequest('serv should be an ObjectId!');
            } else {
                return await prismaClient.service.upsert({
                    where: { service_id: service.service_id },
                    create: service,
                    update: _.omit(service, ['service_id']),
                });
            }
        },
    });
    // /// Get Featured Service in homepage
    server.route({
        method: 'GET',
        url: '/featuredService',
        schema: {
            summary: 'Get all featured services',
            tags: ['featuredService'],
            querystring: UserQuery,
            response: {
                '2xx': Type.Array(ServiceWithID),
            }
        },
        handler: async (request, reply) => {
            return prismaClient.service.findMany({
                where: { featured_service: true },
            });
        },
    });

}