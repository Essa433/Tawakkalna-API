import { DigitalWallet } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { request } from 'express';
import { FastifyInstance } from 'fastify';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { type } from 'os';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';

const DigitalWallet = Type.Object({
    DigitalWallet_id: Type.String(),
    identification_Expire_Date: Type.String({ format: '' }),
    student_id: Type.String(),
    student_name: Type.String(),
    student_email: Type.String(),
    vehicle_Expire_Date: Type.String({ format: '' }),
    vehicle_color: Type.String(),
    vehicle_number: Type.String(),
    Document_Type: Type.String(),
    user_id: Type.String()

})


const DigitalWalletWithoutId = Type.Object({
    identification_Expire_Date: Type.String({ format: "date-time" }),
    student_id: Type.String(),
    student_name: Type.String(),
    student_email: Type.String(),
    vehicle_Expire_Date: Type.String({ format: "date-time" }),
    vehicle_color: Type.String(),
    vehicle_number: Type.String(),
    Document_Type: Type.String(),
    user_id: Type.String()

})


type DigitalWalletWithoutId = Static<typeof DigitalWalletWithoutId>;
const PartialDigitallWithoutId = Type.Partial(DigitalWalletWithoutId);
type PartialDigitallWithoutId = Static<typeof PartialDigitallWithoutId>;

const GetDigitalWalletQuery = Type.Object({
    decument_type: Type.Optional(Type.String()),
});
type GetDigitalWalletQuery = Static<typeof GetDigitalWalletQuery>;

const DigitalWalletParams = Type.Object({
    DigitalWallet_id: Type.String(),
});
type DigitalWalletParams = Static<typeof DigitalWalletParams>;

const DigitalQuery = Type.Object({
    DigitalWallet_id: Type.Optional(Type.String()),
});
type DigitalQuery = Static<typeof DigitalQuery>;

export default async function (server: FastifyInstance) {
    // addAuthorization(server);



    server.route({
        method: 'POST',
        url: '/digitalwallet',
        schema: {
            summary: 'Creates new digital wallet',
            tags: ['digitalwallet'],
            body: DigitalWalletWithoutId,
        },

        handler: async (request, reply) => {
            const body = request.body as any
            const digitalWallet = await prismaClient.digitalWallet.create({
                data: {
                    identification_Expire_Date: body.identification_Expire_Date,
                    student_id: body.student_id,
                    student_name: body.student_name,
                    student_email: body.student_email,
                    vehicle_Expire_Date: body.vehicle_Expire_Date,
                    vehicle_color: body.vehicle_color,
                    vehicle_number: body.vehicle_number,
                    Document_Type: body.Document_Type,

                    user: {
                        connect: { user_id: body.user_id },
                    }
                }
            })
        }
    })



    /// Get all Services
    server.route({
        method: 'GET',
        url: '/digitalwallet',
        schema: {
            summary: 'Get all Digital Wallet',
            tags: ['digitalwallet'],
            // querystring: DigitalQuery,
            response: {
                // '2xx': Type.Array(DigitalWallet),
            }
        },
        handler: async (request, reply) => {

            return prismaClient.digitalWallet.findMany({
                // where: { featured_service:true },
            });
        },
    });



    // server.route({
    //     method: 'POST',
    //     url: '/digitalwalet',
    //     schema: {
    //         summary: 'Creates new Digital Wallet',
    //         tags: ['digitalwalet'],
    //         body: DigitalWalletWithoutId,
    //     },
    //     handler: async (request, reply) => {
    //         const digitalWallets = request.body as any;
    //         return await prismaClient.digitalWallet.create({
    //             data: digitalWallets,

    //         });
    //     },
    // });



    //------------------------------------------------------





    // // /// Create digitalwallet without the need for digitalWaleet_id
    // server.route({
    //     method: 'POST',
    //     url: '/digitalwallet',
    //     schema: {
    //         summary: 'Creates new Digital Wallet',
    //         tags: ['Digital Wallet'],
    //         body: DigitalWalletWithoutId,
    //     },
    //     handler: async (request, reply) => {
    //         const digitalWallet = request.body as any;
    //         return await prismaClient.digitalWallet.create({
    //             data: {
    //         identification_Expire_Date: '20/2/2022',
    //         student_id: '1234',
    //         student_name: 'essa',
    //         student_email: 'ww@stu',
    //         vehicle_Expire_Date: '20/3/2025',
    //         vehicle_color: 'essa',
    //         vehicle_number: 'essa',
    //         Document_Type: 'IdentificationID',
    //         user: {
    //             connect: { user_id: '8' }
    //         }
    //     }
    //         });
    //     },
    // });


    // // // /// Update one educationDecument by id
    // server.route({
    //     method: 'PATCH',
    //     url: '/:DigitalWallet_id',
    //     schema: {
    //         summary: 'Update a Education Decument by id + you dont need to pass all properties',
    //         tags: ['Digital Wallet'],
    //         body: PartialDigitalWalletWithoutId,
    //         params: DigitalWalletParams,
    //     },
    //     handler: async (request, reply) => {
    //         const { DigitalWallet_id } = request.params as any;
    //         if (!ObjectId.isValid(DigitalWallet_id)) {
    //             reply.badRequest('DigitalWallet_id should be an ObjectId!');
    //             return;
    //         }

    //         const digitalWallet = request.body as DigitalWallet;

    //         return prismaClient.digitalWallet.update({
    //             where: { DigitalWallet_id },
    //             data: digitalWallet,
    //         });
    //     },
    // });


    // // Upsert one but all The most prominent services
    // server.route({
    //     method: 'PUT',
    //     url: '/educationDecument',
    //     schema: {
    //         summary: 'Creates new Education Decument + all properties are required',
    //         tags: ['Digital Wallet'],
    //         body: DigitalWalletWithID,
    //     },
    //     handler: async (request, reply) => {
    //         const digitalWallet = request.body as DigitalWallet;
    //         if (!ObjectId.isValid(digitalWallet.DigitalWallet_id)) {
    //             reply.badRequest('DigitalWallet_id should be an ObjectId!');
    //         } else {
    //             return await prismaClient.digitalWallet.upsert({
    //                 where: { DigitalWallet_id: digitalWallet.DigitalWallet_id },
    //                 create: digitalWallet,
    //                 update: _.omit(digitalWallet, ['DigitalWallet_id']),
    //             });
    //         }
    //     },
    // });



    //-------------------------------------------------------------------------------------



    // /// Create digitalwallet without the need for digitalWaleet_id





    // /// Upsert one but all fields are required
    // server.route({
    //     method: 'PUT',
    //     url: '/services',
    //     schema: {
    //         summary: 'Creates new service + all properties are required',
    //         tags: ['Services'],
    //         body: Service,
    //     },
    //     handler: async (request, reply) => {
    //         const service = request.body as Service;
    //         if (!ObjectId.isValid(service.service_id)) {
    //             reply.badRequest('service_id should be an ObjectId!');
    //         } else {
    //             return await prismaClient.service.upsert({
    //                 where: { service_id: service.service_id },
    //                 create: service,
    //                 update: _.omit(service, ['user_id']),
    //             });
    //         }
    //     },
    // });

    // // /// Update one by id
    // server.route({
    //     method: 'PATCH',
    //     url: '/:user_id',
    //     schema: {
    //         summary: 'Update a Service by id + you dont need to pass all properties',
    //         tags: ['Services'],
    //         body: PartialServiceWithoutId,
    //         params: ServiceParams,
    //     },
    //     handler: async (request, reply) => {
    //         const { service_id } = request.params as ServiceParams;
    //         if (!ObjectId.isValid(service_id)) {
    //             reply.badRequest('Service_id should be an ObjectId!');
    //             return;
    //         }

    //         const service = request.body as Service;

    //         return prismaClient.service.update({
    //             where: { service_id },
    //             data: service,
    //         });
    //     },
    // });

    /// Delete one by id
    // server.route({
    //     method: 'DELETE',
    //     url: '/:service_id',
    //     schema: {
    //         summary: 'Deletes a service',
    //         tags: ['Services'],
    //         params: ServiceParams,
    //     },
    //     handler: async (request, reply) => {
    //         const { service_id } = request.params as ServiceParams;
    //         if (!ObjectId.isValid(service_id)) {
    //             reply.badRequest('service_id should be an ObjectId!');
    //             return;
    //         }

    //         return prismaClient.service.delete({
    //             where: { service_id },
    //         });
    //     },
    // });



    /// Get Featured Service in homepage
    // server.route({
    //     method: 'GET',
    //     url: '/featuredService',
    //     schema: {
    //         summary: 'Get all featured services',
    //         tags: ['Featured Services'],
    //         querystring: UserQuery,
    //         response: {
    //             '2xx': Type.Array(Service),
    //         }
    //     },
    //     handler: async (request, reply) => {
    //         // const {  } = request.query as UserQuery;
    //         // if (!ObjectId.isValid(user_id)) {
    //         // 	reply.badRequest('user_id should be an ObjectId!');
    //         // 	return;
    //         // }

    //         return prismaClient.service.findMany({
    //             where: { featured_service: true },
    //         });
    //     },
    // });







    //     /// Get all Services or search by service type
    //     server.route({
    //         method: 'GET',
    //         url: '/services',
    //         schema: {
    //             summary: 'Get all Services or search by service type',
    //             tags: ['Services'],
    //             querystring: GetServiceQuery,
    //             response: {
    //                 '2xx': Type.Array(Service),
    //             },
    //         },
    //         handler: async (request, reply) => {
    //             const query = request.query as GetServiceQuery;

    //             const contacts = await prismaClient.service.findMany();
    //             if (!query.service_title) return contacts;

    //             const fuse = new Fuse(contacts, {
    //                 includeScore: true,
    //                 isCaseSensitive: false,
    //                 includeMatches: true,
    //                 findAllMatches: true,
    //                 threshold: 1,
    //                 keys: ['name'],
    //             });

    //             console.log(JSON.stringify(fuse.search(query.service_title)));

    //             const result: Service[] = fuse.search(query.service_title).map((r) => r.item);
    //             return result;
    //         },
    //     });


}

















function DigitalWallet_id(DigitalWallet_id: any) {
    throw new Error('Function not implemented.');
}

