import { Static, Type } from "@sinclair/typebox";
import { profile } from "console";
import { FastifyInstance } from "fastify";
import { request } from "http";
import { url } from "inspector";
import { createProfileController } from "../controllers/profiles";
import { createNewServices } from '../controllers/Services';

import { server } from "../server";


const Profile = Type.Object({
    id: Type.String({ format: 'uuid' }),
    name: Type.String(),
    phone: Type.String(),
});
type Profile = Static<typeof Profile>;

const GeprofilesQuery = Type.Object({
    name: Type.Optional(Type.String()),
});
type GeprofilesQuery = Static<typeof GeprofilesQuery>;

export let profiles: Profile[] = [
    { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'Essa', phone: '0511111111' },
    { id: '3fa85f64-5717-4562-b3fc-2c963f66afa5', name: 'Lamis', phone: '0511111111' },
    { id: '3fa85f64-5717-4562-b3fc-2c963f66afa2', name: 'Amani', phone: '0511111111' },

];



export default async function (server: FastifyInstance) {

    server.route({
        method: 'GET',
        url: '/homepage/profiles/:id',
        schema: {
            summary: 'Returns one profile by id in homepage or null',
            tags: ['Homepage'],
            params: Type.Object({
                id: Type.String({ format: 'uuid' }),
            }),
            response: {
                '2xx': Type.Union([Profile, Type.Null()]),
            },
        },
        handler: async (request, reply) => {
            const id = (request.params as any).id as string;

            return profiles.find((c) => c.id === id) ?? null;
        },
    });


}

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


    server.route({
        method: 'GET',
        url: '/service/inHomepage/:id',
        schema: {
            summary: 'Returns one services in home page by id or null',
            tags: ['Homepage'],
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
        url: '/allservices/inHomepage',
        schema: {
            summary: 'Gets all services in homepage',
            tags: ['Homepage'],
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


