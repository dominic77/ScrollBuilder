var express = require('express'),
	app = express()
;

app.use(express.static(__dirname)); //use static files in ROOT folder

// Serve the compiled image directory under /img.
app.use('/img', express.static(__dirname + '/dist/img'));

module.exports = app;
