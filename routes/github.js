const { Router } = require('express');
const { getAccountData } = require('../controllers/github');

const router = new Router();



router.get('/', getAccountData);




module.exports = router;