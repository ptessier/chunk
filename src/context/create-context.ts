import { PrismaClient } from '@prisma/client';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { authorize } from '~/context/authorize';
import { Viewer } from '~/model/viewer';

export interface Context extends ContextParameters {
  prisma: PrismaClient;
  viewer: Viewer;
}

const prisma = new PrismaClient();

export const createContext = (context: ContextParameters): Context => ({
  ...context,
  prisma,
  viewer: authorize(context.request),
});
