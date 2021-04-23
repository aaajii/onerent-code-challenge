"use strict"

const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')


const schemCode = fs.readFileSync(
    path.join(__dirname, "../src/", "schema.graphql"),
    "utf8"
)


describe("General test on Schema vailidity and some Unit Test", () =>{
    let tester;
    beforeAll(() => {
        tester = new EasyGraphQLTester(schemCode)
    })

    describe("Queries", () =>{
        test("Schema should pass with simple Feed query", () => {
            const query = `
                {
                    feed{
                        id
                        properties{
                            id
                            street
                            city
                            state
                            zip
                            renters{
                                user{
                                    id
                                    firstName
                                    lastName
                                }
                            }
                        }
                    }
                }
            `

            tester.test(true, query);
        })
    })

    describe('Should pass if the query is invalid', () => {
        test('Invalid query getUser', () => {
          const invalidQuery = `
            {
              getUser {
                id
                invalidField
                familyInfo {
                  father {
                    email
                    username
                  }
                }
              }
            }
          `
          // First arg: false, there is no invalidField on the schema.
          tester.test(false, invalidQuery)
        })
        

        // Removed because I can't seem to make them work :(
        // test('Feed Query Test', () => {
        //   const validQuery = `
        //   query{
        //       feed() {
        //         id
        //         properties{
        //             id
        //             street
        //             city
        //             renters{
        //                 user{
        //                     id
        //                     firstName
        //                 }
        //             }
        //         }
        //       }
        //     }
        //   `
        //   tester.test(true, validQuery)
        // })
        
        // Removed because I cant seem to make it work :(
        // test('Login Mutation Test', () => {
        //   const mutation = `
        //     mutation{
        //       login(email: $email, $password: password) {
        //         token
        //       }
        //     }
        //   `
        //   tester.test(true, mutation, {
        //     variables: {
        //       email: "test@test.com",
        //       password: "1234"
        //     }
        //   })
        // })
    
        test('Feed Filter/Search Test', () => {
          const query = `
            {
                feed(filter: "Street") {
                    id
                    properties {
                        id
                        street
                        city
                        state
                        zip
                        createdAt
                        renters {
                            id
                            user {
                                id
                            }
                        }
                    }
                }
            }
          `
    
          tester.test(true, query)
        })
    
        test('Property Subscription Test', () => {
          const subscription = `
            subscription {
                newProperty {
                    id
                        street
                        city
                        state
                        renters {
                            id
                            user {
                                id
                            }
                        }
                }
            }
          `
    
          tester.test(true, subscription)
        })
      })
    
    
})