const { Router } = require('express');
const { check } = require('express-validator');

const { existsId } = require('../helpers/db-validators');
const {
    getAllUsers,
    importFileDataUsers,
    deleteUser,
    updateUser,
    getUserData
} = require('../controllers/users');

const {validate} = require('../middlewares/validate');

const router = new Router();


/* Route that allows importing user data from a JSON file*/
router.post('/import/file', importFileDataUsers);

/* Route that allows to obtain all the data of users registered in the DB*/
router.get('/all', getAllUsers);

/* Route that allows to obtain the data of a user*/
router.get('/:id', [
    check('id', 'The id is invalid').isMongoId(),
    check('id').custom(existsId),
    validate
], getUserData);

/* Route that allows modifying a user's data*/
router.put('/:id', [
    check('id', 'The id is invalid').isMongoId(),
    check('id').custom(existsId),
    validate
], updateUser);

/* Route that allows deleting a user's data */
router.delete('/:id', [
    check('id', 'The id is invalid').isMongoId(),
    check('id').custom(existsId),
    validate
], deleteUser);





module.exports = router;