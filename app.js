require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const ads = require('./routes/ads');
const User = require('./models/user.model');

const express = require('express');
const app = express();

app.use(express.json());

app.use(async (req, res, next) => {
  const authorization = (req.headers.authorization || '').split(' ')[1];
  if (authorization) {
    const [login, password] = authorization.split(':');
    req.user = await User.findOne({ login, password });
  }
  next();
});

app.use('/ads', ads);

app.use((err, req, res) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(4500, () => console.log('server started!'));
