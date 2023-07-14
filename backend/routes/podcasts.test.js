


"use strict";
process.env.NODE_ENV = "test";
const request = require("supertest");

const db = require("../db.js");
const app = require("../app.js");
const { API_KEY, API_SECRET } = require('../secret')
const api = require('podcast-index-api')(API_KEY, API_SECRET) ;

const {
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u3Token
} = require("./_testCommon.js");

// jest.mock('podcast-index-api');

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/* GET /podcasts/[feedid]/reviews
-no auth necessary
{id, userId, username, feedId, comment, rating, createdAt}
*/
describe('get reviews for specific podcasts', () => {
    it('works', async () => {
        const res = await request(app)
                        .get('/podcasts/200/reviews');
        expect(res.body).toEqual({reviews:[
            {
                id: 4,
                userId: 1,
                username: 'user1',
                feedId: 200,
                comment: 'comment1-2',
                rating: 4,
                createdAt: expect.any(String)
            },
            {
                id: 2,
                userId: 2,
                username: 'user2',
                feedId: 200,
                comment: 'comment2',
                rating: 2,
                createdAt: expect.any(String)
            }          
        ]})
    }) 

    it('returns empty array if there is no reviews', async () => {
        const res = await request(app)
                        .get('/podcasts/500/reviews');
        expect(res.body).toEqual({
            reviews:[]
        })
    })
})


// == GET /podcasts/?term =''
// -search podcast by terms
// router.get('/', async (req, res, next) => {
//     let term = req.query.term; 
//     const queryItems={ q:term, max: 20, fulltext: true, pretty:true}
//     const searchPath ='search/byterm'
//     try{
//         const resp = await api.custom(path=searchPath, queries=queryItems);
//         const data = simplifyPod(resp.feeds);
//         return res.json({data, count:resp.count});
//     } catch(err){
//         return next(err);
//     }
// })


