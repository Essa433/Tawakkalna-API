import { FastifyInstance } from "fastify"
import { prismaClient } from "../../prisma"
import { DigitalWalletWithoutId } from "./index-digitalwallet"

export default async function (server: FastifyInstance) {
    // addAuthorization(server);



    server.route({
        method: 'POST',
        url: '/DigitalWallet',
        schema: {
            summary: 'Creates new digital wallet',
            tags: ['DigitalWallet'],
            body: DigitalWalletWithoutId,
        },

        handler: async (request: any, reply: any) => {
            const body = request.body as any
            await prismaClient.digitalWallet.create({
                data: {
                    photo: body.photo,
                    Document_Type: body.Document_Type,
                    user: {
                        connect: { user_id: body.user_id },
                    }
                }
            })
        }
    })
}
