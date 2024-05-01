import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Bookings from "./JoinedPage.jsx";
import AllRidesPage from "./AllRidesPage.jsx";
import PostedRides from "./PostedRides.jsx";
import { FaRegHandshake } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { PiCarProfile } from "react-icons/pi";

export default function AccountPage() {
  const navigate = useNavigate();
  const { ready, user, setUser } = useContext(UserContext);
  const { redirect, setRedirect } = useState(false);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    // setRedirect("/");
    navigate("/");
  }

  if (!ready) {
    return "Loading.....";
  }
  if (ready && !user) {
    return <Navigate to={"/login"}></Navigate>;
  }

  function linkclasses(type = null) {
    let classes = "py-2 px-6 flex items-center";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }
  if (redirect) {
    return <Navigate to={redirect}></Navigate>;
  }
  return (
    <div style={{display:"flex"}}>
      <nav className="w-96 mt-8 gap-2 mb-8">
        <Link style ={{marginLeft:"20px",marginRight:"150px",marginBottom :"20px"}} to="/account" className={linkclasses("profile")}>
          <CgProfile
            style={{ marginRight: "8px", verticalAlign: "middle" }}
            size={20}
          />
          My Profile
        </Link>
        <Link style ={{marginLeft:"20px",marginRight:"150px",marginBottom :"20px"}} to="/account/bookings" className={linkclasses("bookings")}>
          <FaRegHandshake
            style={{ marginRight: "8px", verticalAlign: "middle" }}
            size={20}
          />
          Booked Slots
        </Link>
        {user && user.name === "admin" && (
        <Link style ={{marginLeft:"20px",marginRight:"150px",marginBottom :"20px"}} to="/account/myrides" className={linkclasses("myrides")}>
          <PiCarProfile
            style={{ marginRight: "8px", verticalAlign: "middle" }}
            size={20}
          />
          My published Slots
        </Link>
        )}
        <Link style ={{marginLeft:"20px",marginRight:"150px",marginBottom :"20px"}} to="/account/allrides" className={linkclasses("allrides")}>
          <PiCarProfile
            style={{ marginRight: "8px", verticalAlign: "middle" }}
            size={20}
          />
          Available Slots
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="flex flex-col items-center justify-center max-w-lg mx-auto text-center">
          Logged in as {user.name} ({user.email})
          <br />
          <button onClick={logout} className="primary mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "bookings" && <Bookings/>}
      {subpage === "myrides" && <PostedRides />}
      {subpage === "allrides" && <AllRidesPage />}
    </div>
  );
}
