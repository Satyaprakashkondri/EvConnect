import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
// import './Login.css'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter both email and password");
      return;
    }
    try {
      const { data } = await axios.post("/login", { email, password });
      if (data === "not found" || data === "pass Not Ok") {
        alert("Invalid Email or Password");
      } else {
        setUser(data);
        alert("Login Success");
        setRedirect(true);
      }
    } catch (error) {
      // console.error("Login Error:", error); // Log any errors
      alert("Login Failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <div className="flex items-center justify-around p-24">
    <div className=" bg-white rounded-lg shadow-lg" style={{width:"500px",height:"400px",margin:"auto",borderRadius:"20px",boxShadow:"rgba(14, 30, 37, 0.12) 0px 4px 8px 0px, rgba(14, 30, 37, 0.32) 0px 4px 24px 0px"}}>
      <h1 className="text-4xl text-center mb-4 font-serif pt-5">Login</h1>
      <form
        className="max-w-md mx-auto "
        action=""
        onSubmit={handleLoginSubmit}
      >
        <input 
          style={{marginTop: "50px",fontFamily:"poppins"}}
          type="email"
          placeholder="Enter Your Mail"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          style={{marginTop: "30px",fontFamily:"poppins"}}
          type="password"
          name=""
          id=""
          placeholder="Enter Your Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="primary" style={{marginTop: "30px", fontSize:"20px",fontFamily:"serif"}}>Login</button>
        <div className="text-center py-2 text-gray-500 font-serif" style={{marginTop : "20px",fontFamily:"poppins"}}>
          Don't have an account Yet?{" "}
          <Link style={{fontFamily:"poppins",marginTop:"20px"}} className=" text-black-700 text-black" to={"/register"}>
            Register Now
          </Link>
        </div>
      </form>
    </div>
  </div>
  
  );
}
