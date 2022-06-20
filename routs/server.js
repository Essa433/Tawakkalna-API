import fastify from "fastify"
FastifyInstance = fastify()
import { addloginRoutes } from "./login/login"
import { addCreateAccount } from "./routs/account/create_account"

export const server = fastify({ logger: true })
server.register(require("@fastify/multipart"))
server.get("/login", async (Request, reply) => {
  return { msg: "Hello Twakkalna" }
})

addloginRoutes(server)
addCreateAccount(server)


// const fastify = require("fastify")
// const { getAllUsers } = require("./login/login")

// const userRouter = fastify.Router()

// userRouter.get("/", getAllUsers)
// userRouter.post("/create", userRegester)
// userRouter.post("/login", userLogin)
// userRouter.post("/verify", userVerify)

// getAllUsers(server)
// // module.exports = userRouter
