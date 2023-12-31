# Checklist

### user registration
- [ ] if a user tries to create new account with existing email bring a user to login page
- [x] user can sign up
- [x] user can hide or show password
- [ ] form validation can be done on frontend? right now error messages comes from pg and not nicely worded.->material ui formControl component?

### user login
- [x] password should be hidden
- [x] change submit botton from "onClick" to "onSubmit" (having issue onSubmit not working)

### user profile edit
- [x] user can edit email

### landing page
- [x] show trending podcasts
- [x] show categories
- [x] show search box  
- [ ] add button next to search box

### search page
- [x] sort and filter ( more than CRUD)

### Podcast
- [x] filter out description has html tag.
- [x] add functions to favorite button (add podcast to user favorite)
- [X] add fallback image on PodcastCard ( use onError? )
  
### Episodes
- [x] filter out description has html tag.
- [x] review page - change design to list by including collapse function
- [x] fix audio component position

### categories
- [X] have categories button or card to show podcast of a selected category
- [X] decide which categories to use. Have it in the separate json file.

### reviews
- [X] review page - change design to list
- [x] add functions to save a user's review on the backend
- [x] fix submit button position on review form

### others
- [x] protect route that a specific user can access
- [x] Loader component update
- [ ] audio error handling
- [x] [make Material UI font responsive] (https://mui.com/material-ui/customization/typography/#responsive-font-sizes) especially on PodcastList.js
- [x] create a page that shows a list of favorites 
- [x] clean up each component(remove unused imported/unnecessary console.log/add explanation for components etc.)


### DOM  
- [ ] add semantic meaning to the page structure

### Extra things to complete if I have time
- [ ] Loading icon to be something music related and animate it.--> if I have time.   
- [ ] hover effect on Podcast Card 
- [ ] for now, do not build fav_categories for user (For future)    
- [ ] show most recent reviews. If I have time.  
- [ ] forgot password button? --> if I have time.
- [ ] Add "footer section with 'about' etc"
- [ ] podcast detail's background to have gradient color(if I have time)
- [ ] add footer?
- [ ] this of better design for search by categories section on Home.js
- [ ] On favorite list, each favorite podcast will have 'remove' button
- [ ] email password reset

### Questions
- [x] how do I know which media types? -> episode sent back by api has audio type information
- [x] artwork of podcast could be not on the web, how do I handle that? -> use `onError`
- [ ] how do I handle some podcast having over 1000 episode.... do something with backend? -> at this time, I decided to just show up to 100 episodes
- [ ] how to cache data in the backend? => looking `redis`?
- [ ] is it better to call external API from backend or frontend (if I'm caching data, I should call it from backend)
- [ ] how do I test backend api route when I have an external api call in it?
- [ ] do pagenation or have other windows for trending podcasts/episode routes?
        https://medium.com/learnfactory-nigeria/create-a-pagination-middleware-with-node-js-fe4ec5dca80f


### what I learned
- when creating backend, make it clear what kind of data will be sent back. e.g {user:{ name, id etc..}} If I had a easy documentation for my own API it would be helpful.
- when using external API, before creating backend API and frontend structure, think about naming of columns in database so it would be easier to understand but could also utilize same naming as external api response.
- variable that is created useState() won't be updated right away so I cannot use the variable new value after using the setter in the same function. For example, I may try to use `data` by declaring like `const[ data, setData] = useState(null)` in `handleSubmit function`. Inside `handleSubmit`, I want to `setData` to new data and use that value in `handleSubmit`. However `data` won't be updated inside `handleSubmit` function.
- for image fallback, you can use `onerror = ...`

