import { Service } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { FastifyInstance } from 'fastify';
import _ from 'lodash';
import Fuse from 'fuse.js';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';

export const ServiceWithID = Type.Object({
    service_id: Type.String(),
    service_type: Type.String(),
    service_title: Type.String(),
    aftar: Type.String(),
    featured_service: Type.String()
})

export const ServiceWithoutId = Type.Object({
    service_type: Type.String(),
    service_title: Type.String(),
    aftar: Type.String(),
    featured_service: Type.Boolean()
})

type ServiceWithoutId = Static<typeof ServiceWithoutId>;

export const PartialServiceWithoutId = Type.Partial(ServiceWithoutId);
type PartialServiceWithoutId = Static<typeof PartialServiceWithoutId>;

export const GetServiceQuery = Type.Object({
    text: Type.Optional(Type.String()),
});
type GetServiceQuery = Static<typeof GetServiceQuery>;

export const ServiceParams = Type.Object({
    service_id: Type.String(),
});
type ServiceParams = Static<typeof ServiceParams>;

export const UserQuery = Type.Object({
    service_id: Type.Optional(Type.String()),
});
type UserQuery = Static<typeof UserQuery>;

export default async function (server: FastifyInstance) {
    // addAuthorization(server);

}











