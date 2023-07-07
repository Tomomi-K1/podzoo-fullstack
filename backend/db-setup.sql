-- Link to schema: https://app.quickdatabasediagrams.com/#/d/pbR29N
-- on ubuntu type psql <db-setup.sql

DROP DATABASE podsearch_db;
CREATE DATABASE podsearch_db;
\connect podsearch_db

\i db-schema.sql

DROP DATABASE podsearch_db_test;
CREATE DATABASE podsearch_db_test;
\connect podsearch_db_test

\i db-schema.sql
