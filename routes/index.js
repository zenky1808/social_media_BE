const postRoute = require('./post')

function route(app) {
    app.use('/api/post', postRoute);
}

module.exports = route

