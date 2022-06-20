import { FastifyInstance } from "fastify"

export function addCreateAccount(server: FastifyInstance) {
  server.put("/account/create", (request, reply) => {
    const data = request.body
    return { name: data.name, phone: data.phone }
  })
}
