const fs = require('fs');
const qs = require('querystring');
const fabcar_query = require('./query.js');
const fabcar_invoke = require('./invoke.js');

exports.queryAllCars = function (req, res) {
    fabcar_query.queryAllCars().then(function (result) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write(result);
        res.end();
    });
}

exports.queryCar = function (req, res) {
    if (req.method == 'POST') {
        var body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            post = qs.parse(body);
            var key = post['key'];
            fabcar_query.queryCar(key).then((result) => {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                res.write(result);
                res.end();
            });
        });
    }
}


exports.getHistoryForCar = function (req, res) {
    if (req.method == 'POST') {
        var body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            post = qs.parse(body);
            var key = post['key'];
            fabcar_query.getHistoryForCar(key).then((result) => {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                res.write(result);
                res.end();
            });
        });
    }
}

exports.createCar = function (req, res) {
    if (req.method == 'POST') {
        var body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            post = qs.parse(body);

            var key = post['key'];
            var color = post['color'];
            var make = post['make'];
            var model = post['model'];
            var owner = post['owner'];

            fabcar_invoke.createCar(key, make, model, color, owner).then((result) => {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                res.write(result);
                res.end();
            });
        });
    }
}

exports.updateCar = function (req, res) {
    if (req.method == 'POST') {
        var body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            post = qs.parse(body);

            var key = post['key'];
            var color = post['color'];
            var make = post['make'];
            var model = post['model'];
            var owner = post['owner'];

            fabcar_invoke.createCar(key, make, model, color, owner).then((result) => {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                res.write(result);
                res.end();
            });
        });
    }
}

exports.home = function (req, res) {
    fs.readFile('../client/index.html', (err, data) => {
        if (err) {
            console.error(err);
            res.end('Server error!');
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': data.length,
                'Expires': new Date().toUTCString()
            });
            res.end(data);
        }
    });
}

exports.sendData = function (req, res) {
    var pathname = req.url;
    fs.readFile('../client' + pathname, (err, data) => {
        if (err) {
            console.error(err);
            res.writeHead(404, {
                "Content-Type": "text/html"
            });
            res.end("404 Not found");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': data.length,
                'Expires': new Date().toUTCString()
            });
            res.end(data);
        }
    });
};
