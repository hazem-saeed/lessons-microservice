const Lesson = require('../models/lesson');
const express = require('express');
const router = express.Router();
const lesson_upload = require('../middlewares/multer_upload');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


const HOST = process.env.HOST || '127.0.0.1:8000';