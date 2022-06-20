const { CreateAccount } = require("../controller/account")

const fastifyRoutesAccount = require("fastify")({ logger: true })

// fastify.post("/", CreateAccount)
fastifyRoutesAccount.put("/account/create", CreateAccount)

module.exports = fastifyRoutesAccount
