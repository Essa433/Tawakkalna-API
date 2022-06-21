import { profile } from "console";
import { FastifyInstance } from "fastify";
import { request } from "http";
import { url } from "inspector";
import { createProfileController } from "../controllers/profiles/create-profiles";


export let profiles = [
    { id: 1, name: 'Essa', age: 26 },
    { id: 2, name: 'Ali', age: 22 }
];

export default async function (server: FastifyInstance) {


    server.put('/profile/create', async (request, reply) => {
        const newProfile: any = request.body;
        return createProfileController(newProfile);
    });

    server.route({
        method: "PUT",
        url: "/profile/create",
        handler: async (request, reply) => {
            const newProfile: any = request.body;
            return createProfileController(newProfile);
        }
    })

    server.get('/profiles', async (request, reply) => {
        return profile;
    })

    server.route({
        method: 'GET',
        url: '/profiles',
        handler: async (request, reply) => {
            return profile;
        },
    });

}