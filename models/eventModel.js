const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date
    },
    allDay: {
        type: Boolean
    },
    color: {
        type: String
    },
    createdOn: { 
        type: Date, 
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Event', eventSchema);