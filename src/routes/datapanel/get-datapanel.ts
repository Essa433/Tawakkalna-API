import { Datapanel } from "@prisma/client";
import { Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import Fuse from "fuse.js";
import { prismaClient } from "../../prisma";
import { GetDatapanelQuery } from "./index-datapanel";

export default async function (server: FastifyInstance) {
    // addAuthorization(server);

    /// Get all Services
    server.route({
        method: 'GET',
        url: '/allDataPanels',
        schema: {
            summary: 'Get all Datapanels',
            tags: ['DataPanels'],
            // querystring: DatapanelQuery,
            // response: {
            //     '2xx': Type.Array(Datapanel),
            // }
        },
        handler: async (request, reply) => {

            return prismaClient.datapanel.findMany({
            });
        },
    });


    /// Get all Services or search by service type
    server.route({
        method: 'GET',
        url: '/DataPanels',
        schema: {
            summary: 'Get Datapanel or search by Datapanel title',
            tags: ['DataPanels'],
            querystring: GetDatapanelQuery,
            // response: {
            //     '2xx': Type.Array(Datapanel),
            // },
        },
        handler: async (request:any, reply:any) => {
            const query = request.query as any;

            const datapanels = await prismaClient.datapanel.findMany();
            if (!query.text) return datapanels;

            const fuse = new Fuse(datapanels, {
                includeScore: true,
                isCaseSensitive: false,
                includeMatches: true,
                findAllMatches: true,
                threshold: 1,
                keys: ['Data_title'],
            });

            console.log(JSON.stringify(fuse.search(query.text)));

            const result: Datapanel[] = fuse.search(query.text).map((r) => r.item);
            return result;
        },
    });


}

function Datapanel(Datapanel: any) {
    throw new Error("Function not implemented.");
}
