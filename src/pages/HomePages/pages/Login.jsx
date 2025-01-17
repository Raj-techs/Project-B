import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/HomeComponents/components/Header";
import axios from "axios";

const Login = () => {
  const [token,setToken]=useState()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobileNo: "", // Added mobileNo field
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

   
      const res = axios.post("http://localhost:4000/user/login",formData).then(res=>localStorage.setItem("token",res.data.token))
      // const data = await res.json();
      console.log(res);
      // if (!res.ok) {
      //   throw new Error(data.error || "Login failed");
      // }

      alert("Login successful!");

      navigate("/user/home");
    } catch (error) {
      alert(error.message);
      console.error("Error:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    
  
    navigate('/login'); 
  }


  return (
    <>
    <Header/>
    <div className="max-w-lg p-3 mx-auto flex flex-col justify-center text-center">
      <h1 className="text-center text-3xl font-semibold">SIGN IN</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 mt-7"
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 mt-5"
          required
        />
        <input
          type="text"
          placeholder="Enter your mobile number"
          id="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 mt-5"
          required
        />
        <button className="bg-red-500 p-3 rounded-lg text-white" type="submit">
          SIGN IN
        </button>
      </form>
      <div className="flex gap-5 mt-2">
        <p>Don't have an account?</p>
        <Link to="/register">
          <span className="text-red-500 font-semibold">Register</span>
        </Link>
      </div>
    </div></>
  );
};

export default Login;
