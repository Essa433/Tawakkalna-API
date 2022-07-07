import { DigitalWallet } from "@prisma/client";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { DigitalWalletParams, DigitalWalletWithoutId } from "./index-digitalwallet";

export default async function (server: FastifyInstance) {
    // addAuthorization(server);


/// Update one educationDecument by id
    server.route({
        method: 'PATCH',
        url: '/:DigitalWallet_id',
        schema: {
            summary: 'Update a Education Decument by id + you dont need to pass all properties',
            tags: ['DigitalWallet'],
            body: DigitalWalletWithoutId,
            params: DigitalWalletParams,
        },
        handler: async (request, reply) => {
            const { DigitalWallet_id } = request.params as any;
            if (!ObjectId.isValid(DigitalWallet_id)) {
                reply.badRequest('DigitalWallet_id should be an ObjectId!');
                return;
            }

            const digitalWallet = request.body as DigitalWallet;

            return prismaClient.digitalWallet.update({
                where: { DigitalWallet_id },
                data: digitalWallet,
            });
        },
    });

}