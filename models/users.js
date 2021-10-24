const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    type: {
        type: String
    },
    url: {
        type: String
    },
    avatar_url: {
        type: String
    },
    login: {
        type: String
    },
    name: {
        type: String
    },
    bio: {
        type: String
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    emails: [Object],
    billing_plan: {
        type: Object
    },
    created_at: {
        type: Date
    },

});

module.exports = model('User', UserSchema);