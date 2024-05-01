const express = require("express");
const cors = require("cors");
const User = require("./models/User.js");
const Ride = require("./models/ride.js");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

const jwtSecret = "aetalkdgathtlkadfaiutkassfsdnfkaksn";


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// Publish Rides
app.post("/myrides", async (req, res) => {
  const ride = new Ride(req.body);
  ride
    .save()
    .then((savedRide) => res.status(201).json(savedRide))
    .catch((error) => {
      console.error("Error saving ride:", error);
      res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    });
});

// Display user rides
app.get("/myrides", async (req, res) => {
  try {
    const rides = await Ride.find().populate("passengers", "name email");
    res.status(200).json(rides);
    // console.log(rides);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch rides", error: error.message });
  }
});
// Display All Rides
app.get("/myrides/all", async (req, res) => {
  const allRides = await Ride.find().populate("creator", "name email");
  res.status(200).json(allRides);
});

//Edit Ride
app.get("/myrides/:rideId", async (req, res) => {
  const { rideId } = req.params;
  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    res.json(ride);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch ride details", error: error.message });
  }
});
// store edited
app.put("/myrides/:rideId", async (req, res) => {
  const { rideId } = req.params;
  const rideUpdates = req.body;

  try {
    const updatedRide = await Ride.findByIdAndUpdate(rideId, rideUpdates, {
      new: true,
    });
    if (!updatedRide) {
      return res.status(404).send("Ride not found");
    }
    res.json(updatedRide);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating ride", error: error.message });
  }
});
//del ride

app.delete("/myrides/:rideId", async (req, res) => {
  console.log("DELETE request received for ride ID:", req.params.rideId);
  const deleteRideId = await Ride.findById(req.params.rideId);
  console.log("Deleted ID: ", deleteRideId);
  if (!deleteRideId) {
    return res.status(400).json("Invalid Ride ID");
  }
  await deleteRideId.deleteOne();
  res.status(200).json("Deleted Successfully");
});

//Join Ride
app.post("/myrides/join/:rideId", async (req, res) => {
  const { rideId } = req.params;
  const { seats: seatsRequested, userId } = req.body;
  // console.log("User ID received:", userId);

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    if (ride.seats >= seatsRequested && seatsRequested > 0) {
      ride.seats -= seatsRequested; // minus the number of avail seats
      ride.passengers.push(userId);
      await ride.save();
      return res.status(200).json({
        message: "Successfully joined the ride",
        seats: ride.seats,
      });
    } else {
      return res.status(400).json({
        message: `Unable to join. Available seats: ${ride.seats}, Requested: ${seatsRequested}`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to join ride", error: error.message });
  }
});
//joined get
app.get("/joined", async (req, res) => {
  // console.log("Called Joined");
  const userId = req.query.userId;
  // console.log(userId);
  try {
    const rides = await Ride.find({ passengers: userId }).populate(
      "creator",
      "name email"
    );
    res.json(rides);
  } catch (error) {
    console.error("Error fetching joined rides:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//search
app.get("/search", async (req, res) => {
  const { from, to, date, seats } = req.query;
  // Create a query object to filter the rides
  let query = {};
  if (from) {
    query.from = { $regex: from, $options: "i" }; // Case insensitive matching
  }
  if (to) {
    query.to = { $regex: to, $options: "i" }; // Case insensitive matching
  }
  if (date) {
    // Assuming 'date' is stored in ISO format (YYYY-MM-DD)
    const dateObj = new Date(date);
    const nextDay = new Date(date);
    nextDay.setDate(dateObj.getDate() + 1);
    query.departure = {
      $gte: dateObj,
      $lt: nextDay,
    };
  }
  if (seats) {
    query.seats = { $gte: parseInt(seats) }; // Ensure there are at least as many seats as requested
  }
  try {
    const rides = await Ride.find(query).populate("creator", "name email");
    res.json(rides);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

app.get("/test", (req, res) => {
  console.log("Test Successfully");
});

app.post("/register", async (req, res) => {
  const { name, email, password} = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email no are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
  } catch (e) {
    res.status(422).json(e);
  }
  res.send("Registered");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passok = bcrypt.compareSync(password, userDoc.password);
    if (passok) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass Not Ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", async (req, res) => {
  const userId = req.params.userId;
  const { token } = req.cookies;
  if (token && token !== "j:null") {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({
        name,
        email,
        _id,
      });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", null).json(true);
});

module.exports = app;
