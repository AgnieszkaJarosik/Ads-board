const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Ad = require('../models/ad.model');
const User = require('../models/user.model');

router.get('/', async (req, res, next) => {
  try{
    const ads = await Ad.find(req.query).populate('author');
    res.send(ads);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try{
    const { id } = req.params;
    const ad = await Ad.findById(id).populate('author');
    res.send(ad);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try{
    const ad = new Ad(req.body);
    ad.date = new Date();
    ad.author = req.user;
    ad.category = req.body.category.split(',');
    await ad.save();
    res.status(201).send('Dodano ogłoszenie');
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try{
    if(req.user){
      const {id} = req.params;
      const ad = await Ad.findByIdAndUpdate(id, req.body).populate('author');
      res.send(ad);
    } else {
      res.status(401).send('Musisz się zalogować');
    }

  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try{
    if(req.user){
      const {id} = req.params;
      await Ad.findByIdAndDelete(id);
      res.status(200).send();
    } else {
      res.status(401).send('Musisz się zalogować');
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;