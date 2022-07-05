import bcrypt from "bcryptjs";
import { User } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { FastifyInstance } from 'fastify';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { Console } from "console";

const User = Type.Object({
	user_id: Type.String(),
	email: Type.String(),
	name: Type.String(),
	age: Type.String(),
	role: Type.String(),
	nationalId: Type.String(),
	password: Type.String(),
	date_birth: Type.String(),
	phoneNumber: Type.String(),
	place_birth: Type.String(),
	nationality: Type.String(),
	blood_type: Type.String(),
	marital_status: Type.Boolean(),
	gender: Type.Boolean(),
	photo: Type.String(),

	services: Type.Object({
		service_title: Type.String(),
		service_type: Type.String(),
		aftar: Type.String()
	}),

	datapanel: Type.Object({
		Data_title: Type.String(),
		DataPanel_type: Type.String(),
		aftar: Type.String()
	})

});


const UserWithoutId = Type.Object({
	email: Type.String(),
	name: Type.String(),
	age: Type.String(),
	role: Type.String(),
	nationalId: Type.String(),
	date_birth: Type.String(),
	phoneNumber: Type.String(),
	place_birth: Type.String(),
	nationality: Type.String(),
	password: Type.String(),
	blood_type: Type.String(),
	marital_status: Type.Boolean(),
	gender: Type.Boolean(),
	photo: Type.String(),

	services: Type.Object({
		service_title: Type.String(),
		service_type: Type.String(),
		aftar: Type.String()
	}),

	datapanel: Type.Object({
		Data_title: Type.String(),
		DataPanel_type: Type.String(),
		aftar: Type.String()
	})
});
type UserWithoutId = Static<typeof UserWithoutId>;

const PartialUserWithoutId = Type.Partial(UserWithoutId);
type PartialUserWithoutId = Static<typeof PartialUserWithoutId>;

const GetUsersQuery = Type.Object({
	text: Type.Optional(Type.String()),
});
type GetUsersQuery = Static<typeof GetUsersQuery>;

const UserParams = Type.Object({
	user_id: Type.String(),
});
type UserParams = Static<typeof UserParams>;


const UserQuery = Type.Object({
	user_id: Type.Optional(Type.String()),
});
type UserQuery = Static<typeof UserQuery>;




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
			body: User,
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
		handler: async (request, reply) => {
			const { user_id } = request.params as UserParams;
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
			const { user_id } = request.params as UserParams;
			if (!ObjectId.isValid(user_id)) {
				reply.badRequest('user_id should be an ObjectId!');
				return;
			}

			return prismaClient.user.delete({
				where: { user_id },
			});
		},
	});

	/// Get one by id
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
			// const {  } = request.query as UserQuery;
			// if (!ObjectId.isValid(user_id)) {
			// 	reply.badRequest('user_id should be an ObjectId!');
			// 	return;
			// }

			return prismaClient.user.findMany({
			});
		},
	});

	/// Get all contacts or search by name
	server.route({
		method: 'GET',
		url: '/',
		schema: {
			summary: 'Gets all users',
			tags: ['users'],
			querystring: GetUsersQuery,
			response: {
				'2xx': Type.Array(User),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetUsersQuery;

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























// import { FastifyInstance } from "fastify";

// export default async function (server: FastifyInstance) {


// }

// import {  addNewUser } from "../../controllers/users";
// export const routes = [
// //     {
// //     method: 'GET',
// //     url: '/api/Users',
// //     handler: getAllUsers
// // },
// // {
// //     method: 'GET',
// //     url: '/api/User/:id',
// //     handler: getSingleUser
// // },
// {
//     method: 'POST',
//     url: '/api/User',
//     Tag: ['User'],
//     handler: addNewUser,
// },

// // {
// //     method: 'PUT',
// //     url: '/api/User/:id',
// //     handler: updateUser
// // },
// // {
// //     method: 'DELETE',
// //     url: '/api/User/:id',
// //     handler: deleteUser
// // }
// ]


// // // module.exports = routes