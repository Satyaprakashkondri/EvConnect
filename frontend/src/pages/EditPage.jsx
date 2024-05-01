import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../UserContext";


const EditRide = () => {
  const [rideDetails, setRideDetails] = useState({
    from: "",
    to: "",
    seats: 1,
    price: "",
    departure: "",
    arrival: "",
    carDetails: "",
  });
  const [redirect, setRedirect] = useState(false);
  const { user } = useContext(UserContext);
  const { rideId } = useParams();

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await axios.get(`/myrides/${rideId}`);
        setRideDetails({
          ...response.data,
          departure: new Date(response.data.departure),
          arrival: new Date(response.data.arrival),
        });
      } catch (error) {
        console.error("Failed to fetch Slot details:", error);
      }
    };
    fetchRideDetails();
  }, [rideId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRideDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setRideDetails((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      await axios.put(`/myrides/${rideId}`, rideDetails, config);
      alert("Slot updated successfully!");
      setRedirect(true);
    } catch (error) {
      alert("Failed to update Slot : " + error.message);
      alert(
        `Failed to update Slot : ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  //Delete Function
  async function deleteRide(id) {
    // console.log({ rideId });
    // console.log({ id });
    await axios.delete(`/myrides/${rideId}`).then((response) => {
      alert(response.data);
    });
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/account/myrides" />;
  }

  return (
    <div className="flex flex-col items-center p-2">
      <h1 className="text-2xl text-sky text-blue-700 font-serif font-bold mb-4">Edit Your Slot</h1>

      <div className="flex flex-col md:flex-row w-full justify-center p-5 border">
        <form className="space-y-1" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <div className="w-full md:w-1/2">
              <label className="block mb-1" htmlFor="seats">
                Available seats:
              </label>
              <input
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                type="number"
                id="seats"
                name="seats"
                value={rideDetails.seats}
                onChange={handleChange}
                min="1"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block mb-1" htmlFor="price">
                Price:
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
              className="block text-gray-700 mb-2"
            >
              Car Details : 
            </label>
            <textarea
              id="carDetails"
              name="carDetails"
              rows="2"
              className="form-textarea w-full border rounded-md px-4 py-2"
              placeholder="Ex: 2020 Silver Toyota Camry, license plate XYZ-1234"
              value={rideDetails.carDetails}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out"
              type="submit"
              //   onClick={EditRide}
            >
              Update Slot
            </button>
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
              onClick={() => deleteRide(rideDetails._id)}
            >
              Delete Slot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRide;
