const { Router } = require('express');
const { testGet } = require('../controllers/test');

const router = new Router();



router.get('/', testGet);




module.exports = router;