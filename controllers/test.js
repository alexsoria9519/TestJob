const {response} = require('express');


const testGet = (req, res = response) => {
    res.status(200).json({
        msg: 'Get Api - Controller'
    });
}

module.exports ={
    testGet
}