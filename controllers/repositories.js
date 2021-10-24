const { response } = require('express');
const Repository = require('../models/repositories');

/* Method that iterates the data obtained from the JSON object*/
let insertDataRepository = (body) => {
    if (body.length > 0) {
        for (const repositoryData of body) {
            insert(repositoryData)
        }
    }
}

/* Method that allows to store in the database */

const insert = async (data) =>{
    try{
        const repo = new Repository(data);
        await repo.save();
    }catch(err){
        throw new Error(err); 
    }
}

/* This method allows to get the json file from the import */

const importFileDataRepository = (req, res = response) => {
    const body = req.body;


    if(!req.files || Object.keys(req.files ).length === 0 ||  !req.files.data ){
        res.status(400).json({msg: `Bad request, don't exist any file to import`, ok: false});
    }

    const file = req.files.data;
    
    // Must be a json file
    if(file.mimetype !== 'application/json'){
        res.status(400).json({msg: `Bad request, the file extension must be .json`, ok: false});
    }

    const fileData = file.data.toString('utf8');
    insertDataRepository(JSON.parse(fileData));// Convert data file to String

    res.status(200).json({
        msg: `Successful data import`,
        ok: true
    });
}

module.exports = {
    importFileDataRepository
}
