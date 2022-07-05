import { User } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { FastifyInstance } from 'fastify';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';

const User = Type.Object({
    email: Type.String(),
    name: Type.String(),
    age: Type.String(),
    nationalId: Type.String(),
    date_birth: Type.String(),
    place_birth: Type.String(),
    nationality: Type.String(),
    blood_type: Type.String(),
    marital_status: Type.Boolean(),
    gender: Type.Boolean(),
    photo: Type.String(),
    user_id: Type.String(),

});


const UserWithoutId = Type.Object({
    email: Type.String(),
    name: Type.String(),
    age: Type.String(),
    nationalId: Type.String(),
    date_birth: Type.String(),
    place_birth: Type.String(),
    nationality: Type.String(),
    blood_type: Type.String(),
    marital_status: Type.Boolean(),
    gender: Type.Boolean(),
    photo: Type.String(),
});
type UserWithoutId = Static<typeof UserWithoutId>;

const PartialProfileWithoutId = Type.Partial(UserWithoutId);
type PartialProfileWithoutId = Static<typeof PartialProfileWithoutId>;

const GetProfileQuery = Type.Object({
    // text: Type.Optional(Type.String()),
});
type GetProfileQuery = Static<typeof GetProfileQuery>;

const ProfileParams = Type.Object({
    user_id: Type.String(),
});
type ProfileParams = Static<typeof ProfileParams>;


const ProfileQuery = Type.Object({
    user_id: Type.Optional(Type.String()),
});
type ProfileQuery = Static<typeof ProfileQuery>;


export default async function (server: FastifyInstance) {
    // addAuthorization(server);

    // server.route({
    //     method: 'POST',
    //     url: '/profiles',
    //     schema: {
    //         summary: 'Creates new profile',
    //         tags: ['profiles'],
    //         body: User,
    //     },

    //     handler: async (request, reply) => {
    //         const body = request.body as User
    //         const profile = await prismaClient.user.create({
    //             data: {
        //                 nationalId: body.nationalId,
        //                 name: body.name,
        //                 age: body.age,
        //                 date_birth: body.date_birth,
        //                 place_birth: body.place_birth,
        //                 nationality: body.nationality,
        //                 blood_type: body.blood_type,
        //                 gender: body.gender,
        //                 photo:body.photo,
        //                  user_id: body.user_id,
        
        //         }
        //     }
        //         )}
        //     })
    
    
    
        /// Get all contacts or search by name
        server.route({
            method: 'GET',
            url: '/profiles',
            schema: {
                summary: 'Get all profile or search by name',
                tags: ['profiles'],
                querystring: GetProfileQuery,
                response: {
                    '2xx': Type.Array(Contact),
                },
            },
            handler: async (request, reply) => {
                const query = request.query as GetContactsQuery;
    
                const contacts = await prismaClient.contact.findMany();
                if (!query.text) return contacts;
    
                const fuse = new Fuse(contacts, {
                    includeScore: true,
                    isCaseSensitive: false,
                    includeMatches: true,
                    findAllMatches: true,
                    threshold: 1,
                    keys: ['name', 'phone'],
                });
    
                console.log(JSON.stringify(fuse.search(query.text)));
    
                const result: Contact[] = fuse.search(query.text).map((r) => r.item);
                return result;
            },
        });



    }








    /// Create contact without the need for contact_id
//     server.route({
//         method: 'POST',
//         url: '/profiles',
//         schema: {
//             summary: 'Creates new profile',
//             tags: ['Profiles'],
//             body: ProfileWithoutId,
//         },
//         handler: async (request, reply) => {
//             const profile = request.body as any;
        
//             return await prismaClient.user.create({
//                 data: profile,

//             });
//             return { "msg": "profile added" }
//         },
//     });

//     /// Upsert one but all fields are required
//     server.route({
//         method: 'PUT',
//         url: '/profiles',
//         schema: {
//             summary: 'Creates new profile + all properties are required',
//             tags: ['Profiles'],
//             body: User,
//         },
//         handler: async (request, reply) => {
//             const profile = request.body as User;
//             if (!ObjectId.isValid(profile.user_id)) {
//                 reply.badRequest('Profile_id should be an ObjectId!');
//             } else {
//                 return await prismaClient.user.upsert({
//                     where: { user_id: profile.user_id },
//                     create: profile,
//                     update: _.omit(profile, ['user_id']),
//                 });
//             }
//         },
//     });

//     /// Update one by id
//     server.route({
//         method: 'PATCH',
//         url: '/:profile_id',
//         schema: {
//             summary: 'Update a Profile by id + you dont need to pass all properties',
//             tags: ['Profiles'],
//             body: PartialProfileWithoutId,
//             params: ProfileParams,
//         },
//         handler: async (request, reply) => {
//             const { user_id } = request.params as ProfileParams;
//             if (!ObjectId.isValid(user_id)) {
//                 reply.badRequest('profile_id should be an ObjectId!');
//                 return;
//             }

//             const profile = request.body as any;

//             return prismaClient.user.update({
//                 where: { user_id },
//                 data: profile,
//             });
//         },
//     });

//     /// Delete one by id
//     server.route({
//         method: 'DELETE',
//         url: '/:user_id',
//         schema: {
//             summary: 'Deletes a user',
//             tags: ['Profiles'],
//             params: ProfileParams,
//         },
//         handler: async (request, reply) => {
//             const { user_id } = request.params as ProfileParams;
//             if (!ObjectId.isValid(user_id)) {
//                 reply.badRequest('user_id should be an ObjectId!');
//                 return;
//             }

//             return prismaClient.user.delete({
//                 where: { user_id },
//             });
//         },
//     });



//     /// Get one by id
//     server.route({
//         method: 'GET',
//         url: '/',
//         schema: {
//             summary: 'Get all profiles',
//             tags: ['Profiles'],
//             querystring: ProfileQuery,
//             response: {
//                 '2xx': Type.Array(User),
//             },
//         },
//         handler: async (request, reply) => {
//             const { user_id } = request.query as ProfileQuery;
//             // if (!ObjectId.isValid(user_id)) {
//             // 	reply.badRequest('user_id should be an ObjectId!');
//             // 	return;
//             // }

//             return prismaClient.user.findMany({
//                 where: { user_id },
//             });
//         },
//     });


// }























// // import { FastifyInstance } from "fastify";

// // export default async function (server: FastifyInstance) {


// // }

// // import {  addNewUser } from "../../controllers/users";
// // export const routes = [
// // //     {
// // //     method: 'GET',
// // //     url: '/api/Users',
// // //     handler: getAllUsers
// // // },
// // // {
// // //     method: 'GET',
// // //     url: '/api/User/:id',
// // //     handler: getSingleUser
// // // },
// // {
// //     method: 'POST',
// //     url: '/api/User',
// //     Tag: ['User'],
// //     handler: addNewUser,
// // },

// // // {
// // //     method: 'PUT',
// // //     url: '/api/User/:id',
// // //     handler: updateUser
// // // },
// // // {
// // //     method: 'DELETE',
// // //     url: '/api/User/:id',
// // //     handler: deleteUser
// // // }
// // ]


// // // // module.exports = routes