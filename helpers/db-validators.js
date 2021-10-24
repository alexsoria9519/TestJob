
const User = require('../models/users');
const Repository = require('../models/repositories');


/* method that checks if the id exists in the DB */
const existsId = async( id ) => {
    const exists = await User.findById(id);
    if ( !exists ) {
        throw new Error(`The id does not exist ${ id }`);
    }
}

/* method that checks if the id repository exists in the DB */
const existsIdRepository = async (id) =>{
    const exists = await Repository.findById(id);
    if ( !exists ) {
        throw new Error(`The id does not exist ${ id }`);
    }
}

module.exports = {
    existsId,
    existsIdRepository
}
