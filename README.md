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
Tested on: Ubuntu 16.04.6 LTS (Xenial Xerus), Ubuntu 18.04.2 LTS (Bionic Beaver) <br />

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
1. `DIST_PORT` application will run on
2. Any `SECRET` String 
3. `DATABASE` credentials
4. `ROOT` Domain name
5. `PORT_PRIVATE` Port address

```dotenv
PORT_PRIVATE=XXX
JWT_SECRET=XXXX
DATABASE=mongodb://LOGIN:PASSWORD
ROOT=XXXX
DIST_PORT=XXXX
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

-------

### Nginx 
Example Nginx config could be used to run application: <br />
(`letsencrypt` service is used in example in order to run application on `https` ) <br />
```
server {
    listen 80;
    listen [::]:80;
    server_name DOMAIN.com www.DOMAIN.com;
    return 301 https://DOMAIN.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name DOMAIN.com www.DOMAIN.com;
    access_log /var/log/nginx/DOMAIN.com;
    ssl on;
    ssl_certificate /etc/letsencrypt/live/DOMAIN.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/DOMAIN.com/privkey.pem;
    include snippets/ssl-params.conf;
    ...
    CONFIGURATION
    ...    
    # text/html is always compressed by gzip module return 302
    # https://$server_name$request_uri;

   location / {
        proxy_pass http://localhost:DIST_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/graphql {
        proxy_pass http://localhost:PORT_PRIVATE/graphql;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Ho $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/auth {  
        proxy_pass http://localhost:PORT_PRIVATE/auth;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Docker

#### Description
Application could also be executed inside Docker container <br />
During build it will automatically pull `Node 12` Docker image and `pm2` <br />
Install all packets inside, run tests and execute container <br />
`pm2` scripts are configured inside `process.yml` file and are going to be executed during build 

#### Requirements
1. Docker should be installed and configured on the hosting system <br />
2. Application PORTS should be configured inside `Dockerfile` and `scripts.sh` <br />

#### Configuration
Sets up `PORT_PRIVATE` and `DIST_PORT` (same as in `.env` file): <br />
`nano Dockerfile` <br />
Both ports should be listed as follows in any order: <br />
```dockerfile
 # Exposing application ports
 EXPOSE 8439
 EXPOSE 4789
```
`Ctrl + X` and Save changes <br />
`nano scripts.sh` <br />
Both ports should be listed as follows at the top: <br />
```bash
# Application ports
PORTS=(8439 4789) # Ports list to be exposed
CONTAINER_NAME='work-book'
```     
`Ctrl + X` and Save changes <br />
Then you probably will need to make it executable: <br />
`sudo chmod +x ./scripts.sh` <br />
To run container: <br />
`./scripts.sh` <br />
In that case script will find containers listening to configured ports, <br />
remove them, then build new one and execute it. <br />

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

Tests cover application components, GraphQL queries, actions, utils, and helper functions.

> How to run unit tests

Should run in directory: `./work-book/client` <br />
`npm install` <br />
`npm run test` <br />

## ToDo
1. ~~Implement live search by keyword~~ <br/>
2. ~~Implement posts pagination~~ <br/>
3. ~~Add Docker readme section~~ <br/>
4. ~~Add Stylelint~~ <br/>
5. Remove moment, use lightweight lib instead (dayjs?) <br />

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2019 © <a href="/" target="_blank">work-book</a>


