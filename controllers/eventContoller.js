var mongoose = require('mongoose');

const eventSchema = require('../models/eventModel');

Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
}

const createEvent = (req, res, next) => {
    var payload = { ...req.body };
    payload.userId = mongoose.Types.ObjectId(payload.userId);

    if (!payload.allDay) {

        if (payload.start) {
            payload.start = new Date(payload.start);
        }
        if (payload.end) {
            payload.end = new Date(payload.end);
        }

        if (payload.start && !payload.end) {
            payload.end = new Date(payload.start);
            payload.end = payload.end.addHours(24)
        }
    } else {
        delete payload.end;
    }


    var newEvent = new eventSchema(payload)
    newEvent.save().then((createdEvent) => {
        res.send(createdEvent)
    }).catch((err) => {
        next(err);
    });
}

const getAllEvents = (req, res, next) => {

    var userId = req.query.userId;
    userId = mongoose.Types.ObjectId(userId)

    eventSchema.find({ userId })
        .then(events => {
            res.send(events)
        })
        .catch(err => {
            next(err);
        });
}

const getEventById = (req, res, next) => {
    var eventId = req.params.id;

    eventSchema.findById(eventId)
        .then(event => {
            res.send(event)
        })
        .catch(err => {
            next(err);
        });
}

const deleteEventById = (req, res, next) => {
    var eventId = req.params.id;

    eventSchema.findOneAndDelete({ _id: eventId })
        .then(deletedEvent => {
            if (!deletedEvent) {
                const error = new Error("No Event found with the id");
                error.statusCode = 404;
                next(error);
            }
            res.send(deletedEvent)
        })
        .catch(err => {
            next(err);
        });
}

const updateEventById = (req, res, next) => {
    var eventId = req.params.id;
    var updateEvent = req.body;
    eventSchema.findOneAndUpdate({ _id: eventId }, updateEvent, { new: true })
        .then(updatedEvent => {
            if (!updatedEvent) {
                const error = new Error("No Event found with the id");
                error.statusCode = 404;
                next(error);
            }
            res.send(updatedEvent)
        })
        .catch(err => {
            next(err);
        });
}

exports.createEvent = createEvent;
exports.getAllEvents = getAllEvents;
exports.getEventById = getEventById;
exports.deleteEventById = deleteEventById;
exports.updateEventById = updateEventById;