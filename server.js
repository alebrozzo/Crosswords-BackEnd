/*
import http from 'http';
// var serveStaticFiles = require('ecstatic')({ root: __dirname + '/static' });
const port = process.env.PORT || 8000;

http.createServer((req, res) => {
    
    // default: handle the request as a static file
    // serveStaticFiles(req, res);

    return;

}).listen(port);
*/
const express = require('express');
// import express from 'express';
const app = express();

app.set('port', process.env.PORT || 5000);
app.use(express.static(`${__dirname}/dist`));

// views is directory for all template files
// app.set('views', `${__dirname}/views`);
// app.set('view engine', 'ejs');

app.get('/dist', (request, response) => response.render(`${__dirname}dist/index`));
app.get('/', (request, response) => response.render(`${__dirname}src/index`));

app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port'), 'and path is', __dirname));
