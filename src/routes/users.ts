import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { createUserRegester } from "../controllers/users";
import { server } from "../server";

const User = Type.Object({
    id: Type.String({ format: 'uuid' }),
    user_name: Type.String(),
    email: Type.String(),
    password: Type.String(),

});

type User = Static<typeof User>;

const GeUsersQuery = Type.Object({
    user_name: Type.Optional(Type.String()),
});
type GeUsersQuery = Static<typeof GeUsersQuery>;

export let users: User[] = [
    { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', user_name: 'Essa', email: 'esa@gmail.com', password: '1234' },
    { id: '3fa85f64-5717-4562-b3fc-2c963f66afa2', user_name: 'Ali', email: 'saad@gmail.com', password: '1122' }
];

export default async function (server: FastifyInstance) {
    server.route({
        method: 'PUT',
        url: '/user/register',
        schema: {
            summary: 'The User register',
            tags: ['Users'],
            body: User,
        },
        handler: async (request, reply) => {
            const newUser: any = request.body;
            return createUserRegester(users, newUser);
        },
    });

    server.route({
        method: 'PATCH',
        url: '/user/:id',
        schema: {
            summary: 'Update user by Id',
            tags: ['Users'],
            body: User,
        },
        handler: async (request, reply) => {
            const newUser: any = request.body;
            return createUserRegester(users, newUser);
        },
    });


server.route({
    method: 'DELETE',
    url: '/users/:id',
    schema: {
        summary: 'Deletes a user',
        tags: ['Users'],
        params: Type.Object({
            id: Type.String({ format: 'uuid' }),
        }),
    },

    handler: async (request: { params: any; }, reply: any) => {
        const id = (request.params as any).id as string;

        users = users.filter((c) => c.id !== id);

        return users;
    },
});

// server.route({
//     method: 'GET',
//     url: '/user/:id',
//     schema: {
//         summary: 'Returns one user or null',
//         tags: ['Users'],
//         params: Type.Object({
//             id: Type.String({ format: 'uuid' }),
//         }),
//         response: {
//             '2xx': Type.Union([User, Type.Null()]),
//         },
//     },
//     handler: async (request, reply) => {
//         const id = (request.params as any).id as string;

//         return users.find((c) => c.id === id) ?? null;
//     },
// });

// server.route({
//     method: 'GET',
//     url: '/users',
//     schema: {
//         summary: 'Gets all users',
//         tags: ['Users'],
//         querystring: GeUsersQuery,
//         response: {
//             '2xx': Type.Array(User),
//         },
//     },
//     handler: async (request, reply) => {
//         const query = request.query as GeUsersQuery;

//         if (query.user_name) {
//             return users.filter((c: { user_name: string | string[]; }) => c.user_name.includes(query.user_name ?? ''));
//         } else {
//             return users;
//         }
//     },
// });
server.route({
    method: 'GET',
    url: '/user/:id',
    schema: {
        summary: 'Returns one user or null',
        tags: ['Users'],
        params: Type.Object({
            id: Type.String({ format: 'uuid' }),
        }),
        response: {
            '2xx': Type.Union([User, Type.Null()]),
        },
    },
    handler: async (request, reply) => {
        const id = (request.params as any).id as string;

        return users.find((c) => c.id === id) ?? null;
    },
});


server.route({
    method: 'GET',
    url: '/usersshow',
    schema: {
        summary: 'Gets all users',
        tags: ['Users'],
        querystring: GeUsersQuery,
        response: {
            '2xx': Type.Array(User),
        },
    },
    handler: async (request, reply) => {
        const query = request.query as GeUsersQuery;

        if (query.user_name) {
            return users.filter((c) => c.user_name.includes(query.user_name ?? ''));
        } else {
            return users;
        }
    },
});

}