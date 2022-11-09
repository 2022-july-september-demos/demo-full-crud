const { Router } = require('express');
const { Soda } = require('../models/Soda');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const soda = await Soda.getById(req.params.id);
      if (!soda) next();
      res.json(soda);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const sodas = await Soda.getAll();
      res.json(sodas);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const soda = await Soda.insert(req.body);
      res.json(soda);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const soda = await Soda.updateById(req.params.id, req.body);
      if (!soda) next();
      res.json(soda);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const soda = await Soda.delete(req.params.id);
      if (!soda) next();
      res.status(204);
      res.send();
    } catch (e) {
      next(e);
    }
  });
