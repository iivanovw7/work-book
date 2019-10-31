# WorkBook application 

SPA blog application, created for practicing purposes.
Mainly for practicing with Styled components, Styled theming, GraphQL and Apollo.
Application provides basic administration functionality such as authentication to admin control 
panel, possibility to add new posts, edit recent posts, delete posts, also admin user can check out profile page and make changes in 
contact details.
Repository contains two separate projects: FE client (React application, GraphQL Apollo client), and Backend 
API (Express GraphQL Apollo server).
This application is fully functional and tested.

Mongo db is used as a data storage.

##### Main project functionality: 
- Preview and create new posts

See more details in [Features](#features) section.

> Frontend: ReactJS, GraphQL, Apollo Client, Storeon, Axios

> Backend: NodeJS, Express, MongoDB, Mongoose, GraphQL, Apollo Server

---

## Table of Contents 

- [Requirements](#requirements)
- [Clone](#clone)
- [Installation](#installation)
- [Docker](#docker)
- [Features](#features)
- [Testing](#testing)
- [License](#license)
- [ToDo](#todo)

---

## Requirements

- [NodeJS 12.4.0](https://nodejs.org/en/) 

- [NPM 6.9.0](https://www.npmjs.com/get-npm)


### Clone

- Clone this repo to your local machine using `https://github.com/iivanovw7/work-book.git`

## Installation

For Ubuntu or Debian-based Linux distributions. <br />
Tested on: Ubuntu 16.04.6 LTS (Xenial Xerus), Ubuntu 18.04.2 LTS (Bionic Beaver)

-------

### Prepare 

- Clone repository: <br />
`git clone https://github.com/iivanovw7/work-book.git` <br />
- Navigate into the application directory <br />
`cd work-book` <br />
- Installing setup modules: <br />
`npm install` <br />
- Installing submodules: <br />
`npm run install:all` <br />
- Running tests: <br />
`npm run test` <br />

-------

### Configuring API 

Create `.env` file: <br />
`cd server` <br />
`nano .env` <br />

Fill it with configuration data:
1. `PORT` application will run on
2. Any `SECRET` String 
3. `DATABASE` credentials
4. `ROOT` Domain name

```
PORT_PRIVATE=XXX
JWT_SECRET=XXXX
DATABASE=mongodb://LOGIN:PASSWORD
ROOT=XXXX
```

Save and close `.env` <br />
`npm run start` <br />

After private API has started you should receive in console something 
like this:

```
Private api is available on port XXXX
Connected to database successfully.
``` 

-------

### Build client application and run 

If API has already started you should terminate it to make a build: <br />
`Ctrl + C` <br />
Then run (assuming you have already completed section [Prepare](#prepare) ) : <br />
Should run in directory: `./work-book` <br />
`cd client` <br />
`nano .env` <br />
Save and close empty file (needed for future purposes)
`nano webpack.prod.js` <br />
Configure value `API_URL` according to you production server URL and PORT
`cd` <br />
`npm run start` <br />

## Docker

## Features

##### Authorisation

By password and email. 

## Testing

> Libraries used:

- [Jest](https://jestjs.io/)
- [Enzyme](https://airbnb.io/enzyme/)
- [Supertest](https://github.com/visionmedia/supertest)

#### Backend Unit testing

Unit tests cover all database models, all routes including authentication routes and helper-functions as well.
   
> How to run unit tests

Should run in directory: `./work-book/server` <br />
`npm install` <br />
`npm run test` <br />

#### Frontend SPA testing

Tests cover application components, qraphQL queries, actions, utils, and helper functions.

> How to run unit tests

Should run in directory: `./work-book/client` <br />
`npm install` <br />
`npm run test` <br />

## ToDo
1. ~~Implement live search by keyword~~ <br/>
2. Implement posts pagination <br/>
3. Add Docker readme section <br/>
4. ~~Add Stylelint~~ <br/>

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2019 © <a href="/" target="_blank">work-book</a>


