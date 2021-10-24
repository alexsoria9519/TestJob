const { response } = require('express');
const User = require('../models/users');


let insertDatauser = async (body) => {
    if (body.length > 0) {
        for (const userData of body) {
            const user = new User(userData);
            await user.save();
        }
    }
}


const importDataUsers = (req, res = response) => {
    const body = req.body;
    insertDatauser(body);

    res.status(200).json({
        msg: 'Post Api - Controller',
        body
    });
}

const importFileDataUsers = (req, res = response) => {
    const body = req.body;

    const file = req.files.data;
    const fileData = file.data.toString('utf8');
    insertDatauser(JSON.parse(fileData));

    res.status(200).json({
        msg: 'Post Api - Controller',
    });
}

module.exports = {
    importDataUsers,
    importFileDataUsers
}