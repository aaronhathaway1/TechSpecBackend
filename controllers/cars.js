const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
	try {
		const result = await mongodb
			.getDb()
			.db('TechSpec')
			.collection('Cars')
			.find();
		result.toArray().then((lists) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(lists);
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
};

const getSingle = async (req, res, next) => {
	try {
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
	} catch (err) {
		console.error(err);
		res.status(500);
	}
};

const createCar = async (req, res) => {
	try {
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
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ error: 'An error occurred while creating the car.' });
	}
};

const updateCar = async (req, res) => {
	try {
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
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Could not update car' });
	}
};

const deleteCar = async (req, res) => {
	try {
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
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	getAll,
	getSingle,
	createCar,
	updateCar,
	deleteCar,
};
