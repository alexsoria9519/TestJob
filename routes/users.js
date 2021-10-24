const { Router } = require('express');
const { importDataUsers, importFileDataUsers } = require('../controllers/users');

const router = new Router();



router.post('/import', importDataUsers);
router.post('/import/file', importFileDataUsers);




module.exports = router;