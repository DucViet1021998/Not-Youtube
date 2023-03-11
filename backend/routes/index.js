const usersRouter = require('./users');
const songsRouter = require('./songs');
const addSongs = require('./addSongs');
const search = require('./search');


function route(app) {
    app.use('/', usersRouter);
    app.use('/', songsRouter)
    app.use('/', addSongs)
    app.use('/', search)
}

module.exports = route;