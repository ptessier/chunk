import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-yoga';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { authorize } from '~/context/authorize';
import { Viewer } from '~/model/viewer';

export interface Context extends ContextParameters {
  prisma: PrismaClient;
  pubsub: PubSub;
  viewer: Viewer;
}

const pubsub = new PubSub();

const prisma = new PrismaClient();

export const createContext = (context: ContextParameters): Context => {
  return {
    ...context,
    prisma,
    pubsub,
    viewer: authorize(context),
  };
};
