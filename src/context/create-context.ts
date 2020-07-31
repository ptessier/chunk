import { PrismaClient } from '@prisma/client';
import { ContextParameters } from 'graphql-yoga/dist/types';

const prisma = new PrismaClient();

export interface Context extends ContextParameters {
  prisma: PrismaClient;
}

export const createContext = (context: ContextParameters): Context => ({
  ...context,
  prisma,
});
