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
    days: [{
        type: Number,
        enum: [0,1,2,3,4,5,6]
    }],
    start_date: {
        type: Date,
        required: true
    },
    final_date: {
        type: Date,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    dates: [{ type: Date}]
}, {
    toObject: { versionKey: false },
    toJSON: { versionKey: false }
});


// firstDate and lastDate as string
lessonSchema.methods.genCalendar = function(firstDate, lastDate, days) {
    const startDate = new Date(firstDate);
    const finalDate = new Date(lastDate);
    let first_week = [startDate];
    let copiedFirstWeek = [];

    // number of weeks between first date and last date
    const weeks_num = Math.ceil((finalDate-startDate)/(7 * 24 * 60 * 60 * 1000));

    // generate first week
    for (let i = 1; i < days.length; i++) {
        let f_date = new Date(firstDate);
        var following_date = f_date.setDate(f_date.getDate() + (parseInt(days[i])+(7-f_date.getDay())));
        var date = new Date(following_date);
        first_week.push(date);
    }

    // create a copy of first week
    for(let day of first_week) {
        let copyOf = new Date(day.valueOf());
        copiedFirstWeek.push(copyOf);
    }

    // generate calendar
    let dates = [...first_week];

    for (let i = 0; i < weeks_num; i++) {
        for(let day of copiedFirstWeek){
            var x = day.setDate(day.getDate() + 7);
            var newDate = new Date(x);
            if(newDate <= finalDate) {
                dates.push(newDate);
            }
        };
    }
    return dates;
};


module.exports = mongoose.model('Lesson', lessonSchema);