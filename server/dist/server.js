"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var express = require('express');
var port = process.env.PORT || '3000';
var publicPath = path.join(__dirname, '../..', 'client/dist/public');
var app = express();
app.use(express.static(publicPath));
app.get('*', function (req, res) {
    res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(port, function () {
    console.log("server listening on port " + port);
});
//# sourceMappingURL=server.js.map