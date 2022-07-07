import { Service } from "@prisma/client";
import { Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import Fuse from "fuse.js";
import { prismaClient } from "../../prisma";
import { GetServiceQuery, ServiceWithID, UserQuery } from "./index-service";
export default async function (server: FastifyInstance) {
    // addAuthorization(server);
    server.route({
        method: 'GET',
        url: '/allservices',
        schema: {
            summary: 'Get all Services',
            tags: ['services'],
            querystring: UserQuery,
            response: {
                '2xx': Type.Array(ServiceWithID),
            }
        },
        handler: async (request, reply) => {
            return prismaClient.service.findMany({
            });
        },
    });
    /// Get all contacts or search by name
    server.route({
        method: 'GET',
        url: '/services',
        schema: {
            summary: 'Gets all services by search for service',
            tags: ['services'],
            querystring: GetServiceQuery,
            response: {
                '2xx': Type.Array(ServiceWithID),
            },
        },
        handler: async (request, reply) => {
            const query = request.query as any;
            const services = await prismaClient.service.findMany();
            if (!query.text) return services;
            const fuse = new Fuse(services, {
                includeScore: true,
                isCaseSensitive: false,
                includeMatches: true,
                findAllMatches: false,
                threshold: 1,
                keys: ['service_title'],
            });

            console.log(JSON.stringify(fuse.search(query.text)));

            const result: Service[] = fuse.search(query.text).map((r) => r.item);
            return result;
        },
    });

}