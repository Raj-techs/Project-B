import React, { useState } from 'react'
import Nav from '../../components/Nav'
import logoImage from "../../assests/bloodrop.png";
import PropTypes from "prop-types";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/Footer';
const UserReq = ({bloodBankRef,
    adminRef,
    searchBloodBankRef,
    searchVoluntaryDonorsRef,
    findNearBloodBanksRef}) => {
        const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
        const [isSigninDropdownOpen, setIsSigninDropdownOpen] = useState(false);
        const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

        const defaultDate = new Date().toISOString().slice(0, 10)
      
        const navigate = useNavigate();
      
        const scrollToSection = (ref) => {
          ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        };

        
        const toggleSignupDropdown = () => {
            setIsSignupDropdownOpen(!isSignupDropdownOpen);
          };
        
          const toggleSigninDropdown = () => {
            setIsSigninDropdownOpen(!isSigninDropdownOpen);
          };
        
          const toggleServicesDropdown = () => {
            setIsServicesDropdownOpen(!isServicesDropdownOpen);
          };


          const [reqData,setreqData]=useState({
            username:"",
            group:"",
            usrlocation:"",
            units:"",
            mobile:"",
            email:"",
            certificates:"",
            state:"",
            city:"",
            district:"",
            date:defaultDate
          })
          const {username,group,usrlocation,units,mobile,certificates,email,district,state,city,date}=reqData;
          const handleChange=(e)=>{
            setreqData({...reqData,[e.target.name]:e.target.value})
          }

          const submitHandler=async(e)=>{
            e.preventDefault()

            console.log(reqData);
            try {
            
              await axios.post('http://localhost:4000/user/request', reqData); // Replace with your JSON Server endpoint
        
              alert("Requested Successfully .")
          } catch (error) {
              console.error('Error adding user:', error);
          }
          }
    return (
        <>
            <nav className="body-font bg-red-800 text-white h-20 ">
      {/* <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"> */}
        <div className="flex title-font font-medium items-center text-white mb-4 md:mb-0 navbar">
          <img
            src={logoImage}
            alt="Bloodrop Logo"
            className="w-10 h-10 p-2 bg-white rounded-full"
          />
          <span className="ml-3 text-xl">BLOODROP</span>
        </div>
        <nav className="opts">
          <Link to='/user/home'><a href="/" className="mr-5 hover:text-gray-900">
            HOME
          </a></Link>

          <div className="relative">
            <button
              onClick={toggleServicesDropdown}
              className="mr-5 hover:text-gray-900 cursor-pointer"
            >
              SERVICES
            </button>
            {isServicesDropdownOpen && (
              <div className="absolute bg-white text-black right-0 mt-2 w-48 rounded-lg shadow-lg">
                <button
                  onClick={() => {
                    scrollToSection(searchBloodBankRef);
                    setIsServicesDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                >
                  Search Blood Bank
                </button>
                <button
                  onClick={() => {
                    scrollToSection(searchVoluntaryDonorsRef);
                    setIsServicesDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                >
                  Search Voluntary Donors
                </button>
                <button
                  onClick={() => {
                    scrollToSection(findNearBloodBanksRef);
                    setIsServicesDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                >
                  Find Near Blood Banks
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <Link to='/user/req'><button
              className="mr-5 hover:text-gray-900 cursor-pointer"
            >
              REQUEST
            </button></Link>
            
          </div>
          <div className="relative">
            <button
              onClick={toggleSigninDropdown}
              className="mr-5 hover:text-gray-900 cursor-pointer"
            >
              BLOG
            </button>
            
          </div>
          <a href="/about" className="mr-5 hover:text-gray-900">
            ABOUT US
          </a>
        </nav>
        <button className="inline-flex items-center bg-black border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Know More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      {/* </div> */}
    </nav>
             <div className="max-w-4xl p-3 mx-auto flex flex-col justify-center text-center">
      <h1 className="text-center text-3xl font-semibold">REQEST BLOOD</h1>
      <form
        onSubmit={submitHandler}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 max-w-4xl p-5 mx-auto"
      >
       
        <div>
          <label htmlFor="BloodBankName" className="block text-left mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            value={username}
            onChange={handleChange}
            className="bg-gray-200 rounded-lg p-3 w-full"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-left mb-1">
            Group
          </label>
          <input
            type="text"
            placeholder="Enter Group"
            name="group"
            value={group}
            onChange={handleChange}
            className="bg-gray-200 rounded-lg p-3 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="firstRegistrationDate"
            className="block text-left mb-1"
          >
            User Location
          </label>
          <input
            type="text"
            placeholder="Enter Location"
            name="usrlocation"
            value={usrlocation}
            onChange={handleChange}
            className="bg-gray-200 rounded-lg p-3 w-full"
          />
        </div>
        <div>
          <label htmlFor="LicenseNo" className="block text-left mb-1">
            Units
          </label>
          <input
            type="text"
            placeholder="Enter Units"
            name="units"
            value={units}
            onChange={handleChange}
            className="bg-gray-200 rounded-lg p-3 w-full"
          />
        </div>
        <div>
          <label htmlFor="fromDate" className="block text-left mb-1">
            Mobile No
          </label>
          <input
            type="text"
            placeholder="Enter Mobile No"
            name="mobile"
            value={mobile}
            onChange={handleChange}
            className="bg-gray-200 rounded-lg p-3 w-full"
          />
        </div>
        <div>
          <label htmlFor="ToDate" className="block text-left mb-1">
              Email
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={handleChange}
            className="bg-gray-200 rounded-lg p-3 w-full"
          />
        </div>
        
        <div>
          <label htmlFor="contactPersonEmail" className="block text-left mb-1">
            Certificates
          </label>
          <input
            type="text"
            placeholder="Enter Certificates No's"
            name="certificates"
            value={certificates}
            onChange={handleChange}
            className="bg-gray-200 rounded-lg p-3 w-full"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-left mb-1">
            City
          </label>
          <input
            type="text"
            placeholder="Enter City"
            name="city"
            value={city}
            onChange={handleChange}
            className="bg-gray-200 rounded-lg p-3 w-full"
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-left mb-1">
            State
          </label>
          <input
            type="text"
            placeholder="Enter State"
            name="state"
            value={state}
            onChange={handleChange}
            className="bg-gray-200 rounded-lg p-3 w-full"
          />
        </div>
        <div>
          <label htmlFor="district" className="block text-left mb-1">
            District
          </label>
          <input
            type="text"
            placeholder="Enter District"
            name="district"
            value={district}
            onChange={handleChange}
            className="bg-gray-200 rounded-lg p-3 w-full"
          />
        </div>
        
        <button
          type="submit"
          className="col-span-1 md:col-span-2 lg:col-span-3 bg-red-500 p-3 rounded-lg text-white mt-5"
        >
           Request
        </button>
      </form>
      
    </div>
    <Footer/>
        </>
    )
};
UserReq.propTypes = {
    bloodBankRef: PropTypes.object.isRequired,
    adminRef: PropTypes.object.isRequired,
    searchBloodBankRef: PropTypes.object.isRequired,
    searchVoluntaryDonorsRef: PropTypes.object.isRequired,
    findNearBloodBanksRef: PropTypes.object.isRequired,
  };

export default UserReq
