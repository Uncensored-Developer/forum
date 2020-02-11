const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const typedi = require('typedi');
const user = require('../../services/user');
const router = express.Router();

module.exports = app => {
  app.use('/users', router);

  router.post(
    '/',
    celebrate.celebrate({
      body: celebrate.Joi.object({
        name: celebrate.Joi.string().required(),
        email: celebrate.Joi.string().required()
      })
    }),
    eah(async (req, res) => {
      const userService = typedi.Container.get(user);
      const result = await userService.create(req.body);
      return res.json(result).status(201);
    })
  );

};
