import { server } from "./server"


server.listen({ port: 3000 }, err => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})


// import { server } from "./server"
// FastifyInstance = fastify()

// const userRouter = require(".//users")
// // const profileRouter = require("./Routes/profile")
// // const todoRouter = require("./Routes/todoTask")

// app.use("/users", userRouter)
// app.use("/profile", profileRouter)
// app.use("/todotask", todoRouter)

// server.listen({ port: 3000 }, err => {
//   if (err) {
//     server.log.error(err)
//     process.exit(1)
//   }
// })