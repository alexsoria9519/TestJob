
const User = require('../models/users');


/* method that checks if the id exists in the DB */
const existsId = async( id ) => {
    const exists = await User.findById(id);
    if ( !exists ) {
        throw new Error(`The id does not exist ${ id }`);
    }
}

module.exports = {
    existsId
}
