# Proposal

1. What tech stack will you use for your final project? We recommend that you use
React and Node for this project, however if you are extremely interested in
becoming a Python developer you are welcome to use Python/Flask for this
project.
    - React.js Node.js 
    <br>
2. Is the front-end UI or the back-end going to be the focus of your project? Or are
you going to make an evenly focused full-stack application?
    - more focused on Frontend
    <br>
3. Will this be a website? A mobile app? Something else?
    - This will be Web App.
   <br>
4. What goal will your project be designed to achieve?
    - Making it easier for a user to find the podcast they may like.
    <br>
5. What kind of users will visit your app? In other words, what is the demographic of
your users?
    - Anyone who is interested to find a new podcast. 
    - General age range would be broad (18-50 years old).
    <br>
6. What data do you plan on using? How are you planning on collecting your data?
You may have not picked your actual API yet, which is fine, just outline what kind
of data you would like it to contain. You are welcome to create your own API and
populate it with data. If you are using a Python/Flask stack are required to create
your own API.
    - use my own API for user registration
    - podcast data would be pulled from [Podcast Index](https://podcastindex-org.github.io/docs-api/#overview--overview) 
    <br>
7. In brief, outline your approach to creating your project (knowing that you may not
know everything in advance and that these details might change later). 
Answer questions like the ones below, but feel free to add more information:
    - What does your database schema look like?
      - User table
      - Podcast table
      - User favorite table
      - User comments table
        <br>
    - What kinds of issues might you run into with your API? 
      This is especially important if you are creating your own API, 
      web scraping produces notoriously messy data.
      - API is down
        <br>   
    - Is there any sensitive information you need to secure?
      - User's password
        <br>
    - What functionality will your app include?
      - Search a podcast
      - Comment on a podcast
      - Like a podcast
        <br>
    - What will the user flow look like?
      - Landing page will show podcast Search box and a randomly pulled list of podcasts.
      - As users increase, the app will show popular podcasts on the front page.
      - User can like the podcast and enter a comment(public). 
      - If user is not logged in, user will be asked to signup or login.
      - User can make playlist for their podcasts to group their favorites together
        <br>
    - What features make your site more than a CRUD app? What are your stretch goals?
      - On search podcast, implement sorting/filtering
