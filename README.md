Created by: Jimuel William P. Banawan

# About this project

This project was created with React, Apollo, GraphQl, and Prisma

## Project Set-up

Here is a quick run through on setting up the database and migrating it.


First and foremost we need to install the dependencies, both on the root folder and on the server folder
```
npm install
cd server
npm install
cd ..
```

After installing the necessary dependencies, you should be able to run both the front-end and the server on different terminals
```
# Terminal 1 - Front end
npm start

# Terminal 2 - Server
yarn dev
```

> Disclaimer: You may have noticed that I have also included the database ('dev.db') in this project. Though it may be a bad practice to include the database in the repository and instead rely on migrations and fixtures, I have included this sqlite database instead for the sake of simplicity.


## Using the Application
I have created starting users for the application, and you may also choose to "Register" under the "Login" page.

**User Credentials:**
```
# User 1
email: john@smith.com
password: 1234

# User 2
email: test@test.com
password: 1234
```

Once you have logged in the application, you will be able to "Submit" new properties, and also "Rent" existing Properties and view its renters

The "Search" function is also available once you are logged in. Though it will only look up for properties.

# Testing the Application
> Dislaimer: The unit tests of this application is not fully developed due to the lack of remaining time (and knowledge). What you are about to see is the amount of information that I was able to learn through this week regarding testing with this technology.

First, go to the `/server/` directory, and enter the following command
```
npm test
```

This should automate all the tests and should result in a success.

## P.S. Potential bugs/errors that may appear through the Application
These are the potential bugs that I think might happen in the application. I would have debugged them but I would require more knowledge regarding apollo, graphql and react.

- The properties list might not show all of the existing properties after using the Search function
- The search function does not have an Autocomplete feature, but it searches as you type on the field. This might cause some bugs, specially if you add a number of properties.
- Data validation may not be handled very well
- Errors are usually thrown as feedback and does not have a component or a display of its own
- The "Feed" query may fail to destructure after "Renting" a property