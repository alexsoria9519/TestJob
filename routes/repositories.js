const { Router } = require('express');
const { importFileDataRepository  } = require('../controllers/repositories');

const router = new Router();



router.post('/import', importFileDataRepository);




module.exports = router;