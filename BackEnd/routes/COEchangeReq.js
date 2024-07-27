const express = require("express");
const { COEviewChangeReq, COEaddDisapprove, COEviewDisapproveReq, COEapproveReq } = require("../controller/COEchangeReq");
const COEchangeReqRouter = express.Router();

COEchangeReqRouter.route('/COEview').get(COEviewChangeReq)
COEchangeReqRouter.route('/COEviewDisapprove').get(COEviewDisapproveReq)
COEchangeReqRouter.route('/COEdisapprove/:id').put(COEaddDisapprove)
COEchangeReqRouter.route('/COEapprove/:id').put(COEapproveReq)


module.exports = {COEchangeReqRouter}