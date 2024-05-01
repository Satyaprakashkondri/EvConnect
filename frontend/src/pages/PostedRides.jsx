import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import "../css/ridestyle.css";

export default function PostedRides() {
  const { user } = useContext(UserContext);
  const [myRides, setMyRides] = useState([]);
  const [showPassengers, setShowPassengers] = useState({});

  useEffect(() => {
    axios
      .get("/myrides")
      .then(({ data }) => {
        const filteredRides = data.filter((ride) => ride.creator === user._id);
        setMyRides(filteredRides);
      })
      .catch((error) => {
        console.error("Failed to fetch rides:", error);
      });
  }, [user.id]);

  const datetime = (date) => {
    return date.replace("T", " Time: ").slice(0, -5);
  };

  const togglePassengers = (id) => {
    setShowPassengers((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div style ={{marginLeft:"200px"}} className="flex items-center justify-center">
      <div
        className={`w-full max-w-4xl ${
          myRides.length > 2 ? "scrollable-rides" : ""
        }`}
      >
        <h2 className="text-blue-700 font-serif text-2xl font-bold mb-4 text-center">
           My Slots
        </h2>
        {myRides.length > 0 ? (
          myRides.map((ride) => (
            <div
              key={ride._id}
              className="border bg-white-100 p-4 rounded-xl mb-4 flex justify-between items-start"
            >
              <div className="flex-1">
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
                <button
                  onClick={() => togglePassengers(ride._id)}
                  className="bg-primary hover:bg-green-300 text-white font-bold py-2 px-3 rounded-md mt-2"
                >
                  View User
                </button>
                {showPassengers[ride._id] && (
                  <ul>
                    {ride.passengers.map((passenger) => (
                      <li key={passenger._id}>
                        {passenger.name} - {passenger.email}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="text-right text-lg font-semibold">
                ₹{ride.price}
                <div className="sticky bottom-2">
                  <Link
                    to={`/edit-ride/${ride._id}`}
                    className="text-red-500 hover:text-red-300"
                  >
                    Edit Slot
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No Slots posted yet.</p>
        )}
      </div>
    </div>
  );
}
