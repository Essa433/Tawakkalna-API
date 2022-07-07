import { User } from "@prisma/client";
import { Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import Fuse from "fuse.js";
import { prismaClient } from "../../prisma";
import { GetUsersQuery, UserQuery, UserWithId } from "./index-user";
export default async function (server: FastifyInstance) {
    // addAuthorization(server);
    server.route({
        method: 'GET',
        url: '/users',
        schema: {
            summary: 'Get all users',
            tags: ['users'],
            querystring: UserQuery,
            response: {
                // '2xx': Type.Array(User),
            }
        },
        handler: async (request, reply) => {
            return prismaClient.user.findMany({
            });
        },
    });
    server.route({
        method: 'GET',
        url: '/',
        schema: {
            summary: 'Gets all users',
            tags: ['users'],
            querystring: GetUsersQuery,
            response: {
                '2xx': Type.Array(UserWithId),
            },
        },
        handler: async (request, reply) => {
            const query = request.query as any;
            const contacts = await prismaClient.user.findMany();
            if (!query.text) return contacts;
            const fuse = new Fuse(contacts, {
                includeScore: true,
                isCaseSensitive: false,
                includeMatches: true,
                findAllMatches: true,
                threshold: 1,
                keys: ['name'],
            });
            console.log(JSON.stringify(fuse.search(query.text)));
            const result: User[] = fuse.search(query.text).map((r) => r.item);
            return result;
        },
    });
}
