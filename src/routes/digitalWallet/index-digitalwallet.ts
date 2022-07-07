import { DigitalWallet } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { request } from 'express';
import { FastifyInstance } from 'fastify';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { type } from 'os';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
export const DigitalWalletwithID = Type.Object({
    DigitalWallet_id: Type.String(),
    identification_Expire_Date: Type.String({ format: '' }),
    student_id: Type.String(),
    student_name: Type.String(),
    student_email: Type.String(),
    vehicle_Expire_Date: Type.String({ format: '' }),
    vehicle_color: Type.String(),
    vehicle_number: Type.String(),
    Document_Type: Type.String(),
    user_id: Type.String()
})
export const DigitalWalletWithoutId = Type.Object({
    identification_Expire_Date: Type.String({ format: "date-time" }),
    student_id: Type.String(),
    student_name: Type.String(),
    student_email: Type.String(),
    vehicle_Expire_Date: Type.String({ format: "date-time" }),
    vehicle_color: Type.String(),
    vehicle_number: Type.String(),
    Document_Type: Type.String(),
    user_id: Type.String()
})
type DigitalWalletWithoutId = Static<typeof DigitalWalletWithoutId>;
export const PartialDigitallWithoutId = Type.Partial(DigitalWalletWithoutId);
type PartialDigitallWithoutId = Static<typeof PartialDigitallWithoutId>;
export const GetDigitalWalletQuery = Type.Object({
    decument_type: Type.Optional(Type.String()),
});
type GetDigitalWalletQuery = Static<typeof GetDigitalWalletQuery>;
export const DigitalWalletParams = Type.Object({
    DigitalWallet_id: Type.String(),
});
type DigitalWalletParams = Static<typeof DigitalWalletParams>;
export const DigitalQuery = Type.Object({
    DigitalWallet_id: Type.Optional(Type.String()),
});
type DigitalQuery = Static<typeof DigitalQuery>;
export default async function (server: FastifyInstance) {
    // addAuthorization(server);
}

