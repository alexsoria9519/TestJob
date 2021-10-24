const mongoose = require('mongoose');

const dbConnection = async () => {
    // Set connection with mongoDB
    try{

        await mongoose.connect(process.env.MONGO_DB_CDN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('BD Online');

    }catch(err){
        console.error('Error ', err);
        throw new Error('Error to initializate the database server');
    }
}


module.exports = {
    dbConnection
}