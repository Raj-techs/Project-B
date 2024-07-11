import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [bank,setBanks]=useState([]);
    const [donars,setDonars]=useState([]);
    useEffect(_=>{
        axios.get("http://localhost:3000/banks").then(res=>setBanks(res.data))
        axios.get("http://localhost:3000/users").then(res=>setDonars(res.data))
    },[])
    console.log(bank);
    return (
        <>
            <div className="gov-dash">
                <div className="divs">
                    <i class="fa-regular fa-hospital"></i>
                    <h2 >Total Banks</h2>
                    <h3>{bank.length}</h3>
                </div>
                <div className="divs">
                <i class="fa-solid fa-person-circle-plus"></i>
                    <h2>Total Donars</h2>
                    <h3>{donars.length}</h3>
                </div>

                <div className="divs">
                    <i class="fa-regular fa-hospital"></i>
                    <h2>Thalassemia</h2>
                    <h3>9284</h3>
                </div>
                <div className="divs">
                <i class="fa-solid fa-house-chimney-medical"></i>
                    <h2>Total Banks</h2>
                    <h3>9284</h3>
                </div> 

                <div className="divs">
                <i class="fa-regular fa-user"></i>
                    <h2>Total Registered</h2>
                    <h3>9284</h3>
                </div>   
                
            </div>
        </>
    )
}

export default Dashboard
