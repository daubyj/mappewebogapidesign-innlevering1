const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config');
const compiler = webpack(config);
const app = express();
const fs = require ('fs');
var readline = require('readline');

var albums = [];
var filename = "albums.txt";
readline.createInterface({
    input: fs.createReadStream(filename)
}).on('line', function(line) {
    var split = line.split(";");
    var album = {
        artist: split[0],
        title: split[1],
        year: split[2]
    };
    //console.log(album);
    albums.push(album);
});

app.get('/albums', function(req, res) {
 res.send(albums);
 });

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(1337, function() {
    console.log("server 1337 klar");
});