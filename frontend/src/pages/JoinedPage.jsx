import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

function JoinedPage() {
  const [rides, setRides] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`/joined?userId=${user._id}`)
        .then((response) => {
          setRides(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch rides:", error);
          setError("Failed to fetch rides");
          setIsLoading(false);
        });
    } else {
      console.log("User data is not available");
      setError("User data is not available");
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style ={{marginLeft:"200px"}} className="flex items-center justify-center">
      <div
        className={`w-full max-w-4xl ${
          rides.length > 2 ? "scrollable-rides" : ""
        }`}
      >
        <h1 className="text-blue-700 font-serif text-2xl font-bold mb-4 text-center">
          Previously Booked Slots
        </h1>
        {rides.length > 0 ? (
          rides.map((ride) => (
            <div
              key={ride._id}
              className="border font-serif bg-white-200 p-4 rounded-xl mb-4 flex justify-between items-start"
            >
              <div>
                <h2 className="text-font-serif font-bold text-red-500 p-2 pd-2">
                 You have booked a slot for charging on the following details.
                </h2>
                <p className="block m-2 font-serif">Date of slot Booked : {new Date(ride.departure).toLocaleDateString()}</p>
                <p className="block m-2 font-serif">Cost of the Charging: {ride.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No Available Slots.</p>
        )}
      </div>
    </div>
  );
}

export default JoinedPage;
