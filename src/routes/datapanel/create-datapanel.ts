import { Datapanel } from "@prisma/client";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import _ from "lodash";
import { prismaClient } from "../../prisma";
import { DatapanelWithId, datapanelWithoutId } from "./index-datapanel";

export default async function (server: FastifyInstance) {
    // addAuthorization(server);

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
            body: DatapanelWithId,
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

}