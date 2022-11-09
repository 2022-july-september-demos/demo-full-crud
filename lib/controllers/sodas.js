const { Router } = require('express');
const { Soda } = require('../models/Soda');

module.exports = Router().get('/', async (req, res) => {
  const sodas = await Soda.getAll();
  res.json(sodas);
});
