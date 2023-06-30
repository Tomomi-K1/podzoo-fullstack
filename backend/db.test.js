"use strict";

let db;
afterAll(async() => {
  await db.end();
})

describe("config can come from env", function(){
  
  beforeEach(() => {
    jest.resetModules()
    })

  afterEach(async() => {
      await db.end();
    })

  test("connects to correct db in production mode", function(){
  
    process.env.NODE_ENV ="production";
    db =require("./db");
    expect(db.database).toEqual("podsearch_db")
  })

  test("connects to test_db in test mode", function(){
    process.env.NODE_ENV ="test";
    db =require("./db");
    console.log(process.env.NODE_ENV)
    console.log(db.database)
    expect(db.database).toEqual("podsearch_db_test")
    delete process.env.NODE_ENV
  })
})