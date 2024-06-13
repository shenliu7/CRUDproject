const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('users/register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    try {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        errors.push({ msg: 'Email already exists' });
        res.render('users/register', {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        await newUser.save();
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/users/login');
      }
    } catch (err) {
      console.error(err);
      res.render('users/register', {
        errors: [{ msg: 'An error occurred while registering' }],
        name,
        email,
        password,
        password2,
      });
    }
  }
};

exports.loginUser = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
};

exports.logoutUser = (req, res) => {
  req.logout(() => {
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
};
