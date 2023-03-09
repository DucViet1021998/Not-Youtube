const usersRouter = require('./users');
const songsRouter = require('./songs');
const addSongs = require('./addSongs');


function route(app) {
    app.use('/', usersRouter);
    app.use('/', songsRouter)
    app.use('/', addSongs)
}

module.exports = route;