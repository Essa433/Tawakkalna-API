import { Datapanel } from "@prisma/client";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { DataParams, PartialDatapanelWithoutId } from "./index-datapanel";

export default async function (server: FastifyInstance) {
    // addAuthorization(server);


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
        handler: async (request:any, reply:any) => {
            const { DataPanel_id } = request.params as Datapanel;
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

}
