# Checklist
- [ ] protect route that a specific user can access

### user registration
- [ ] if a user tries to create new account with existing email bring a user to login page
- [x] user can sign up
- [x] user can hide or show password
- [ ] forgot password button? --> if I have time.
- [ ] form validation can be done on frontend? right now error messages comes from pg and not nicely worded.

### user login
- [x] password should be hidden

### user profile edit
- [x] user can edit email

### landing page
- [x] show trending podcasts
- [x] show categories
- [ ] maybe show most recent reviews?

### search
- [ ] sd

### Podcast
- [x] filter out description has html tag.
### Episodes
- [x] filter out description has html tag.
- [ ] 

### categories
- [ ] have categories button or card to show podcast of a selected category
- [ ] for now, do not build fav_categories for user (For future)
      ==use GET /podcasts/trending?lang=en&cat=1==
- [ ] decide which categories to use. Have it in the separate json file.

### Questions
- [ ] how do I know which media types?
- [ ] artwork of podcast could be not on the web, how do I handle that?
- [ ] how do I handle some podcast having over 1000 episode.... do something with backend?
- [ ] how to cache data in the backend?
- [ ] is it better to call external API from backend or frontend (if I'm caching data, I should call it from backend)
- [ ] how do I test backend api route when I have an external api call in it?

### Design I want to do
-[ ] Loading icon to be something music related and animate it.
-[ ] add semantic meaning to the page structure
            

