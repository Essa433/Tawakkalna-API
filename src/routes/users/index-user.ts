import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import _ from 'lodash';
export const UserWithId = Type.Object({
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
	marital_status: Type.String(),
	gender: Type.String(),
	photo: Type.String(),

	services: Type.Array(Type.Object({
		service_title: Type.String(),
		service_type: Type.String(),
		aftar: Type.String()
	}), { default: [] }),

	datapanel: Type.Array(Type.Object({
		Data_title: Type.String(),
		DataPanel_type: Type.String(),
		aftar: Type.String()
	}), { default: [] }),
});
export const UserWithoutId = Type.Object({
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
	marital_status: Type.String(),
	gender: Type.String(),
	photo: Type.String(),
	services: Type.Array(Type.Object({
		service_title: Type.String(),
		service_type: Type.String(),
		aftar: Type.String()
	}), { default: [] }),
	datapanel: Type.Array(Type.Object({
		Data_title: Type.String(),
		DataPanel_type: Type.String(),
		aftar: Type.String()
	}), { default: [] }),
});
type UserWithoutId = Static<typeof UserWithoutId>;
export const PartialUserWithoutId = Type.Partial(UserWithoutId);
type PartialUserWithoutId = Static<typeof PartialUserWithoutId>;
export const GetUsersQuery = Type.Object({
	text: Type.Optional(Type.String()),
});
type GetUsersQuery = Static<typeof GetUsersQuery>;
export const UserParams = Type.Object({
	user_id: Type.String(),
});
type UserParams = Static<typeof UserParams>;
export const UserQuery = Type.Object({
	user_id: Type.Optional(Type.String()),
});
type UserQuery = Static<typeof UserQuery>;

export default async function (server: FastifyInstance) {
	// addAuthorization(server);
}

