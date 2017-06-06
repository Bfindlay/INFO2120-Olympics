# Olympics Scheduling App 

> A simple Olympics Scheduling App written in Node/React JS

## License
MIT License

## Using the Program
1. ```Git Clone```
2. ```npm install``` 
3. Create dbconfig.js file in the root project directory
```
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
```
5. run ``` node server.js``` 
6.  App is now running on ``` localhost:3000 ```

## Other info
Queries used by db are located in  /API.js

