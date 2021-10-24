const { Schema, model } = require('mongoose');


const RepositorySchema = Schema({
    type: {
        type: String
      },
      url: {
        type: String
    },
      owner: {
        type: String
    },
      name: {
        type: String
    },
     description: {
        type: String
    },
     website: {
        type: String
    },
      private: {
        type: Boolean
    },
      has_issues: {
        type: Boolean
    },
      has_wiki: {
        type: Boolean
    },
      has_downloads: {
        type: Boolean
    },
      labels: [Object],
      collaborators: [Object],
      created_at: {
        type: Date
    },
      git_url: {
        type: String
    },
      default_branch: {
        type: String
    },
      webhooks: [Object],
      public_keys: [Object]
    });
 




module.exports = model('Repository', RepositorySchema);