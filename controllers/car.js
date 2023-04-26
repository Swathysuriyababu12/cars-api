const Car = require("../models/car");
//const generateCars = require("./faker");
const cloudinary = require("cloudinary").v2;
const { faker } = require("@faker-js/faker");

cloudinary.config({
  cloud_name: "dwustzgek",
  api_key: "497382222751667",
  api_secret: "GosHkI3KZwIinrFpv7RjRzk0bsU",
});

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
  // Define an array of car manufacturers
  const manufacturers = [
    "Mercedes_Benz",
    "Chevrolet",
    // "Bentley",
    // "Ford",
    // "Jaguar",
    // "Tesla",
    // "Audi",
    // "Kia",
    // "Maserati",
    // "Porsche",
    // "Lamborghini",
    // "Honda",
    // "Volkswagen",
    // "Ferrari",
    // "Rolls Royce",
    // "BMW",
    // "Toyota",
    // "Hyundai",
    // "Bugatti",
    // "Fiat",
    // "Nissan",
  ];

  // Create an array to store the mock data for 100 cars
  const cars = [];

  // Loop through the manufacturers array and create 5 cars for each manufacturer
  manufacturers.forEach((manufacturer) => {
    for (let i = 0; i < 2; i++) {
      // Generate a unique image name

      const imageName = `${manufacturer}${i + 1}.png`;

      // Upload image to Cloudinary with the unique name and get the URL
      cloudinary.uploader.upload(
        `images/${imageName}`,
        { public_id: `cars/${imageName}` },
        function (error, result) {
          if (error) {
            console.log(error);
          } else {
            const imageUrl = result.secure_url;

            // Create a new car object with the image URL
            const newCar = new Car({
              name: manufacturer,
              model: faker.vehicle.model(),
              color: faker.helpers.arrayElement(["Black", "Ivory", "Silver"]),
              price: faker.commerce.price(100000, 2000000, 0),
              transmission: faker.helpers.arrayElement([
                "Automatic",
                "Manual",
                "Semi-Automatic",
              ]),
              year: faker.date.past().getFullYear(),
              type: faker.vehicle.type(),
              mileage: faker.random.numeric(3),
              imageUrl: imageUrl,
            });

            // Add the new car to the cars array
            cars.push(newCar);
            console.log(cars);
            if (cars.length === 4) {
              const insertedCars = Car.insertMany(cars);
              res.json(insertedCars);
            }
          }
        }
      );
    }
  });
  console.log(cars);
  const insert = async () => {
    try {
      console.log(cars);
      const insertedCars = await Car.insertMany(cars);
      res.json(insertedCars);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //const cars = generateCars();
};
module.exports = { createCar, allcars, getByName, insertmany };
