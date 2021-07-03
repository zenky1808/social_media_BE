const postRoute = require('./post');
const authRoute = require('./auth');


function route(app) {
    app.use('/api/post', postRoute);
    app.use('/api/auth', authRoute);
}

module.exports = route

