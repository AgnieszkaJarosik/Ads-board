const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Ad = require('../models/ad.model');
const User = require('../models/user.model');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

module.exports = router;