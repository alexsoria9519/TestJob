const { Router } = require('express');
const {
    importFileDataRepository,
    getAllRepositories,
    updateRepo,
    deleteRepo,
    getRepoData
} = require('../controllers/repositories');

const { check } = require('express-validator');

const { existsIdRepository } = require('../helpers/db-validators');
const { validate } = require('../middlewares/validate');

const router = new Router();


/* Route that allows importing repository data from a JSON file*/
router.post('/import', importFileDataRepository);

/* Route that allows to obtain all the data of repositories registered in the DB*/
router.get('/all', getAllRepositories);

/* Route that allows to obtain the data of a repository*/
router.get('/:id', [
    check('id', 'The id is invalid').isMongoId(),
    check('id').custom(existsIdRepository),
    validate
], getRepoData);

/* Route that allows modifying a repository's data*/
router.put('/:id', [
    check('id', 'The id is invalid').isMongoId(),
    check('id').custom(existsIdRepository),
    validate
], updateRepo);

/* Route that allows deleting a repository's data */
router.delete('/:id', [
    check('id', 'The id is invalid').isMongoId(),
    check('id').custom(existsIdRepository),
    validate
], deleteRepo);




module.exports = router;