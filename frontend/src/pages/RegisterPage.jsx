import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  async function registerUser(ev) {
    ev.preventDefault();
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }
    try {
      await axios
        .post("/register", {
          email,
          password,
        })
        .then((response) => {
          console.log("Response:", response.data);
        });
      alert("Registration Successful. Now you can log in");
    } catch (e) {
      alert("Registration failed. Check if Email already Used");
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around p-10">
      <div className="mb-40" style={{width:"500px",height:"450px",margin:"auto",borderRadius:"20px",boxShadow:"rgba(14, 30, 37, 0.12) 0px 4px 8px 0px, rgba(14, 30, 37, 0.32) 0px 4px 24px 0px"}}>
        <h1 className="text-4xl text-center mb-4 font-serif pt-5">Register</h1>
        <form className="max-w-md mx-auto " action="" onSubmit={registerUser}>
          <input
           style={{marginTop: "30px",fontFamily:"poppins"}}
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <div className="flex gap-4">
            <input
               style={{marginTop: "20px",fontFamily:"poppins"}}
              type="email"
              placeholder="Enter Your Email "
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="w-1/2 px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
            />
          </div>
          <input
           style={{marginTop: "20px",fontFamily:"poppins"}}
            type="password"
            placeholder=" Enter Your Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button  style={{marginTop: "30px", fontSize:"20px",fontFamily:"serif"}} type="submit" className="primary">
            {" "}
            Register
          </button>
          <div style={{marginTop : "20px",fontFamily:"poppins"}} className="text-center py-2 text-gray-500">
            Already a Member?{"  "}
            <Link style={{fontFamily:"poppins",marginTop:"20px"}}  className=" text-black-700" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
