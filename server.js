var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;

app.use('/', require('./routes'));

app.listen(3000, () => {
	console.log(`Server is current running on port ${PORT}.`);
});
