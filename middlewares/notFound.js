const notFound = (req, res, next) => {
    return res.status(404).json({message: "Route not found"});
}

export {notFound};