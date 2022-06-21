import fastifyAutoload from '@fastify/autoload';
import fastify from 'fastify';
// import { version } from 'os';
// import { join } from 'path';

export const server = fastify({ logger: true })





// Declare a route
server.get('/', async (request: any, reply: any) => {
    return { hello: 'world' }
})

// Run the server!
const start = async () => {
    try {
        await server.listen({ port: 3000 })
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
start()



// server.register(fastifySwagger, {
//     routePrefix: 'docs',
//     exposeRoute: true,
//     mode: 'dynamic',
//     openapi: {
//         info: {
//             title: 'Tawakkalna API',
//             version: '0.0.1',
//         },
//     },
// });

// server.register(fastifyAutoload, {
//     dir: join(__dirname, 'routes')
// });
// server.listen({ port: 3000 }, err => {
//   if (err) {
//     server.log.error(err)
//     process.exit(1)
//   }
// })