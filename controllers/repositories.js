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

/* Method that allows get data of all repositories */
const getAllRepositories = async (req, res = response) => {
    try {
        const { limit = 5, from = 0 } = req.query; // for pagination registers
        const [total, repositories] = await Promise.all([
            Repository.count(), // Call to count register
            Repository.find() // Call to find all register
            .skip(Number(from))
            .limit(Number(limit))
        ]);

        res.status(200).json({
            total,
            data: repositories,
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

/* Method that allows delete a repository's data */
const deleteRepo = async (req, res = response) => {
    try {
        const { id } = req.params;
        const repo = await Repository.findByIdAndDelete(id);
        res.status(200).json({
            data: repo,
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

/* Method that allows update the repository's data */
const updateRepo = async (req, res = response) => {
    
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({
            msg: `Bad request, don't exist data to update`,
            ok: false
        });
    }

    try {
        const { id } = req.params;
        const body = req.body;
        const repo = await Repository.findByIdAndUpdate(id, body);
        res.status(200).json({
            data: repo,
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

/* Method that allows get the repository's data */
const getRepoData = async (req, res = response) => {
    try {
        const { id } = req.params;
        const repo = await Repository.findById(id);
        res.status(200).json({
            data: repo,
            ok: true
        });
    } catch (err) {
        res.status(500).json({
            msg: `An error occurred while update repository data`,
            ok: false,
            err
        });
    }
}




module.exports = {
    importFileDataRepository,
    getAllRepositories,
    deleteRepo,
    updateRepo,
    getRepoData
}
