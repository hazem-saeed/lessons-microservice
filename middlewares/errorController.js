const sendErrorDev = (err, req, res) => {

    if(err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        return res.status(500).json({
            success: false,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }
};


const sendErrorProd = (err, req, res) => {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
          status: err.status,
          message: err.message
        });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).send({
        status: 'error',
        message: 'Something went very wrong!'
    });
};


///////////////////// DO NOT REMOVE NEXT /////////////////////////
const errorController = async (err, req, res, next) => {

    if(err.message == 'File too large') {
        return res.status(413).send({ message: err.message, success: false });
    }

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message;

        if (error.code === 11000) error = handleDuplicateKeyError(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
        if(err.name == 'ValidationError') {
            return res.status(422).send({ message: err.message, success: false });
        }

        sendErrorProd(error, req, res);
    }
}


module.exports = errorController;