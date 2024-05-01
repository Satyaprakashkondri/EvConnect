import React from "react";
import slotbook from "../assets/Assests/slotbook.jpg";
import chargestation from "../assets/Assests/chargestation.jpg";
import safety from "../assets/Assests/safety.jpg";
// import SearchFunc from "./SearchFunc";
const Services = () => {
  return (
    <div className="container mx-auto py-8 my-auto">
      <h1 className="flex justify-center font-serif text-4xl font-bold mb-6 my-12">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-9 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-serif font-bold mb-4">Slot Booking</h2>
          <p className="mb-4 font-serif">
            Book Slots for your daily EV needs trips with ease.
            Find available slots, compare Ev's, and book your slot in just a
            few clicks.
          </p>
          <img src = {slotbook} alt="Slot Booking" className="mx-auto" />
        </div>

        <div className="p-9 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-serif font-bold mb-4">Charge Station Services</h2>
          <p className="mb-4 font-serif">
            Become a charge station managers and offer slots to users traveling in your
            direction. Set your own schedule, choose your users.
          </p>
          <img style ={{paddingTop:"35px"}} src={chargestation} alt="Charge Station Services" className="mx-auto"
          />
        </div>

        <div className="p-9 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-serif font-bold mb-4">Safety & Security</h2>
          <p className="mb-4 font-serif ">
            Your safety is our top priority. We implement strict verification
            processes for Users and Charge Station managers, provide real-time tracking for
            booking slots, and offer 24/7 customer support.
          </p>
          <img
            style ={{paddingTop:"15px"}} 
            src={safety}
            alt="Safety & Security"
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
