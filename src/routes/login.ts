import { FastifyInstance } from 'fastify';
import { METHODS } from 'http';

export default async function (server: FastifyInstance) {


    server.route({
        method: 'GET',
        url: '/login',
        schema: {
            summary: 'GET login to the system',
            tags: ['Login'],
        },
        handler: async (request, reply) => {
            return 'hi';

        },
    });

    server.route({
        method: 'GET',
        url: '/verify',
        schema: {
            summary: 'GET verify please to have Auth',
            tags: ['Login'],
        },
        handler: async (request, reply) => {
            return 'You are Authintcat';

        },
    });

}
