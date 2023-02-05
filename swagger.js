const swaggerAutogen = require('swagger-autogen')();

const doc = {
	info: {
		title: 'TechSpec API',
		description: 'Car API',
	},
	host: 'abhathaway-cse341-techspec.onrender.com',
	schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
	await import('./app.js');
});
