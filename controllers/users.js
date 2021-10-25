const { response } = require('express');
const User = require('../models/users');


/* Method that iterates the data obtained from the JSON object*/

let insertDatauser = (body) => {

    if (body.length > 0) {
        for (const userData of body) {
            insert(userData);
        }
    }
}

/* Method that allows to store in the database */

const insert = async (data) => {
    try {
        const user = new User(data);
        await user.save();
    } catch (err) {
        throw new Error(err);
    }
}

/* Method that allows get data of all users */
const getAllUsers = async (req, res = response) => {
    try {
        const { limit = 5, from = 0 } = req.query; // for pagination registers
        const [total, users] = await Promise.all([
            User.count(), // Call to count register
            User.find() // Call to find all register
            .skip(Number(from))
            //.limit(Number(limit))
        ]);

        res.status(200).json({
            total,
            data: users,
            ok: true
        });
    } catch (err) {
        res.status(500).json({
            msg: `An error occurred while obtaining the data`,
            ok: false,
            err
        });
        //throw new Error(err);
    }
}

/* Method that allows delete a user's data */
const deleteUser = async (req, res = response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({
            data: user,
            ok: true,
            msg: `Has been successfully deleted`
        });
    } catch (err) {
        res.status(500).json({
            msg: `An error occurred while deleting user data`,
            ok: false,
            err
        });
    }
}

/* Method that allows update the user's data */
const updateUser = async (req, res = response) => {
    
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({
            msg: `Bad request, don't exist data to update`,
            ok: false
        });
    }

    try {
        const { id } = req.params;
        const body = req.body;
        const user = await User.findByIdAndUpdate(id, body);
        res.status(200).json({
            data: user,
            ok: true,
            msg: `Has been successfully updated`
        });
    } catch (err) {
        res.status(500).json({
            msg: `An error occurred while update user data`,
            ok: false,
            err
        });
    }
}

/* Method that allows get the user's data */
const getUserData = async (req, res = response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({
            data: user,
            ok: true
        });
    } catch (err) {
        res.status(500).json({
            msg: `An error occurred while update user data`,
            ok: false,
            err
        });
    }
}

/* This method allows get the json file from the import */

const importFileDataUsers = (req, res = response) => {
    const body = req.body;


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.data) {
        res.status(400).json({
            msg: `Bad request, don't exist any file to import`,
            ok: false
        });
    }

    const file = req.files.data;

    // Must be a json file
    if (file.mimetype !== 'application/json') {
        res.status(400).json({
            msg: `Bad request, the file extension must be .json`,
            ok: false
        });
    }

    const fileData = file.data.toString('utf8'); // Convert data file to String
    insertDatauser(JSON.parse(fileData));

    res.status(200).json({
        msg: `Successful data import`,
        ok: true
    });
}

module.exports = {
    importFileDataUsers,
    getAllUsers,
    deleteUser,
    updateUser,
    getUserData
}