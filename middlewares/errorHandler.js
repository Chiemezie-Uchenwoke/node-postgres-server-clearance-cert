const errorHandler = (err, req, res, next) => {
    if (err) {
        console.error(err.stack);
        return res.status(500).json({message: "Internal server error"});
    }
}

export {errorHandler};