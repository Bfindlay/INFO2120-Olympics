# Olympics Scheduling App 

> A simple Olympics Scheduling App written in Node/React JS

## License
MIT License

Steps
1. Install nodeJS
https://nodejs.org/en/
2. Install postgres for localhost
https://www.enterprisedb.com/downloads/postgres-postgresql-downloads


3. npm install | Run after a git clone in terminal/cmd in the working directory.

4. Create dbconfig.js file with;
const config = {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    database: '',
    password: '',
    max: 1,
    idleTimeoutMillis: 3000
};
module.exports = config;

5. npm start / nodemon (Linux/Mac) | To access site, use localhost:3000
If errors are encountered; try
npm install -g module-name
npm install --save module-name
npm install module-name
npm build

6. npm run start-dev | Used to rebuild modules after changes

Other info
React components; INFO2120-Olympics/src/components
Queries used by db; /API.js

Use data from https://edstem.com.au/courses/442/discussion/38655 for local database. 
Will need to add CREATE Schema olympics; and SET Schema 'olympics'; in the ddl file.
