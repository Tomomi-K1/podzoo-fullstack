"use strict";
process.env.NODE_ENV = "test";
const { NotFoundError,
        BadRequestError,
        UnauthorizedError,
        ExpressError} = require("../expressError");
const db = require("../db.js");
const Podcast = require("./podcast.js")
const { BCRYPT_WORK_FACTOR } = require('../config');
const { commonBeforeEach,
        commonAfterEach,
        commonAfterAll} = require("./_testCommon");
const { italic } = require("colors");

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

//  ======== getReview ============
describe('Get all reviews for a podcast', () => {
    it('gets all reviews for the pod', async () => {
        const reviews = await Podcast.getReviews(200);
        expect(reviews).toEqual([
            {
                id:4,
                userId:1,
                username:'user1',
                feedId: 200,
                comment:'comment1-2',
                rating: 4,
                createdAt: expect.any(Date)
            },
            {
                id:2,
                userId:2,
                username:'user2',
                feedId: 200,
                comment:'comment2',
                rating: 2,
                createdAt: expect.any(Date)
            }  
        ]) 
        expect(reviews.length).toEqual(2);
    }) 
})