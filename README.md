# PodZoo 🎙️
Live demo: [podzoo.surge.sh](https://podzoo.surge.sh/)
![image](plan/screencapture-podzoo-surge-sh-2023-07-29-19_04_17.png)
This is a podcast search web application created using [podcast Index API](https://podcastindex-org.github.io/docs-api/#auth).

- API used : [podcast Index API](https://podcastindex-org.github.io/docs-api/#auth).



### Setting up database on postgreSQL 
1. start your postgreSQL server on command line `sudo service postgresql start` and enter your password.
2. Create database in postgreSQL on command line `$createdb podsearch_db` ("podsearch_db" is the database name)
3. Create tables by using existing sql file. Type `$psql < dbtable.sql` on command line.

### Starting backend
1. on command line, type `$nodemon server.js`
2. server will start up on `[localhost:3001](http://localhost:3001)`

### Setting frontend


