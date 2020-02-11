const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const typedi = require('typedi');
const discussion = require('../../services/discussion');
const router = express.Router();

module.exports = app => {
  app.use('/discussions', router);

  router.get(
    '/',
    eah(async (req, res) => {
      const discussionService = typedi.Container.get(discussion);
      const results = await discussionService.fetch(req.body);
      return res.json(results).status(200);
    })
  );

  router.post(
    '/',
    celebrate.celebrate({
      body: celebrate.Joi.object({
        topic: celebrate.Joi.string().required(),
        creator: celebrate.Joi.string().required(),
        message: celebrate.Joi.string().required()
      })
    }),
    eah(async (req, res) => {
      const discussionService = typedi.Container.get(discussion);
      const result = await discussionService.create(req.body);
      return res.json(result).status(201);
    })
  );

};
