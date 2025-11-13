module.exports = (err, req, res, next) => {
    console.error(err.err);
    res.status(500).json({ success: false, error: err.message || 'An unexpected error occurred!' });
}