import { Datapanel } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { FastifyInstance } from 'fastify';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';

const Datapanel = Type.Object({
    DataPanel_id: Type.String(),
    Data_title: Type.String(),
    DataPanel_type: Type.String(),
    aftar: Type.String(),


})

const datapanelWithoutId = Type.Object({
    Data_title: Type.String(),
    DataPanel_type: Type.String(),
    aftar: Type.String(),
})


type datapanelWithoutId = Static<typeof datapanelWithoutId>;

const PartialDatapanelWithoutId = Type.Partial(datapanelWithoutId);
type PartialDatapanelWithoutId = Static<typeof PartialDatapanelWithoutId>;

const GetDatapanelQuery = Type.Object({
    text: Type.Optional(Type.String()),
});
type GetDatapanelQuery = Static<typeof GetDatapanelQuery>;

const DataParams = Type.Object({
    DataPanel_id: Type.String(),
});
type DataParams = Static<typeof DataParams>;


const DatapanelQuery = Type.Object({
    DataPanel_id: Type.Optional(Type.String()),
});
type DatapanelQuery = Static<typeof DatapanelQuery>;



export default async function (server: FastifyInstance) {
    // addAuthorization(server);


    /// Get one by id
    // server.route({
    //     method: 'GET',
    //     url: '/datapanel',
    //     schema: {
    //         summary: 'Get profile by id',
    //         tags: ['Data Panels'],
    //         params: DatapanelQuery,
    //         response: {
    //             '2xx': Type.Array(Profile),
    //         },
    //     },
    //     handler: async (request, reply) => {
    //         const { user_id } = request.params as ProfileQuery;
    //         // if (!ObjectId.isValid(user_id)) {
    //         // 	reply.badRequest('user_id should be an ObjectId!');
    //         // 	return;
    //         // }

    //         return prismaClient.user.findMany({
    //             where: { profile_id },
    //         });
    //     },
    // });

    /// Create contact without the need for contact_id
    server.route({
        method: 'POST',
        url: '/DataPanels',
        schema: {
            summary: 'Creates new Datapanel',
            tags: ['DataPanels'],
            body: datapanelWithoutId,
        },
        handler: async (request, reply) => {
            const datapanel = request.body as any;
            return await prismaClient.datapanel.create({
                data: datapanel,

            });
        },
    });

    // Upsert one but all The most prominent services
    server.route({
        method: 'PUT',
        url: '/DataPanels',
        schema: {
            summary: 'Creates new datapanel + all properties are required',
            tags: ['DataPanels'],
            body: Datapanel,
        },
        handler: async (request, reply) => {
            const datapanel = request.body as Datapanel;
            if (!ObjectId.isValid(datapanel.DataPanel_id)) {
                reply.badRequest('serv should be an ObjectId!');
            } else {
                return await prismaClient.datapanel.upsert({
                    where: { DataPanel_id: datapanel.DataPanel_id },
                    create: datapanel,
                    update: _.omit(datapanel, ['DataPanel_id']),
                });
            }
        },
    });


    // /// Update one by id
    server.route({
        method: 'PATCH',
        url: '/:DataPanel_id',
        schema: {
            summary: 'Update a Datapanel by id',
            tags: ['DataPanels'],
            body: PartialDatapanelWithoutId,
            params: DataParams,
        },
        handler: async (request, reply) => {
            const { DataPanel_id } = request.params as DataParams;
            if (!ObjectId.isValid(DataPanel_id)) {
                reply.badRequest('Datapanel_id should be an ObjectId!');
                return;
            }

            const datapanel = request.body as Datapanel;

            return prismaClient.datapanel.update({
                where: { DataPanel_id },
                data: datapanel,
            });
        },
    });


    /// Delete one by id
    server.route({
        method: 'DELETE',
        url: '/:DataPanel_id',
        schema: {
            summary: 'Deletes a Datapanel',
            tags: ['DataPanels'],
            params: DataParams,
        },
        handler: async (request, reply) => {
            const { DataPanel_id } = request.params as DataParams;
            if (!ObjectId.isValid(DataPanel_id)) {
                reply.badRequest('datapanel_id should be an ObjectId!');
                return;
            }

            return prismaClient.datapanel.delete({
                where: { DataPanel_id },
            });
        },
    });


    /// Get all Services
    server.route({
        method: 'GET',
        url: '/allDataPanels',
        schema: {
            summary: 'Get all Datapanels',
            tags: ['DataPanels'],
            querystring: DatapanelQuery,
            response: {
                '2xx': Type.Array(Datapanel),
            }
        },
        handler: async (request, reply) => {
            // const {  } = request.query as UserQuery;
            // if (!ObjectId.isValid(user_id)) {
            // 	reply.badRequest('user_id should be an ObjectId!');
            // 	return;
            // }

            return prismaClient.datapanel.findMany({
                // where: { featured_service:true },
            });
        },
    });


    // /// Get one Datapanel by datapanel_id
    // server.route({
    //     method: 'GET',
    //     url: '/:DataPanel_id',
    //     schema: {
    //         summary: 'Get one Datapanel by datapanel_id ',
    //         tags: ['DataPanels'],
    //         params: DataParams,
    //         response: {
    //             '2xx': Type.Array(Datapanel),
    //         }
    //     },
    //     handler: async (request, reply) => {
    //         const { DataPanel_id } = request.params as DataParams;
    //         // if (!ObjectId.isValid(DataPanel_id)) {
    //         //     reply.badRequest('datapanel_id should be an ObjectId!');
    //         //     return;
    //         // }

    //         return prismaClient.datapanel.findFirstOrThrow({
    //             where: { DataPanel_id },
    //         });
    //     },
    // });


    /// Get all Services or search by service type
    server.route({
        method: 'GET',
        url: '/DataPanels',
        schema: {
            summary: 'Get Datapanel or search by Datapanel title',
            tags: ['DataPanels'],
            querystring: GetDatapanelQuery,
            response: {
                '2xx': Type.Array(Datapanel),
            },
        },
        handler: async (request, reply) => {
            const query = request.query as GetDatapanelQuery;

            const datapanels = await prismaClient.datapanel.findMany();
            if (!query.text) return datapanels;

            const fuse = new Fuse(datapanels, {
                includeScore: true,
                isCaseSensitive: false,
                includeMatches: true,
                findAllMatches: true,
                threshold: 1,
                keys: ['name'],
            });

            console.log(JSON.stringify(fuse.search(query.text)));

            const result: Datapanel[] = fuse.search(query.text).map((r) => r.item);
            return result;
        },
    });


}












