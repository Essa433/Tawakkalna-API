import { User } from "@prisma/client";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { PartialUserWithoutId, UserParams } from "./index-user";

export default async function (server: FastifyInstance) {
    // addAuthorization(server);


    /// Update one by id
    server.route({
        method: 'PATCH',
        url: '/:user_id',
        schema: {
            summary: 'Update a User by id + you dont need to pass all properties',
            tags: ['users'],
            body: PartialUserWithoutId,
            params: UserParams,
        },
        handler: async (request: any, reply: any) => {
            const { user_id } = request.params as User;
            if (!ObjectId.isValid(user_id)) {
                reply.badRequest('user_id should be an ObjectId!');
                return;
            }

            const user = request.body as any;

            return prismaClient.user.update({
                where: { user_id },
                data: user,
            });
        },
    });
}