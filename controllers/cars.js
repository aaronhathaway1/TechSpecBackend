const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
	const result = await mongodb.getDb().db('TechSpec').collection('Cars').find();
	result.toArray().then((lists) => {
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(lists);
	});
};

const getSingle = async (req, res, next) => {
	const carId = new ObjectId(req.params.id);
	const result = await mongodb
		.getDb()
		.db('TechSpec')
		.collection('Cars')
		.find({ _id: carId });
	result.toArray().then((lists) => {
		// console.log(lists);
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(lists[0]);
	});
};

module.exports = { getAll, getSingle };
