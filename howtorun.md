### Setting up database on postgreSQL 
1. start your postgreSQL server on command line `sudo service postgresql start` and enter your password.
2. Create database in postgreSQL on command line `$createdb podsearch_db` ("podsearch_db" is the database name)
3. Create tables by using existing sql file. Type `$psql < dbtable.sql` on command line.

### Starting backend
1. on command line, `$nodemon server.js`

## Library I used for backend
- [Podcast Index API Javascript library] (https://github.com/comster/podcast-index-api) : calling external API 


### Setting frontend


