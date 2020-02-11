const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const typedi = require('typedi');
const post = require('../../services/post');
const router = express.Router();

module.exports = app => {
  app.use('/posts', router);

  router.get(
    '/',
    eah(async (req, res) => {
      const postService = typedi.Container.get(post);
      const results = await postService.fetch(req.body);
      return res.json(results).status(200);
    })
  );

  router.post(
    '/',
    celebrate.celebrate({
      body: celebrate.Joi.object({
        message: celebrate.Joi.string().required(),
        discussion: celebrate.Joi.string().required(),
        user: celebrate.Joi.string().required()
      })
    }),
    eah(async (req, res) => {
      const postService = typedi.Container.get(post);
      const result = await postService.create(req.body);

      return res.json(result).status(201);
    })
  );

};
