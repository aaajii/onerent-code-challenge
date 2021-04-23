"use strict"

const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')


const schemCode = fs.readFileSync(
    path.join(__dirname, "../src/", "schema.graphql"),
    "utf8"
)


describe("Test my Schema, Query", () =>{
    let tester;
    beforeAll(() => {
        tester = new EasyGraphQLTester(schemCode)
    })

    describe("Queries", () =>{
        test("Should Pass with query", () => {
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
})