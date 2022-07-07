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

        handler: async (request:any, reply:any) => {
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
}
