--This can and must be done using migrations
--But as we are only going to need 1 table, is it not worth adding sequelize-cli and
--making the proyect that heavy
-- CREATE DATABASE "address-book";
\c "address-book";

DROP TABLE IF EXISTS "Contacts";
DROP SEQUENCE IF EXISTS "Contacts_id_seq";
CREATE SEQUENCE "Contacts_id_seq" start 1;

CREATE TABLE "public"."Contacts" (
    "id" integer DEFAULT nextval('"Contacts_id_seq"') NOT NULL,
    "name" character varying(255) NOT NULL,
    "surname" character varying(255) NOT NULL,
    "email" character varying(255) NOT NULL,
    "phone" character varying(255) NOT NULL,
    "deletedAt" timestamptz,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    "about" text,
    "photoUrl" character varying(255),
    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "contacts_email_deleted_at" UNIQUE ("email", "deletedAt")
) WITH (oids = false);

