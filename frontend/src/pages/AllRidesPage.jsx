import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import "../css/ridestyle.css";
import { useNavigate } from "react-router-dom";

export default function PostedRides() {
  const { user } = useContext(UserContext);
  const [myRides, setMyRides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/myrides/all")
      .then((response) => {
        setMyRides(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch rides:", error);
      });
  }, [user._id]);

  const joinRide = (rideId) => {
    const requestedSeats = prompt(
      "How many hours would you like to book your slot ?"
    );
    const seatsToJoin = parseInt(requestedSeats, 10);
    if (!seatsToJoin || seatsToJoin <= 0) {
      alert("Invalid number of Hours");
      return;
    }

    axios
      .post(`/myrides/join/${rideId}`, { seats: seatsToJoin, userId: user._id })
      .then((response) => {
        alert(
          `You have successfully Booked your Slot.`
        );
        navigate("/account/bookings");
        setMyRides(
          myRides.map((ride) =>
            ride._id === rideId ? { ...ride, seats: response.data.seats } : ride
          )
        );
      })
      .catch((error) => {
        console.error("Failed to book teh Slot:", error);
        const errorMessage =
          error.response && error.response.data
            ? error.response.data.message
            : "Failed to book the Slot.";
        alert(errorMessage);
      });
  };

  const datetime = (dateStr) => {
    const date = dateStr.replace("T", " Time: ");
    return date.slice(0, date.length - 5);
  };

  return (
    <div style={{ marginLeft: "200px", WebkitScrollbar: {
      display: "none",
      scrollbarWidth: "none"
    }}} className="flex items-center justify-center">
      <div
        className={`w-full max-w-4xl ${
          myRides.length > 2 ? "scrollable-rides" : ""
        }`}
      >
        <h2 className="flex justify-center text-blue-700 text-2xl font-bold mb-4 text-center font-serif">
          All Available Slots
        </h2>
        {myRides.length > 0 ? (
          myRides.map((ride) => (
            <div
              key={ride._id}
              className="border bg-white shadow-md p-4 rounded-xl mb-4 flex justify-between items-start"
            >
              <div className="flex-1 bg-white rounded m-4">
                <div className="font-serif font-bold text-red-500">User Name :  {ride.creatorName}</div>
                <br />
                <div class="block  m-2 font-serif ">
                  Booked slots for charging your {ride.carDetails} car model.
                </div>
                <div class="block m-2 font-serif ">Charging Start Date : {datetime(ride.departure)}</div>
                <div class="block m-2 font-serif ">Charging End Date : {datetime(ride.arrival)}</div>
                <div class="block m-2 font-serif ">Location : {ride.carDetails}</div>
                <div class="block m-2 font-serif ">User E-Mail Id : {ride.creator.email}</div>
              </div>
              <div className="text-right text-lg font-semibold">
                <div>₹{ride.price}</div>
                {ride.seats > 0 && user._id !== ride.creator._id && (
                  <button
                    onClick={() => joinRide(ride._id)}
                    className="bg-primary hover:bg-green-300 text-white font-bold py-1 px-3 rounded-full mt-2"
                  >
                    Book Slot
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No Slots Available yet.</p>
        )}
      </div>
    </div>
  );
}
