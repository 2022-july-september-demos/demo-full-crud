const { Router } = require('express');
const { Soda } = require('../models/Soda');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const soda = await Soda.getById(req.params.id);
    res.json(soda);
  })
  .get('/', async (req, res) => {
    const sodas = await Soda.getAll();
    res.json(sodas);
  });
