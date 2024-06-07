module.exports = (app) => {
  let router = require("express").Router();
  const market = require("../controller/market.controller.js")

  router.get("/market", market.markets)

  app.use('/api', router);
};
