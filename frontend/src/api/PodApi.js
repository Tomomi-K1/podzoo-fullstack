import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 * Static class tying together methods used to get/send to to the backend API.
 * until user login is established 
 */
class PodApi{
    //  == store received token ==== //
    static token;

    // ============ method to make api call easier  ======== //
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method, this.token);

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

    /** Get the current user. */
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Get token for login from username, password. */
    static async login(data) {
        let res = await this.request(`users/login`, data, "post");
        return res.token;
    }

    /** Signup  */
    static async signup(data) {
        let res = await this.request(`users/register`, data, "post");
        return res.token;
    }

    /** update user profile page. */
    static async updateProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }


    /** delete user */
    static async deleteUser(username){
        let res = await this.request(`users/${username}`, "delete");
        return res.deleted
    }

    // ====== for user's favorite podcasts =======//
    /** get user's favorite podcasts */
    static async getFavPodcasts(username){
        let res = await this.request(`users/${username}/fav-podcast`);
        return res.favPods;
    }

    /** add a podcast to user's favorite */
    static async addFavPodcasts(username, feedId, podData){
        let res = await this.request(`users/${username}/fav-podcast/${feedId}`, podData, "post");
        console.debug(`addFavPodcasts run in PodApi`, res);
        return res.added;
    }

    /** delete a podcast from user's favorite */
    static async deleteFavPodcasts(username, feedId){
        let res = await this.request(`users/${username}/fav-podcast/${feedId}`, {}, "delete");
        return res.deleted;
    }

    // ====== for user's podcasts reviews =======//
    /** add user's reviews */
    static async addReviews(username, feedId, data){
        data = {...data, rating: +(data.rating)};
        console.log(data);
        let res = await this.request(`users/${username}/reviews/${feedId}`, data, "post");
        return res.newReview;
    }

    /** update user's reviews */
    static async updateReviews(username, reviewId, data){
        data = {...data, rating: +(data.rating)};
        let res = await this.request(`users/${username}/reviews/${reviewId}`, data, "patch");
        return res.review;
    }

    /** delete user's reviews */
    static async deleteReviews(username, reviewId){
        let res = await this.request(`users/${username}/reviews/${reviewId}`, {}, "delete");
        return res.deleted;
    }

    // ====== for podcast routes =======//
    /** search and get podcasts */
    static async searchPodcasts(userInput){
        let res= await this.request(`podcasts/?term=${userInput}`);
        return res; 
    }

    /** get trending podcasts and podcast by categories */
    static async getTrendingPodcasts(category){
        let baseUrl =`podcasts/trending`;
        let query = baseUrl +(category ? `?category=${category}` : '');
        let res = await this.request(query);
        return res; 
    }

    /** get episodes of a podcast */
    static async getEpisodes(feedId){
        let res= await this.request(`podcasts/${feedId}/episodes`);
        return res; 
    }

    /** get reviews of a podcast */
    static async getReviews(feedId){
            let res= await this.request(`podcasts/${feedId}/reviews`);
            console.log(`getReviews in PodApi ran ${res}`)
            return res; 
    }   

    /** get categories */
    static async getCategories(){
        let res = await this.request('podcasts/categories');
        return res.categories;
    }
}

// for now use token for {username: test1, password: password1}
// PodApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNjg5NzIzMzc0fQ.ShElsvZOmlUWqSMuX_Wlk_olDSpl1XI6JCbX4YEfSkg";

export default PodApi;