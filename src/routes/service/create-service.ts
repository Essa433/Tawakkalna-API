import { Service } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { FastifyInstance } from 'fastify';
import _ from 'lodash';
import Fuse from 'fuse.js';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';

const Service = Type.Object({
    service_id: Type.String(),
    service_type: Type.String(),
    service_title: Type.String(),
    aftar: Type.String(),
    featured_service: Type.String()
})

export const ServiceWithoutId = Type.Object({
    service_type: Type.String(),
    service_title: Type.String(),
    aftar: Type.String(),
    featured_service: Type.Boolean()
})

type ServiceWithoutId = Static<typeof ServiceWithoutId>;

const PartialServiceWithoutId = Type.Partial(ServiceWithoutId);
type PartialServiceWithoutId = Static<typeof PartialServiceWithoutId>;

const GetServiceQuery = Type.Object({
    text: Type.Optional(Type.String()),
});
type GetServiceQuery = Static<typeof GetServiceQuery>;

export const ServiceParams = Type.Object({
    service_id: Type.String(),
});
type ServiceParams = Static<typeof ServiceParams>;

const UserQuery = Type.Object({
    service_id: Type.Optional(Type.String()),
});
type UserQuery = Static<typeof UserQuery>;

export default async function (server: FastifyInstance) {
    // addAuthorization(server);


    /// Create contact without the need for contact_id

   
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

    // Upsert one but all The most prominent services
    server.route({
        method: 'PUT',
        url: '/featuredService',
        schema: {
            summary: 'Creates new featured services + all properties are required',
            tags: ['featuredService'],
            body: Service,
        },
        handler: async (request, reply) => {
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




    /// Upsert one but all fields are required
    // server.route({
    //     method: 'PUT',
    //     url: '/services',
    //     schema: {
    //         summary: 'Creates new service + all properties are required',
    //         tags: ['services'],
    //         body: Service,
    //     },
    //     handler: async (request, reply) => {
    //         const service = request.body as Service;
    //         if (!ObjectId.isValid(service.service_id)) {
    //             reply.badRequest('service_id should be an ObjectId!');
    //         } else {
    //             return await prismaClient.service.upsert({
    //                 where: { service_id: service.service_id },
    //                 create: service,
    //                 update: _.omit(service, ['service_id']),
    //             });
    //         }
    //     },
    // });


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
            const { service_id } = request.params as ServiceParams;
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

    /// Delete one by id
    server.route({
        method: 'DELETE',
        url: '/:service_id',
        schema: {
            summary: 'Deletes a service',
            tags: ['services'],
            params: ServiceParams,
        },
        handler: async (request, reply) => {
            const { service_id } = request.params as ServiceParams;
            if (!ObjectId.isValid(service_id)) {
                reply.badRequest('service_id should be an ObjectId!');
                return;
            }

            return prismaClient.service.delete({
                where: { service_id },
            });
        },
    });


    /// Get Featured Service in homepage
    server.route({
        method: 'GET',
        url: '/featuredService',
        schema: {
            summary: 'Get all featured services',
            tags: ['featuredService'],
            querystring: UserQuery,
            response: {
                '2xx': Type.Array(Service),
            }
        },
        handler: async (request, reply) => {

            return prismaClient.service.findMany({
                where: { featured_service: true },
            });
        },
    });

    /// Get all Services
    server.route({
        method: 'GET',
        url: '/allservices',
        schema: {
            summary: 'Get all Services',
            tags: ['services'],
            querystring: UserQuery,
            response: {
                '2xx': Type.Array(Service),
            }
        },
        handler: async (request, reply) => {

            return prismaClient.service.findMany({
                // where: { featured_service:true },
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
                '2xx': Type.Array(Service),
            },
        },
        handler: async (request, reply) => {
            const query = request.query as GetServiceQuery;

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












