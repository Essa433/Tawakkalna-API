import { Static, Type } from "@sinclair/typebox";
import { profile } from "console";
import { FastifyInstance } from "fastify";
import { request } from "http";
import { url } from "inspector";
import { createProfileController } from "../controllers/profiles";
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
        method: 'PUT',
        url: '/profiles',
        schema: {
            summary: 'Creates new profile + all properties are required',
            tags: ['Profiles'],
            body: Profile,
        },
        handler: async (request, reply) => {
            const newProfile: any = request.body;
            return createProfileController(profiles, newProfile);
        },
    });



    server.route({
        method: 'PATCH',
        url: '/profiles/:id',
        schema: {
            summary: 'Update a profile by id + you dont need to pass all properties',
            tags: ['Profiles'],
            body: Type.Partial(Profile),
            params: Type.Object({
                id: Type.String({ format: 'uuid' }),
            }),
        },
        handler: async (request, reply) => {
            const newProfile: any = request.body;
            return createProfileController(profiles, profile);
        },
    });

    server.route({
        method: 'DELETE',
        url: '/profiles/:id',
        schema: {
            summary: 'Deletes a profile',
            tags: ['Profiles'],
            params: Type.Object({
                id: Type.String({ format: 'uuid' }),
            }),
        },
        handler: async (request, reply) => {
            const id = (request.params as any).id as string;

            profiles = profiles.filter((c) => c.id !== id);

            return profile;
        },
    });


    server.route({
        method: 'GET',
        url: '/profiles/:id',
        schema: {
            summary: 'Returns one profile or null',
            tags: ['Profiles'],
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

    server.route({
        method: 'GET',
        url: '/profiles',
        schema: {
            summary: 'Gets all contacts',
            tags: ['Profiles'],
            querystring: GeprofilesQuery,
            response: {
                '2xx': Type.Array(Profile),
            },
        },
        handler: async (request, reply) => {
            const query = request.query as GeprofilesQuery;

            if (query.name) {
                return profiles.filter((c: { name: string | string[]; }) => c.name.includes(query.name ?? ''));
            } else {
                return profiles;
            }
        },
    });
}