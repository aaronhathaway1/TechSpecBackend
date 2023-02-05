const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/cars');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createCar);

router.put('/:id', contactsController.updateCar);

router.delete('/:id', contactsController.deleteCar);

module.exports = router;
