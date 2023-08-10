import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 * Static class tying together methods used to get/send to to the backend API.
 */
class PodApi{
    //  == store received token ==== //
    static token;

    // ============ method to make api call easier  ======== //
    static async request(endpoint, data = {}, method = "get") {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${PodApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    
    // ============Individual API routes ======== //

    /** Get the current user. 
    returns { username, email, fav:[feedId]}}
    */
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Get token for login from username, password. 
     * returns token
    */
    static async login(data) {
        let res = await this.request(`users/login`, data, "post");
        return res.token;
    }

    /** Signup  
     * * returns token
    */
    static async signup(data) {
        let res = await this.request(`users/register`, data, "post");
        return res.token;
    }

    /** update user profile page. 
     * returns {username, email}
    */
    static async updateProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }


    /** delete user 
     * returns username if deleted without problem
    */
    static async deleteUser(username){
        let res = await this.request(`users/${username}`, "delete");
        return res.deleted
    }

    // ====== for user's favorite podcasts =======//
    /** get user's favorite podcasts 
     * returns [{podcast1}, {podcast2},...]
    */
    static async getFavPodcasts(username){
        let res = await this.request(`users/${username}/fav-podcast`);
        return res.favPods;
    }

    /** add a podcast to user's favorite 
     * returns added podcast's feedId#
    */
    static async addFavPodcasts(username, feedId, podData){
        let res = await this.request(`users/${username}/fav-podcast/${feedId}`, podData, "post");
        return res.added;
    }

    /** delete a podcast from user's favorite 
     * returns deleted podcast's feedId#
    */
    static async deleteFavPodcasts(username, feedId){
        let res = await this.request(`users/${username}/fav-podcast/${feedId}`, {}, "delete");
        return res.deleted;
    }

    // ====== for user's podcasts reviews =======//
    /** add user's reviews 
     * returns { id, userId, feedId, comment, rating }
    */
    static async addReviews(username, feedId, data){
        data = {...data, rating: +(data.rating)};
        let res = await this.request(`users/${username}/reviews/${feedId}`, data, "post");
        return res.newReview;
    }

    /** update user's reviews 
     * returns { id, user_id, feed_id, comment, rating }
    */
    static async updateReviews(username, reviewId, data){
        data = {...data, rating: +(data.rating)};
        let res = await this.request(`users/${username}/reviews/${reviewId}`, data, "patch");
        return res.review;
    }

    /** delete user's reviews 
     * returns deleted review's id#
    */
    static async deleteReviews(username, reviewId){
        let res = await this.request(`users/${username}/reviews/${reviewId}`, {}, "delete");
        return res.deleted;
    }

    // ====== for podcast routes =======//
    /** search and get podcasts 
     * returns {data:[{podcast1}, {podcast2}, etc...], count: int}
    */
    static async searchPodcasts(userInput){
        let res= await this.request(`podcasts/?term=${userInput}`);
        return res; 
    }

    /** get trending podcasts and podcast by categories 
     * returns [{podcast1}, {podcast2}, etc.. ]
    */
    static async getTrendingPodcasts(category){
        let baseUrl =`podcasts/trending`;
        let query = baseUrl +(category ? `?category=${category}` : '');
        let res = await this.request(query);
        return res; 
    }

    /** get episodes of a podcast 
     * {feed:{podcast}, episodeData:{count:Int, episodes:[{episode1}, {episode2}]}}
    */
    static async getEpisodes(feedId){
        let res= await this.request(`podcasts/${feedId}/episodes`);
        return res; 
    }

    /** get reviews of a podcast 
     * { reviews: [{id, userId, username, feedId, comment, rating, createdAt}, {...},{}],
             avgRating: Number }
    */
    static async getReviews(feedId){
            let res= await this.request(`podcasts/${feedId}/reviews`);
            return res; 
    }   

    /** get categories 
     * returns [{id, categoryName}, {}, {} ...]
    */
    static async getCategories(){
        let res = await this.request('podcasts/categories');
        return res.categories;
    }
}

export default PodApi;