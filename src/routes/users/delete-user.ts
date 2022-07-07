import { User } from "@prisma/client";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { UserParams } from "./index-user";

export default async function (server: FastifyInstance) {
	// addAuthorization(server);


	/// Delete one by id
	server.route({
		method: 'DELETE',
		url: '/:user_id',
		schema: {
			summary: 'Deletes a user',
			tags: ['users'],
			params: UserParams,
		},
		handler: async (request, reply) => {
			const { user_id } = request.params as User;
			if (!ObjectId.isValid(user_id)) {
				reply.badRequest('user_id should be an ObjectId!');
				return;
			}

			return prismaClient.user.delete({
				where: { user_id },
			});
		},
	});
}