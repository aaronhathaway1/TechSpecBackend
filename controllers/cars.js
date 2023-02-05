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

const createCar = async (req, res) => {
	const car = {
		make: req.body.make,
		model: req.body.model,
		year: req.body.year,
		color: req.body.color,
		displacement: req.body.displacement,
		horsepower: req.body.horsepower,
		engineType: req.body.engineType,
		transmission: req.body.transmission,
		drivetrain: req.body.drivetrain,
	};
	const response = await mongodb
		.getDb()
		.db('TechSpec')
		.collection('Cars')
		.insertOne(car);
	if (response.acknowledged) {
		res.status(201).json(response);
	} else {
		res
			.status(500)
			.json(response.error || 'Some error occurred while creating the car.');
	}
};

const updateCar = async (req, res) => {
	const carId = new ObjectId(req.params.id);
	// be aware of updateOne if you only want to update specific fields
	const car = {
		make: req.body.make,
		model: req.body.model,
		year: req.body.year,
		color: req.body.color,
		displacement: req.body.displacement,
		horsepower: req.body.horsepower,
		engineType: req.body.engineType,
		transmission: req.body.transmission,
		drivetrain: req.body.drivetrain,
	};
	const response = await mongodb
		.getDb()
		.db('TechSpec')
		.collection('Cars')
		.replaceOne({ _id: carId }, car);
	console.log(response);
	if (response.modifiedCount > 0) {
		res.status(204).send();
	} else {
		res
			.status(500)
			.json(response.error || 'Some error occurred while updating the car.');
	}
};

const deleteCar = async (req, res) => {
	const car = new ObjectId(req.params.id);
	const response = await mongodb
		.getDb()
		.db('TechSpec')
		.collection('Cars')
		.deleteOne({ _id: car });
	console.log(response);
	if (response.deletedCount > 0) {
		res.status(204).send();
	} else {
		res
			.status(500)
			.json(response.error || 'Some error occurred while deleting the car.');
	}
};

module.exports = {
	getAll,
	getSingle,
	createCar,
	updateCar,
	deleteCar,
};
