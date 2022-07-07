import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import _ from "lodash";
import { prismaClient } from "../../prisma";
import { UserWithId, UserWithoutId } from "./index-user";

export default async function (server: FastifyInstance) {
    // addAuthorization(server);

    /// Create contact without the need for contact_id
    server.route({
        method: 'POST',
        url: '/users',
        schema: {
            summary: 'Creates new user',
            tags: ['users'],
            body: UserWithoutId,
        },
        handler: async (request, reply) => {
            const user = request.body as any;
            user.password = bcrypt.hashSync(user.password, 8);
            return await prismaClient.user.create({
                data: user,

            });
        },
    });
    /// Upsert one but all fields are required
    server.route({
        method: 'PUT',
        url: '/',
        schema: {
            summary: 'Creates new user + all properties are required',
            tags: ['users'],
            body: UserWithId,
        },
        handler: async (request, reply) => {
            const user = request.body as User;
            if (!ObjectId.isValid(user.user_id)) {
                reply.badRequest('user_id should be an ObjectId!');
            } else {
                return await prismaClient.user.upsert({
                    where: { user_id: user.user_id },
                    create: user,
                    update: _.omit(user, ['user_id']),
                });
            }
        },
    });
}