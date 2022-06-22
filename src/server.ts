import fastifyAutoload from '@fastify/autoload';
import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import { join } from 'path';
import { ajvTypeBoxPlugin, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';


export const server = fastify({
	logger: true,
	ajv: {
		customOptions: {
			removeAdditional: 'all',
			ownProperties: true,
		},
		plugins: [ajvTypeBoxPlugin],
	},
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifySwagger, {
    routePrefix: '/Twak',
    exposeRoute: true,
    mode: 'dynamic',
    openapi: {
        info: {
            title: 'Twakkalna API',
            version: '0.0.1',
        },
    },
});

server.register(fastifyAutoload, {
    dir: join(__dirname, 'routes'),
});
