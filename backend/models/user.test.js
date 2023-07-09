"use strict";
process.env.NODE_ENV = "test";
const { NotFoundError,
        BadRequestError,
        UnauthorizedError,
        ExpressError} = require("../expressError");
const db = require("../db.js");
const User = require("./user.js");
const { BCRYPT_WORK_FACTOR } = require('../config');
const { commonBeforeEach,
        commonAfterEach,
        commonAfterAll} = require("./_testCommon");

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

//  ======== authenticate ============
describe('authenticate', () => {
  it('should authenticate', async () => {
    const user = await User.authenticate('user1','password1');
    expect(user).toEqual({
      username: 'user1',
      email:'user1@gmail.com'
    }) 
  }) 

  it('give unauth error with wrong password', async () => {
    try{
    await User.authenticate('user1','password2');
    fail();
    } catch(err){
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }  
  })

  it('give unauth error with non-existing username', async () => {
    try{
    await User.authenticate('no-user','password2');
    fail();
    } catch(err){
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }  
  })
})

//  ======== register ============
describe('register a user', () => {
  it('should create a user', async () => {
    const newUser = { username:'user4', 
                      password:'password4', 
                      email:'user4@gmail.com'}
    const user = await User.register(newUser);
    expect(user).toEqual({
      id: expect.any(Number),
      username: 'user4',
      email:'user4@gmail.com'
    })
  })

  it('should give BadReq Error with dupe username', async () => {
      try{
        const newUser = { username:'user1', 
                          password:'password1', 
                          email:'user1@gmail.com'}
        const user = await User.register(newUser);
        fail();
      } catch (err){
        expect(err instanceof BadRequestError).toBeTruthy();
      };
    })  

  it('should give BadReq Error with over 25 letter username', async () => {
      try{
        const newUser = { username:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
                          password:'password4', 
                          email:'user4@gmail.com'}
        const user = await User.register(newUser);
        fail();
      } catch (err){
        expect(err instanceof BadRequestError).toBeTruthy();
      };
  }) 
}) 

//  ======== get user info ============
describe('get user info', () => {
  it('should successfully retrieve a  user', async () => {
    const user = await User.get('user1');
    expect(user).toEqual({
      id: expect.any(Number),
      username: 'user1',
      email:'user1@gmail.com',
      fav: [100]
    })
  })

  it('should throw NotFoundError with wrong username', async () => {
      try{
        const user = await User.get('user111');
        fail();
      } catch (err){
        expect(err instanceof NotFoundError).toBeTruthy();
      };
    })  
}) 

//  ======== update user info ============
describe('update user info', () => {
  it('should successfully update user data', async () => {
    const updateData = { email:'user11@gmail.com'}
    const user = await User.update('user1', updateData);
    expect(user).toEqual({
      username: 'user1',
      email:'user11@gmail.com'
    })
  })

  it('should throw NotFoundError with wrong username', async () => {
      try{
        const updateData = { email:'user11@gmail.com'}
        const user = await User.update('user111', updateData);
        fail();
      } catch (err){
        expect(err instanceof NotFoundError).toBeTruthy();
      };
    })  
}) 

//  ======== delete a user ============
describe('delete a user', () => {
  it('should successfully delete a user', async () => {
    await User.delete('user1');
    const res = await db.query(`SELECT * FROM users WHERE username ='user1'`);
    expect(res.rows.length).toEqual(0);
  })

  it('should throw NotFoundError with non-existing username', async () => {
      try{
        await User.delete('user1111');
        fail();
      } catch (err){
        expect(err instanceof NotFoundError).toBeTruthy();
      };
    })  
}) 

//  ======== get a user's fav podcasts ============
describe('get fav podcasts of a user', () => {
  it('should get all fav podcasts of a user', async () => {
    const favPods = await User.getAllFav('user1');
    expect(favPods).toEqual([{
      id: expect.any(Number),
      userId: 1, 
      feedId: 100, 
      author:'author1',
      title: 'title1', 
      artworkUrl:'artwork1.com'
    }])
  })

  it('should throw NotFoundError with non-existing username', async () => {
      try{
        await User.getAllFav('user111');
        fail();
      } catch (err){
        expect(err instanceof NotFoundError).toBeTruthy();
      };
  })  

  it('should not throw Error when a user does not have any fav pods', async () => {
      const favPods =await User.getAllFav('user10');
      expect(favPods).toEqual([]);
  }) 
})

//  ========  add favorites podcasts  ============
describe('add fav podcasts', () => {
  it('should add a fav podcast', async () => {
    const podData ={
        feedId:1000,
        author: 'author1000',
        title:'title1000',
        artworkUrl: 'artwork1000.com'
    }
    await User.addFav('user1', podData);

    const favPods = await db.query(
      `SELECT fav_pods.id, 
              fav_pods.user_id AS "userId", 
              fav_pods.feed_id AS "feedId", 
              fav_pods.author, 
              fav_pods.title, 
              fav_pods.artwork_url AS "artworkUrl"
       FROM fav_pods
       JOIN users ON users.id = fav_pods.user_id
       WHERE users.username ='user1'`)
    expect(favPods.rows).toEqual([
        {
          id: expect.any(Number),
          userId: 1, 
          feedId: 100,
          author:'author1',
          title: 'title1', 
          artworkUrl:'artwork1.com'
        },
        {
        id: expect.any(Number),
        userId: 1, 
        feedId: 1000,
        author:'author1000',
        title: 'title1000', 
        artworkUrl:'artwork1000.com'
      }
    ])
  })

  it('should throw NotFoundError with non-existing username', async () => {
      try{
        await User.addFav('user111');
        fail();
      } catch (err){
        expect(err instanceof NotFoundError).toBeTruthy();
      };
  })  

  it('should throw BadReqError when adding insufficient data', async () => {
    try{
      // missing required author
      const podData = {
        feedId:1000,
        title:'title1000',
        artworkUrl: 'artwork1000.com'
    }
      await User.addFav('user1', podData);
      fail();
    } catch(err){
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  }) 

  it('should not add duplicate favorite', async () => {
    try{
      const podData ={
      feedId:100,
      author: 'author100',
      title:'title100',
      artworkUrl: 'artwork100.com'
    } 
    await User.addFav('user1', podData);
    fail();
    } catch (err){
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  })
})

//  ========  delete favorites podcasts  ============
describe('delete fav podcasts', () => {
  it('should delete a favorite podcast', async () => {
    const deletedFeed = await User.deleteFav('user1', 100);
    expect(deletedFeed).toEqual({feedId:100}) 
    const res = await db.query(
      `SELECT fav_pods.feed_id
       FROM fav_pods
       JOIN users ON users.id = fav_pods.user_id
       WHERE users.username = 'user1'`
    )
    expect(res.rows.length).toEqual(0);
  })

  it('should throw NotFoundError with non-existing username', async () => {
    try{
      await User.deleteFav('user111');
      fail();
    } catch (err){
      expect(err instanceof NotFoundError).toBeTruthy();
    };
  }) 
  
})

//  ========  add reviews  ============
describe('add reviews', () => {
  it('should add a review podcast', async () => {
    const reviewData = {
      comment: "comment101",
      rating: 1
    }
    const newReview = await User.addReview('user1', 101, reviewData);
    expect(newReview).toEqual({
      id: expect.any(Number),
      userId: 1,
      feedId: 101,
      comment: 'comment101',
      rating: 1 
    })
    
  })

  it('should throw NotFoundError with non-existing username', async () => {
    try{
      const reviewData = {
        comment: "comment101",
        rating: 1
      }
      await User.addReview('user111', 101, reviewData);
      fail();
    } catch (err){
      console.log(`test error1 ${err}`)
      expect(err instanceof NotFoundError).toBeTruthy();
    };
  }) 
  
  it('should throw BadRequestError if the user add additional review to the podcast (prevent duplicate)', async () => {
    try{
      const reviewData = {
        comment: "comment100",
        rating: 2
      }
      await User.addReview('user1', 100, reviewData);
      fail();
    } catch (err){
      console.log(`test error2 ${err}`)
      expect(err instanceof BadRequestError).toBeTruthy();
    };
  }) 
})

//  ========  update reviews  ============
describe('update reviews', () => {
  it('should update an existing review podcast', async () => {
    const reviewData = {
      comment: "updatedComment1",
      rating: 2
    }
    const newReview = await User.updateReview('user1', 1, reviewData);
    expect(newReview).toEqual({
      id: 1,
      userId: 1,
      feedId: 100,
      comment: 'updatedComment1',
      rating: 2
    })
    
  })

  it('should throw NotFoundError with non-existing username', async () => {
    try{
      const reviewData = {
        comment: "updatedComment1",
        rating: 2
      }
      await User.updateReview('user111', 1, reviewData);
      fail();
    } catch (err){
      expect(err instanceof NotFoundError).toBeTruthy();
    };
  }) 
  
  it('should throw NotFoundError for non-existing review id)', async () => {
    try{
      const reviewData = {
        feedId: 100,
        comment: "comment100",
        rating: 2
      }
      await User.updateReview('user1', 19, reviewData);
      fail();
    } catch (err){
      expect(err instanceof NotFoundError).toBeTruthy();
    };
  }) 
})

//  ========  delete a review  ============
describe('delete a review', () => {
  it('should delete a review', async () => {
    const deletedReviewId = await User.deleteReview('user1', 1);
    expect(deletedReviewId).toEqual({id:1}) 
    const res = await db.query(
      `SELECT id
       FROM reviews
       WHERE id =1 AND user_id =1`
    )
    expect(res.rows.length).toEqual(0);
  })

  it('should throw NotFoundError with non-existing username', async () => {
    try{
      await User.deleteReview('user111');
      fail();
    } catch (err){
      expect(err instanceof NotFoundError).toBeTruthy();
    };
  }) 
  
  it('should not delete if the review was not written by that user', async () => {
    try{
      await User.deleteReview('user1', 2);
      fail();
    } catch (err){
      expect(err instanceof NotFoundError).toBeTruthy();
    };
  }) 
})
