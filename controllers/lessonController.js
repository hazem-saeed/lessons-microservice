const Lesson = require('../models/lesson.model');
const express = require('express');
const router = express.Router();
const lesson_upload = require('../middlewares/multer_upload');
const fse = require('fs-extra');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


const HOST = process.env.HOST || '127.0.0.1:8000';


router.route('/')
// Get all lessons
.get(lesson_upload.none(), catchAsync(async (req,res, next)=>{

    const query = req.query;

    // to add the $ to mongodb operators
    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));

    const lessons = await Lesson.find(JSON.parse(queryStr));

    return res.status(200).send({
        results: lessons.length,
        data: lessons,
        success: true
    });
}))
// Create a lesson
.post(lesson_upload.none(), catchAsync(async (req,res, next)=>{

    const { title, description, price, days, start_date, final_date, start_time, end_time } = req.body;

    if(!title || !description || !price || !days || !start_date || !final_date || !start_time || !end_time){
        return next(new AppError('Please provide all details!', 409));
    }

    const startDate = new Date(start_date);
    const finalDate = new Date(final_date);
    if(startDate > finalDate) {
        return next(new AppError('Start date cannot be after final date!', 409));
    }

    let dateParts = start_date.split("-");
    let startTimeParts = start_time.split(':');
    let endTimeParts = end_time.split(':');

    // we're only interested in the time sent from the user, not the whole date
    const startTime = new Date(dateParts[0], dateParts[1], dateParts[2], startTimeParts[0], startTimeParts[1]);
    const endTime = new Date(dateParts[0], dateParts[1], dateParts[2], endTimeParts[0], endTimeParts[1]);
    if(startTime > endTime) {
        return next(new AppError('Start time cannot be after end time!', 409));
    }

    const lesson = Lesson();
    const calendar = lesson.genCalendar(start_date, final_date, days);

    const createLesson = await Lesson.create({
        title: title, description: description, price: price, days: days, start_date: start_date,
        final_date: final_date, start_time: startTime, end_time: endTime, dates: calendar
    });

    return res.status(201).send({ document: createLesson, success: true });
}));


router.route('/:id')
.get(lesson_upload.none(), catchAsync(async (req,res, next)=>{

    const id = req.params.id;

    const findLesson = await Lesson.findById(id);
    if(!findLesson) {
        return next(new AppError('No document found with that ID!', 404));
    }

    return res.status(200).send({ document: findLesson, success: true });
}))
// Update lesson, data should be populated in frontend by a get by id request
// thumbnail can only be updated with put request, so the image would have the id of the document
.put(lesson_upload.single('thumbnail'), catchAsync(async (req,res, next)=>{

    const id = req.params.id;
    const { title, description, price, days, start_date, final_date, start_time, end_time } = req.body;
    const thumbnail = req.file;
    let path = '';

    const findLesson = await Lesson.findById(id);
    if(!findLesson) {
        return next(new AppError('No document found with that ID!', 404));
    }

    if(!title || !description || !price || !days || !start_date || !final_date || !start_time || !end_time){
        return next(new AppError('Please provide all details!', 409));
    }

    const startDate = new Date(start_date);
    const finalDate = new Date(final_date);
    if(startDate > finalDate) {
        return next(new AppError('Start date cannot be after final date!', 409));
    }

    let dateParts = start_date.split("-");
    let startTimeParts = start_time.split(':');
    let endTimeParts = end_time.split(':');

    // we're only interested in the time sent from the user, not the whole date
    const startTime = new Date(dateParts[0], dateParts[1], dateParts[2], startTimeParts[0], startTimeParts[1]);
    const endTime = new Date(dateParts[0], dateParts[1], dateParts[2], endTimeParts[0], endTimeParts[1]);
    if(startTime > endTime) {
        return next(new AppError('Start time cannot be after end time!', 409));
    }

    const lesson = Lesson();
    const calendar = lesson.genCalendar(start_date, final_date, days);

    if(thumbnail) {
        path = `${HOST}/${thumbnail.destination}${thumbnail.filename}`;
    }

    const updateLesson = await Lesson.findByIdAndUpdate(
        { _id: id },
        {
            title: title, description: description, price: price, thumbnail: path, days: days, start_date: start_date,
            final_date: final_date, start_time: startTime, end_time: endTime, dates: calendar
        }
    );

    return res.status(201).send({ document: updateLesson, success: true })
    return res.status(201).send({ success: true });
}))
.delete(lesson_upload.none(), catchAsync(async (req,res, next)=>{

    const lesson = await Lesson.findByIdAndDelete(req.params.id);

    if (!lesson) {
        return next(new AppError('No document found with that ID', 404));
    }

    await fse.remove(`public/uploads/lessons/${req.params.id}`);

    res.status(204).send();
}));

module.exports = router;