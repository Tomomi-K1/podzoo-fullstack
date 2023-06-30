"use strict";
afterAll(() => {
  process.env.NODE_ENV = "production";
})

describe("config can come from env", function(){
  beforeEach(() => {
    // reset the module values before each test 
    jest.resetModules()
    process.env.NODE_ENV = "production";
    })
  
  test("works production mode", function(){
    
    process.env.PORT = "5000";
    process.env.DATABASE_URL ="other";
    process.env.NODE_ENV ="production";

    let config =require("./config");
    console.log(`config: ${config}`)
    expect(config.PORT).toEqual(5000);
    expect(config.BCRYPT_WORK_FACTOR).toEqual(12)
    expect(config.getDatabaseUri()).toEqual("other")
    
    delete process.env.PORT
    delete process.env.DATABASE_URL
    delete process.env.NODE_ENV
  })

  test("works when PORT and DATABASE_URL is not defined", function(){
    process.env.NODE_ENV ="production"    
    let config2 =require("./config");
    
    expect(config2.getDatabaseUri()).toEqual("postgresql:///podsearch_db");
    expect(config2.BCRYPT_WORK_FACTOR).toEqual(12)
    expect(config2.PORT).toEqual(3001);
  })

  test("works test mode", function(){
    process.env.NODE_ENV ="test";

    let config3 =require("./config");
    console.log(`config3: ${config3}`)
    expect(config3.PORT).toEqual(3001);
    expect(config3.BCRYPT_WORK_FACTOR).toEqual(1)
    expect(config3.getDatabaseUri()).toEqual("postgresql:///podsearch_db_test")
  })
})