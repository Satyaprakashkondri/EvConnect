

import axios from "axios";
import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../UserContext";

const PublishRide = () => {
  const [rideDetails, setRideDetails] = useState({
    seats: 1,
    price: "",
    departure: "",
    arrival: "",
    carDetails: "",
  });
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRideDetails((prevState) => ({
      ...prevState,
      [name]:
        name === "departure" || name === "arrival" ? value.toString() : value,
    }));
  };
  const handleDateChange = (name, date) => {
    setRideDetails((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    let errors = [];
    if (rideDetails.seats <= 0) errors.push("number of available seats");
    if (!rideDetails.price || rideDetails.price <= 0) errors.push("price");
    const departtime = rideDetails.departure.toString();
    const arrivaltime = rideDetails.arrival.toString();
    if (!departtime.trim()) errors.push("departure time");
    if (!arrivaltime.trim()) errors.push("arrival time");
    if (!rideDetails.carDetails.trim()) errors.push("car details");

    if (errors.length > 0) {
      alert(
        "Please complete the following field(s): " + errors.join(", ") + "."
      );
      return;
    }
    const submitRideDetails = {
      ...rideDetails,
      creator: user._id,
      creatorName: user.name,
      departure: rideDetails.departure.toString(),
      arrival: rideDetails.arrival.toString(),
    };
    console.log(submitRideDetails);
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    // If all fields are valid, process the form submission
    const { data } = await axios.post("/myrides", submitRideDetails,config);
    // console.log(rideDetails);
    alert("Slot Published successfully!");
    setRedirect("/account/myrides");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="flex flex-col items-center p-2">
      <h1 className="flex justify-center text-2xl text-sky text-blue-700 font-bold mb-4">
        Publish Slot
      </h1>
      <div className="flex flex-col md:flex-row w-full justify-center p-5 border">
        {/* <div className="w-full md:w-1/3 p-4 border mb-4 md:mb-0">
          <div className="border-b pb-4 mb-4">
            <h1>1</h1>
            <h2 className="text-xl font-semibold mb-2">Create your account</h2>
            <p>
              Add your profile picture, a few words about you and your phone
              number to increase trust between members.
            </p>
          </div>
          <div className="border-b pb-4 mb-4">
            <h1 className="text-black text-bold">2</h1>
            <h2 className="text-xl font-semibold mb-2">Publish a ride</h2>
            <p>
              Indicate departure and arrival points, the date of the ride and
              check our recommended price to increase your chances of getting
              your first passengers and ratings.
            </p>
          </div>
          <div>
            <h1 className="text-bold">3</h1>
            <h2 className="text-xl font-semibold mb-2">Enjoy the ride</h2>
            <p>That's how easy it is to start saving on travel costs!</p>
          </div>
        </div> */}
        <div className="w-full md:w-1/3 p-4 border ml-0 md:ml-3">
          <h2 className="text-xl font-semibold mb-2">Create a Charging Slot</h2>
          <form className="space-y-1" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="w-full md:w-1/2">
                {/* <label className="block mb-1" htmlFor="from">
                  From:
                </label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  type="text"
                  id="from"
                  name="from"
                  value={rideDetails.from}
                  onChange={handleChange}
                /> */}
              </div>
              <div className="w-full md:w-1/2">
                {/* <label className="block mb-1" htmlFor="to">
                  To:
                </label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  type="text"
                  id="to"
                  name="to"
                  value={rideDetails.to}
                  onChange={handleChange}
                /> */}
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-full md:w-1/2">
                <label className="block mb-1" htmlFor="seats">
                  Available slots : 
                </label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  type="number"
                  id="seats"
                  name="seats"
                  value={10}
                  min="1"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block mb-1" htmlFor="price">
                 Total Price : 
                </label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  type="number"
                  id="price"
                  name="price"
                  value={rideDetails.price}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1" htmlFor="departure">
                Charging Start Time : 
              </label>
              <DatePicker
                selected={rideDetails.departure}
                onChange={(date) => handleDateChange("departure", date)}
                showTimeSelect
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className={`form-control 
                }`}
              />
            </div>
            <div>
              <label className="block mb-1" htmlFor="arrival">
                Charging End Time : 
              </label>

              <DatePicker
                selected={rideDetails.arrival}
                onChange={(date) => handleDateChange("arrival", date)}
                showTimeSelect
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className={`form-control 
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="carDetails"
                className="block text-gray-700  mb-2"
              >
              Location Details : 
              </label>
              <textarea
                id="carDetails"
                name="carDetails"
                rows="2"
                className="form-textarea w-full border rounded-md px-4 py-2"
                placeholder="Ex- Smaple Location"
                value={rideDetails.carDetails}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              type="submit"
            >
              Publish Slot
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublishRide;
