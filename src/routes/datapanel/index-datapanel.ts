import { Datapanel } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { FastifyInstance } from 'fastify';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';

export const DatapanelWithId = Type.Object({
    DataPanel_id: Type.String(),
    Data_title: Type.String(),
    DataPanel_type: Type.String(),
    aftar: Type.String(),
    descryption: Type.String(),

})

export const datapanelWithoutId = Type.Object({
    Data_title: Type.String(),
    DataPanel_type: Type.String(),
    aftar: Type.String(),
    descryption: Type.String(),

})


type datapanelWithoutId = Static<typeof datapanelWithoutId>;

export const PartialDatapanelWithoutId = Type.Partial(datapanelWithoutId);
type PartialDatapanelWithoutId = Static<typeof PartialDatapanelWithoutId>;

export const GetDatapanelQuery = Type.Object({
    text: Type.Optional(Type.String()),
});
type GetDatapanelQuery = Static<typeof GetDatapanelQuery>;

export const DataParams = Type.Object({
    DataPanel_id: Type.String(),
});
type DataParams = Static<typeof DataParams>;


export const DatapanelQuery = Type.Object({
    DataPanel_id: Type.Optional(Type.String()),
});
type DatapanelQuery = Static<typeof DatapanelQuery>;

export default async function (server: FastifyInstance) {
    // addAuthorization(server);

}












