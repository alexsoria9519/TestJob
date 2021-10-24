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

const insert = async (data) =>{
    try{
        const user = new User(data);
        await user.save();
    }catch(err){
        throw new Error(err); 
    }
}


// const importDataUsers = (req, res = response) => {
//     const body = req.body;
//     insertDatauser(body);

//     res.status(200).json({
//         msg: 'Post Api - Controller',
//         body
//     });
// }

/* This method allows to get the json file from the import */


const importFileDataUsers = (req, res = response) => {
    const body = req.body;

    
    if(!req.files || Object.keys(req.files ).length === 0 ||  !req.files.data ){
        res.status(400).json({msg: `Bad request, don't exist any file to import`, ok: false});
    }

    const file = req.files.data;

    // Must be a json file
    if(file.mimetype !== 'application/json'){
        res.status(400).json({msg: `Bad request, the file extension must be .json`, ok: false});
    }

    const fileData = file.data.toString('utf8'); // Convert data file to String
    insertDatauser(JSON.parse(fileData));

    res.status(200).json({
        msg: `Successful data import`,
        ok: true
    });
}

module.exports = {
    importFileDataUsers
}