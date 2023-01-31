--This can and must be done using migrations
--But as we are only going to need 1 table, is it not worth adding sequelize-cli and
--making the proyect that heavy
CREATE DATABASE "address-book";
\c "address-book";

CREATE TABLE Contacts
(
    id SERIAL,
    name varchar(255),
    surname varchar(255),
    email varchar(255),
    phone varchar(255),
    about text,
    photoUrl varchar(255),
    deletedAt date,
    updatedAt date,
    createdAt date,
    CONSTRAINT contacts_pkey PRIMARY KEY (id)
);
