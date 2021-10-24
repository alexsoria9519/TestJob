const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.testPath = '/api/test';
        this.gitPath = '/api/github';
        this.userPath = '/api/user';
        this.repositoryPath = '/api/repos';

        //Connect to BD
        this.database();


        // Middlewares
        this.middlewares();

        // Application routes
        this.routes();
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Main Route');
        });

        // Config test routes
        this.app.use(this.testPath, require('../routes/test'));
        this.app.use(this.gitPath, require('../routes/github'));
        this.app.use(this.userPath, require('../routes/users'));
        this.app.use(this.repositoryPath, require('../routes/repositories'));

    }

    middlewares(){
        //CORS
        this.app.use(cors());

         // Body Parser
         
         this.app.use(bodyParser.json());
         this.app.use(bodyParser.urlencoded({extended: true}));

         // Middleware Files
         this.app.use(fileUpload());

    }

    async database(){
        // call to database config
        await dbConnection();
    }



    listen() {
        this.app.listen(this.port, () => {
            console.log('Listen on 3000 port');
        });
    }


}

module.exports = Server;