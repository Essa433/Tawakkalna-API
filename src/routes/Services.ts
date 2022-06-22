
import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { createNewServices } from '../controllers/Services';

const Service = Type.Object({
    id: Type.String({ format: 'uuid' }),
    Service_name: Type.String(),
    Service_type: Type.String(),
});
type Service = Static<typeof Service>;

const GetServicesQuery = Type.Object({
    Service_name: Type.Optional(Type.String()),
});
type GetServicesQuery = Static<typeof GetServicesQuery>;

export let services: Service[] = [
    { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', Service_name: 'define your phone number', Service_type: 'Puplic service' },
    { id: '3fa85f64-5717-4562-b3fc-2c963f66afa5', Service_name: 'Organ donation', Service_type: 'Health service' },
    { id: '3fa85f64-5717-4562-b3fc-2c963f66afa2', Service_name: 'Education state', Service_type: 'Education service' },

];

export default async function (server: FastifyInstance) {
    server.route({
        method: 'PUT',
        url: '/services',
        schema: {
            summary: 'Creates new servic',
            tags: ['Services'],
            body: Service,
        },
        handler: async (request, reply) => {
            const newService: any = request.body;
            return createNewServices(services, newService);
        },
    });

    server.route({
        method: 'PATCH',
        url: '/services/:id',
        schema: {
            summary: 'Update a service by id',
            tags: ['Services'],
            body: Type.Partial(Service),
            params: Type.Object({
                id: Type.String({ format: 'uuid' }),
            }),
        },
        handler: async (request, reply) => {
            const newService: any = request.body;
            return createNewServices(services, newService);
        },
    });

    server.route({
        method: 'DELETE',
        url: '/services/:id',
        schema: {
            summary: 'Deletes a service',
            tags: ['Services'],
            params: Type.Object({
                id: Type.String({ format: 'uuid' }),
            }),
        },
        handler: async (request, reply) => {
            const id = (request.params as any).id as string;

            services = services.filter((c) => c.id !== id);

            return services;
        },
    });


    server.route({
        method: 'GET',
        url: '/service/:id',
        schema: {
            summary: 'Returns one service or null',
            tags: ['Services'],
            params: Type.Object({
                id: Type.String({ format: 'uuid' }),
            }),
            response: {
                '2xx': Type.Union([Service, Type.Null()]),
            },
        },
        handler: async (request, reply) => {
            const id = (request.params as any).id as string;

            return services.find((c) => c.id === id) ?? null;
        },
    });


    server.route({
        method: 'GET',
        url: '/allservices',
        schema: {
            summary: 'Gets all services',
            tags: ['Services'],
            querystring: GetServicesQuery,
            response: {
                '2xx': Type.Array(Service),
            },
        },
        handler: async (request, reply) => {
            const query = request.query as GetServicesQuery;

            if (query.Service_name) {
                return services.filter((c) => c.Service_name.includes(query.Service_name ?? ''));
            } else {
                return services;
            }
        },
    });
}
