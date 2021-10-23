const express = require('express');
const cors = require('cors');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.testPath = '/api/test';
        this.gitPath = '/api/github';


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

    }

    middlewares(){
        //CORS
        this.app.use(cors());
    }



    listen() {
        this.app.listen(this.port, () => {
            console.log('Listen on 3000 port');
        });
    }


}

module.exports = Server;