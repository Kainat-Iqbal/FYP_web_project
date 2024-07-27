const express=require("express");
const { addBatch, viewBatch, getBatch, updateBatch } = require("../controller/batch");
const batchRouter=express.Router();

batchRouter.route('/Add').post(addBatch)
batchRouter.route('/View').get(viewBatch)
batchRouter.route('/Edit/:id').get(getBatch)
batchRouter.route('/Update/:id').put(updateBatch)


module.exports = {batchRouter}