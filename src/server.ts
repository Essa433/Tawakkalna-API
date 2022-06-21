import fastifyAutoload from '@fastify/autoload';
import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import { version } from 'os';
import { join } from 'path';

export const server = fastify({ logger: true })

server.register(fastifySwagger, {
    routePrefix: 'docs',
    exposeRoute: true,
    mode: 'dynamic',
    openapi: {
        info: {
            title: 'Tawakkalna API',
            version: '0.0.1',
        },
    },
});

server.register(fastifyAutoload, {
    dir: join(__dirname, 'routes')
});