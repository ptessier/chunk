import { PrismaClient } from '@prisma/client';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { config } from '~/config';
import { authorize, Viewer } from '~/context/authorize';

const prisma = new PrismaClient();

export interface Context extends ContextParameters {
  prisma: PrismaClient;
  viewer: Viewer;
}

export const createContext = (context: ContextParameters): Context => ({
  ...context,
  prisma,
  viewer: authorize(context.request, config.secret()),
});
