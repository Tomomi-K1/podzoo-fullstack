# PodZoo 🎙️
Live demo: [podzoo.surge.sh](https://podzoo.surge.sh/)
![image](plan/screencapture-podzoo-surge-sh-2023-07-29-19_04_17.png)
PodZoo is a podcast search web application where a user can search and leave reviews.

#Features
- Search podcasts
- Filter and Sort on Search result page
- Like a podcast
- write/edit/delete a review
- rate podcasts

#Built with
- Database: PostgreSQL
- Backend: Node.js, Express.js, pg(node-postgres)
- frontend: React, Material UI
- API : [podcast Index API](https://podcastindex-org.github.io/docs-api/#auth).

#Setup
#### Setting up database on postgreSQL 
1. start your postgreSQL server and enter your password.
   ```bash
   $sudo service postgresql start
   ```
   
2. Create database in postgreSQL(`podsearch_db` is the database name)
   ```bash
   $createdb podsearch_db
   ```
3. go to backend folder. 
    ```bash
    $cd sp-capstone2/backend
    ```

3. Create tables by using existing sql file. 
    ```bash
    $psql < dbtable.sql
    ```

#### Starting backend
1. Navigate to backend folder
   ```bash
   $cd sp-capstone2/backend
   ```
2.  Start backend server.
    ```bash
    $nodemon server.js
    ```
3. server will start up on `[localhost:3001](http://localhost:3001)`

#### Setting frontend
1. Navigate to frontend folder
   ```bash
   $cd sp-capstone2/frontend
   ```
2. Run the React app. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
   ```bash
   $npm start
   ```
# Testing
#### running backend test
1. Navigate to backend folder
    ```bash
   $cd sp-capstone2/backend
   ```
2. run test
   ```bash
   $jest
   ```
#### running frontend test
1. Navigate to frontend folder
   ```bash
   $cd sp-capstone2/frontend
   ```
2. run test
   ```bash
   $npm test
   ```

