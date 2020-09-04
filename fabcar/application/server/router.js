const requestHandler = require('./requestHandler');

var handle = {};
handle['/'] = requestHandler.home;
handle['/queryAllCars'] = requestHandler.queryAllCars;
handle['/queryCar'] = requestHandler.queryCar;
handle['/getHistoryForCar'] = requestHandler.getHistoryForCar;
handle['/createCar'] = requestHandler.createCar;
handle['/updateCar'] = requestHandler.updateCar;

exports.route = function (req, res) {
    var pathname = req.url;

    if (typeof handle[pathname] === 'function') {
        handle[pathname](req, res);
    } else {
        requestHandler.sendData(req, res);
    }
}
