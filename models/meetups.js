const mongoose = require('mongoose');

const MeetupSchema = new mongoose.Schema ({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a title']
    },
    image: {
        type: String,
        data: Buffer,
        required: [true, 'Please add an image']
    },
    address: {
        type: String,
        trim: true,
        required: [true, 'Please enter the address']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Please enter the description']
    },
    favorited: {
        type: Boolean,
        required: true
    }

})

module.exports = mongoose.model('Meetup', MeetupSchema);