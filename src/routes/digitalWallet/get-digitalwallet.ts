import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";

export default async function (server: FastifyInstance) {
    // addAuthorization(server);



    /// Get all Services
    server.route({
        method: 'GET',
        url: '/DigitalWallet',
        schema: {
            summary: 'Get all Digital Wallet',
            tags: ['DigitalWallet'],
            // querystring: DigitalQuery,
            response: {
                // '2xx': Type.Array(DigitalWallet),
            }
        },
        handler: async (request, reply) => {

            return prismaClient.digitalWallet.findMany({
                // where: { featured_service:true },
            });
        },
    });

}