module.exports = app => {
    app.use('/api/v1/users', require('./api/v1/users'));
    // app.use('/', four0four.notFound);
};