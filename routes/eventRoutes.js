const express = require('express')
const auth = require('../helpers/auth');

//import controllers
const eventContoller = require('../controllers/eventContoller');

const eventRouter = express.Router();

eventRouter.get("/:id", auth, eventContoller.getEventById)
eventRouter.put("/:id", auth, eventContoller.updateEventById)
eventRouter.delete("/:id", auth, eventContoller.deleteEventById)
eventRouter.get("/", auth, eventContoller.getAllEvents)
eventRouter.post("/", auth, eventContoller.createEvent)

module.exports = eventRouter;
