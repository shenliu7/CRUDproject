const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const { ensureAuthenticated } = require('../middleware/auth');

// Car Index Page
router.get('/', ensureAuthenticated, carController.getCars);

// New Car Page
router.get('/new', ensureAuthenticated, carController.getNewCarPage);

// Create Car
router.post('/', ensureAuthenticated, carController.createCar);

// Edit Car Page
router.get('/edit/:id', ensureAuthenticated, carController.getEditCarPage);

// Update Car
router.put('/:id', ensureAuthenticated, carController.updateCar);

// Delete Car
router.delete('/:id', ensureAuthenticated, carController.deleteCar);

// Available Cars Page
router.get('/available', ensureAuthenticated, carController.getAvailableCars);

// Rent Car
router.post('/rent/:id', ensureAuthenticated, carController.rentCar);

// Rented Cars Page
router.get('/rented', ensureAuthenticated, carController.getRentedCars);

// Return Car
router.post('/return/:id', ensureAuthenticated, carController.returnCar);

module.exports = router;


