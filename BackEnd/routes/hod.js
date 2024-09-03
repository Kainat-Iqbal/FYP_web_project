const express=require("express");
const { addHod, getHod,updateHod, getToUpdateHod, getAllHod } = require("../controller/hod");
const hodRouter = express.Router();

hodRouter.route('/Add').post(addHod);
hodRouter.route('/Get').get(getHod)
hodRouter.route('/Edit/:id').get(getToUpdateHod)
hodRouter.route('/Update/:id').put(updateHod)
hodRouter.route('/View').get(getAllHod)


module.exports = {hodRouter}