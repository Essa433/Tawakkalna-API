import { Datapanel } from "@prisma/client";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { DataParams } from "./index-datapanel";

export default async function (server: FastifyInstance) {
    // addAuthorization(server);



    /// Delete one by id
    server.route({
        method: 'DELETE',
        url: '/:DataPanel_id',
        schema: {
            summary: 'Deletes a Datapanel',
            tags: ['DataPanels'],
            params: DataParams,
        },
        handler: async (request: any, reply: any) => {
            const { DataPanel_id } = request.params as Datapanel;
            if (!ObjectId.isValid(DataPanel_id)) {
                reply.badRequest('datapanel_id should be an ObjectId!');
                return;
            }

            return prismaClient.datapanel.delete({
                where: { DataPanel_id },
            });
        },
    });

}