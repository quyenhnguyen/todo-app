CREATE DATABASE "todo-app-db"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: public.account

-- DROP TABLE public.account;

CREATE TABLE public.account
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    email text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default",
    CONSTRAINT account_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.account
    OWNER to postgres;

-- Table: public.task

-- DROP TABLE public.task;

CREATE TABLE public.task
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    summary text COLLATE pg_catalog."default",
    status boolean,
    acc_id integer NOT NULL,
    CONSTRAINT task_pkey PRIMARY KEY (id),
    CONSTRAINT fk_task_account FOREIGN KEY (acc_id)
        REFERENCES public.account (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.task
    OWNER to postgres;