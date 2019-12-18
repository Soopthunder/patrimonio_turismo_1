module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CORS_ALLOW_ORIGIN );
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST", "OPTIONS");
    next();
}