const express=require("express");
const { getBatchProgram, addSession, viewSession, getSession, updateSession } = require("../controller/sessionUni");
const SessionRouter=express.Router();

SessionRouter.route('/Get').get(getBatchProgram)
SessionRouter.route('/Add').post(addSession)
SessionRouter.route('/View').get(viewSession)
SessionRouter.route('/Edit/:id').get(getSession)
SessionRouter.route('/Update/:id').put(updateSession)

module.exports = {SessionRouter}