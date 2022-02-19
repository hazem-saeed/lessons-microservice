const mongoose = require('mongoose');


const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        default: ''
    },
    price: Number,
    recurrence: {
        type: String,
        enum: ['none', 'daily', 'weekly'],
        default: 'none'
    },
    days: [{
        type: String,
        enum: ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    }],
    start_time: [{ type: Date }],
    end_time: [{ type: Date }],
    final_day: Date
}, {
    toObject: { versionKey: false },
    toJSON: { versionKey: false }
});

module.exports = mongoose.model('Lesson', lessonSchema);