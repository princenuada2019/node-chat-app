const path = require('path');
const express = require('express');

var publicPath = path.join(__dirname, '../public');

/*console.log(__dirname + '/../public');
console.log(publicPath);*/

var port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
