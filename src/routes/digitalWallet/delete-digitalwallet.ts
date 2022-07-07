import { DigitalWallet } from "@prisma/client";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { DigitalWalletParams } from "./index-digitalwallet";

export default async function (server: FastifyInstance) {
    // addAuthorization(server);


    /// Delete one by id
    server.route({
        method: 'DELETE',
        url: '/:DigitalWallet_id',
        schema: {
            summary: 'Deletes a service',
            tags: ['DigitalWallet'],
            params: DigitalWalletParams,
        },
        handler: async (request, reply) => {
            const { DigitalWallet_id } = request.params as DigitalWallet;
            if (!ObjectId.isValid(DigitalWallet_id)) {
                reply.badRequest('service_id should be an ObjectId!');
                return;
            }

            return prismaClient.digitalWallet.delete({
                where: { DigitalWallet_id },
            });
        },
    });
}

