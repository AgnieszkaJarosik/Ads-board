const express = require('express');
const router = express.Router();

const Ad = require('../models/ad.model');

router.get('/', async (req, res, next) => {
  try{
    const ads = await Ad.find(req.query).populate('author');
    if (ads.length === 0) {
      res.status(404).send('Not found');
    } else {
      res.send(ads);
    }
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try{
    const { id } = req.params;
    const ad = await Ad.findById(id).populate('author');
    if (!ad) {
      res.status(404).send('Not found');
    } else {
      res.send(ad);
    }
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try{
    if(req.user) {
      const ad = new Ad(req.body);
      ad.date = new Date();
      ad.author = req.user;
      ad.category = req.body.category.split(',');
      await ad.save();
      res.status(201).send('Dodano ogłoszenie');
    } else {
      res.status(401).send('Musisz się zalogować żeby dodać ogłoszenie')
    }
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try{
    if(req.user){
      const {id} = req.params;
      let ad = await Ad.findById(id).populate('author');
      if (ad.author.id === req.user.id) {
        const editAd = await Ad.findByIdAndUpdate(id, req.body).populate('author');
        res.send(editAd);
      } else {
        res.status(401).send('Tylko autor może edytować ogłoszenie');
      }
    } else {
      res.status(401).send('Musisz się zalogować');
    }
  } catch (e) {
    console.log(e)
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try{
    if(req.user){
      const { id } = req.params;
      const ad = await Ad.findById(id).populate('author');
      if (ad.author.id === req.user.id) {
        await Ad.deleteOne({_id: id});
        res.status(200).send();
      } else {
        res.status(401).send('Tylko autor może usunąć ogłoszenie');
      }
    } else {
      res.status(401).send('Musisz się zalogować');
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
