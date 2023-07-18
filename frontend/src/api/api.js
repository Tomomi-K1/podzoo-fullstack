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
        console.debug("API Call:", endpoint, data, method);

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

  /** get user's favorite podcasts */
  static async getFavPodcasts(username){
    let res = await this.request(`users/${username}/fav-podcast`);
    return res.favPods;


  

  
}

export default PodApi;