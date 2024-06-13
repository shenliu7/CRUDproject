const Car = require('../models/Car');

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user.id });
    res.render('cars/index', { cars });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while fetching cars');
    res.redirect('/');
  }
};

exports.getNewCarPage = (req, res) => {
  res.render('cars/new');
};

exports.createCar = async (req, res) => {
  const { make, model, year, pricePerDay } = req.body;
  const newCar = new Car({
    owner: req.user.id,
    make,
    model,
    year,
    pricePerDay,
  });
  try {
    await newCar.save();
    req.flash('success_msg', 'Car added successfully');
    res.redirect('/cars');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while adding the car');
    res.redirect('/cars');
  }
};

exports.getEditCarPage = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car.owner != req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/cars');
    }
    res.render('cars/edit', { car });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while fetching the car');
    res.redirect('/cars');
  }
};

exports.updateCar = async (req, res) => {
  try {
    let car = await Car.findById(req.params.id);
    if (car.owner != req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/cars');
    }
    const { make, model, year, pricePerDay } = req.body;
    car = await Car.findByIdAndUpdate(req.params.id, { make, model, year, pricePerDay });
    req.flash('success_msg', 'Car updated successfully');
    res.redirect('/cars');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while updating the car');
    res.redirect('/cars');
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car.owner != req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/cars');
    }
    await Car.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Car deleted successfully');
    res.redirect('/cars');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while deleting the car');
    res.redirect('/cars');
  }
};

exports.getAvailableCars = async (req, res) => {
  try {
    const cars = await Car.find({ owner: { $ne: req.user.id }, isRented: false });
    res.render('cars/available', { cars });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while fetching available cars');
    res.redirect('/');
  }
};

exports.rentCar = async (req, res) => {
  try {
    let car = await Car.findById(req.params.id);
    if (car.isRented) {
      req.flash('error_msg', 'Car is already rented');
      return res.redirect('/cars/available');
    }
    car = await Car.findByIdAndUpdate(req.params.id, { isRented: true, rentedBy: req.user.id });
    req.flash('success_msg', 'Car rented successfully');
    res.redirect('/cars/available');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while renting the car');
    res.redirect('/cars/available');
  }
};

exports.getRentedCars = async (req, res) => {
  try {
    const cars = await Car.find({ rentedBy: req.user.id });
    res.render('cars/rented', { cars });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while fetching rented cars');
    res.redirect('/');
  }
};

exports.returnCar = async (req, res) => {
  try {
    let car = await Car.findById(req.params.id);
    if (car.rentedBy != req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/cars/rented');
    }
    car = await Car.findByIdAndUpdate(req.params.id, { isRented: false, rentedBy: null });
    req.flash('success_msg', 'Car returned successfully');
    res.redirect('/cars/rented');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while returning the car');
    res.redirect('/cars/rented');
  }
};

