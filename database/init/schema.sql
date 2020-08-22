CREATE TABLE "public"."User" (
  id SERIAL PRIMARY KEY NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  "inviteToken" VARCHAR(255),
  "inviteAccepted" BOOLEAN,
  "emailConfirmToken" VARCHAR(255),
  "emailConfirmed" BOOLEAN NOT NULL DEFAULT FALSE,
  "resetToken" VARCHAR(255),
  "resetExpires" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);
CREATE TABLE "public"."Post" (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "authorId" INTEGER NOT NULL,
  FOREIGN KEY ("authorId") REFERENCES "public"."User"(id)
);