const postRoute = require('./post');
const authRoute = require('./auth');
const userRoute = require('./user');

function route(app) {
    app.use('/api/auth', authRoute);
    app.use('/api/user', userRoute);
    app.use('/api/post', postRoute);
}

module.exports = route

