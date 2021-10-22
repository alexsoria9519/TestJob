const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.routes();
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Main Route');
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listen on 3000 port');
        });
    }


}

module.exports = Server;