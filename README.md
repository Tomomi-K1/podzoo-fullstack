# PodZoo 🎙️
Live demo: [podzoo-fullstack.vercel.app](https://podzoo-fullstack.vercel.app) (🙏 it may take a while to load since I'm on free tier in deployed environment)
![image](plan/podzoo2.png)
PodZoo is a podcast search web application where a user can search and leave reviews.  

# Features
- Responsive website
- Search podcasts
- Filter and Sort on Search result page
- Like a podcast
- write/edit/delete a review
- rate podcasts

# Built with
- Database: PostgreSQL
- Backend: Node.js, Express.js, pg(node-postgres)
- frontend: React, Material UI
- API : [podcast Index API](https://podcastindex-org.github.io/docs-api/#auth).

# Setup
#### Setting up env variable
1. create `.env` file (make sure to include that in .gitignore file 😄)
2. go to [api.podcastindex.org](https://api.podcastindex.org/) and get a free API Key
3. save `API_KEY`, `API_SECRET` that you got from podcastindex.org
4. save `SECRET_KEY` that will be used for JWT token. 

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
    $cd podzoo-fullstack/backend
    ```

3. Create tables by using existing sql file. 
    ```bash
    $psql < db-schema.sql
    ```

#### Starting backend
1. Navigate to backend folder
   ```bash
   $cd podzoo-fullstack/backend
   ```
2.  Start backend server.
    ```bash
    $nodemon server.js
    ```
3. server will start up on `[localhost:3001](http://localhost:3001)`

#### Starting frontend
1. Navigate to frontend folder
   ```bash
   $cd podzoo-fullstack/frontend
   ```
2. Run the React app. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
   ```bash
   $npm start
   ```
# Testing
#### Running backend tests
1. Navigate to backend folder
    ```bash
   $cd podzoo-fullstack/backend
   ```
2. run test
   ```bash
   $jest
   ```
#### Running frontend tests
1. Navigate to frontend folder
   ```bash
   $cd podzoo-fullstack/frontend
   ```
2. run test
   ```bash
   $npm test
   ```

