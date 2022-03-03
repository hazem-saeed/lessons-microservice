require('dotenv').config('.env');
const express = require('express');
const errorController = require('./middlewares/errorController');
const connectDB = require('./db');


const PORT = process.env.PORT || 8000;
process.env.TZ = 'UTC';
const app = express();

////////////////// CONNECT DATABASE /////////////////////
connectDB();


////////////////// INIT MIDDLEWARES ////////////////////
app.use('/public', express.static('public'));


//////////////////////// Routes ////////////////////////
app.use('/api/lessons', require('./controllers/lessonController'));
///////////////////// 404 NOT FOUND ERROR ///////////////////////
app.all('*', (req, res, next) => {
    return res.status(404).send({
        message: `Can't find ${req.originalUrl} on this server!`,
        success: false
    });
});

///////////////////////// ERROR MIDDLEWARE //////////////////////
app.use(errorController);


app.listen(PORT, () => {
    console.log(`server start in ${PORT}`);
});