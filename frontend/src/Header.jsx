import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-white shadow-md flex justify-between items-center py-4 px-6">
      {/* Left side content */}
      <Link
        to={user ? "/account" : "/login"}
        className="ProfileMenu flex items-center"
      >
        <button style={{height:"40px", width:"100px",background:"#41cc5b",borderRadius:"5px" ,borderStyle : "none",color:"white"}}>{user ? "Account" : "Login"}</button>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg> */}
      </Link>

      {/* Center content */}
      <div className="flex items-center space-x-5">
        {/* LOGO */}
        <a href="/" className="Logo flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#4CAF50"
            className="w-10 h-8"
          >
            <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
            <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
            <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
          </svg>

          <span className="font-bold text-xl font-serif">EV Connect</span>
        </a>
      </div>

      {/* Right side content */}
      <div className="flex items-center space-x-4">
      
    

        {/* Book Slot Link */}
        {user && user.name === "admin" && (
          <Link
            to="/publride"
            className="PostRide flex items-center gap-2 border border-white-300 rounded-full py-2 px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 2C6.48 2 2 6.48 2 12c0 2.076.647 4.04 1.864 5.664A2.991 2.991 0 0 0 7 19.243V22l4-3 4 3v-2.757c1.292-.826 2.157-2.267 2.588-3.81C21.353 16.042 22 14.083 22 12c0-5.52-4.48-10-10-10zm-1 17v-5h2v5m0-7H9"
              />
            </svg>
            <span class="font-serif">Publish Slot</span>
          </Link>
        )}
      </div>
    </header>
  );
}
