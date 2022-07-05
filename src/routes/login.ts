import bcrypt from "bcryptjs";
import { Static, Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import fastify, { FastifyInstance } from 'fastify';
import { prismaClient } from '../prisma';
import { userInfo } from 'os';
import { server } from '../server';

const LoginBody = Type.Object({
	nationalId: Type.String(), //({ format: 'email' }),
	password: Type.String(),
});
type LoginBody = Static<typeof LoginBody>;


// const passwordHash = await bcrypt.hash(user.password, 10);


export default async function (server: FastifyInstance) {
	server.route({
		method: 'POST',
		url: '/login',
		schema: {
			summary: 'Login a user and returns a token',
			body: LoginBody,
		},
		handler: async (request, reply) => {
			const { nationalId, password } = request.body as LoginBody;


			const user = await prismaClient.user.findUnique({
				where: {
					nationalId: nationalId,
				},
			})
			if (!user) return reply.badRequest("You Need To Regiester")

			const checkPassword = bcrypt.compareSync(password, user.password)
			if (!checkPassword) return reply.unauthorized('National id or password not valid')
			// delete user.password



			const token = server.jwt.sign({ nationalId, role: user.role })
			reply.send({ token, role: user.role })


		},
	});
}
