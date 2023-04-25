const Car = require("../models/car");

const createCar = async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const allcars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getByName = async (req, res) => {
  try {
    console.log(req.params.name);
    const car = await Car.findOne({ name: req.params.name });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const insertmany = async (req, res) => {
  const cars = req.body;
  try {
    const insertedCars = await Car.insertMany(cars);
    res.json(insertedCars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createCar, allcars, getByName, insertmany };
