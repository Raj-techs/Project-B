import React, { useEffect, useState } from 'react'
import { UsersData } from '../../data/Users';
import { Link, useParams } from 'react-router-dom';
import Nav from '../Nav';
import axios from 'axios';
import Footer from '../Footer';
const DetailsGov = () => {
    let { id } = useParams()
    const [reqData, setreqData] = useState([])
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3000/requests");
                setreqData(res.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    let donar = reqData.find(items => items.id === id)

    console.log(donar);
    const [userData, setUserData] = useState(1, 2, 3, 4, 5)
    return (
        <>
            <Nav />
            {loading ? (
                <p>Loading...</p>
            ) : !donar ? (
                <p>No donor found</p>
            ) : (
                <div className="worker-profile">
                    <div className="worker-img">
                        <h1 style={{ position: "absolute", top: "80px", left: "10px", fontSize: "2em", fontWeight: "bolder" }}>Request</h1>
                        <i class="fa-solid fa-user" style={{ fontSize: "6em", marginBottom: "10px" }}></i>

                        <table width={"300px"}>
                            <tr>
                                <th>Name :</th>
                                <td>{donar.username}</td>
                            </tr>
                            <tr>
                                <th>Group :</th>
                                <td>{donar.group}</td>
                            </tr>
                            <tr>
                                <th>Units Needed :</th>
                                <td>{donar.units}</td>
                            </tr>
                            <tr>
                                <th>Mobile :</th>
                                <td>{donar.mobile}</td>
                            </tr>
                            <tr>
                                <th>Location :</th>
                                <td>{donar.usrlocation}</td>
                            </tr>
                            <tr>
                                <th>Ceritificates :</th>
                                <td>{donar.certificates}</td>
                            </tr>
                            <tr>
                                <th>Stamps no :</th>
                                <td>{donar.stamps}</td>
                            </tr>
                            <tr>
                                <th>Date :</th>
                                <td>{donar.date}</td>
                            </tr>
                        </table>

                    </div>

                    <div className="worker-work">
                        <div id='report-1'>
                            <b >Certi-1</b>
                            <img src="https://img.freepik.com/premium-vector/certificate-blood-donation-04_983286-1509.jpg" alt="" width={"100%"} height={"100%"} />

                        </div>
                        <div id='report-2'>
                            <b>Certi-2</b>
                            <img src="https://img.freepik.com/premium-vector/blood-donation-certificate-template-elegant-luxury-contrast-dynamic_730296-76.jpg" alt="" width={"100%"} />
                        </div>

                        <div id="report-3">
                            <b >Certi-3</b>
                            <img src="https://img.freepik.com/premium-vector/free-vector-blood-donation-certificate-template-red-background-recognition-life-saving_764504-438.jpg" alt="" width={"100%"} />
                        </div>

                    </div>

                    <div className="worker-cAp">
                        <h2>Visited Status</h2>
                        <table border={1}>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Day</th>
                                <th>Certi</th>
                            </tr>
                            <tr>
                                <td>22/6/2024</td>
                                <td>10:20 AM</td>
                                <td>Monday</td>
                                <td><a href="#report-1">check</a></td>

                            </tr> <tr>
                                <td>22/6/2024</td>
                                <td>12:00 PM</td>
                                <td>Wednesday</td>
                                <td><a href="#report-2">check</a></td>

                            </tr> <tr>
                                <td>22/6/2024</td>
                                <td>3:30 PM</td>
                                <td>Tuesday</td>
                                <td><a href="#report-3">check</a></td>

                            </tr>
                        </table>

                        <div className="msg-box">
                            <h3>Message</h3>
                            <textarea name="" id="" cols="40" rows="4" placeholder='Enter msg to Patient'></textarea>
                            <button>Send</button>
                        </div>
                    </div>
                </div>)}
            <div style={{ height: "100vh", position: "relative",overflowY:"scroll" }}>

                <NeedAllocate reqUser={donar} />
            </div>
            {/* <Footer/> */}
        </>
    )
}
const NeedAllocate = (props) => {
    console.log(props);
    const [banksData, setbanksData] = useState([])
    const [loading, setLoading] = useState(true);
    const [available,setAvailable]=useState(banksData);
    const [searchText,setSearchText]=useState("")

    const [bankNameToTransfer, setBankNameToTransfer] = useState("");
    const [cityNameToGet, setCityNameToGet] = useState("");
    const defaultDate = new Date().toISOString().slice(0, 10)

    const handleAllocate = async (bank) => {
    

        if (!props.reqUser || !props.reqUser.units) {
            console.error("Error: reqUser is missing or does not contain 'units'");
            return;
        }

        try {
            const data = {
                fromBank: bank.bankName,
                fromLocation: bank.location,
                fromCity: bank.city,
                group: props.reqUser.group,
                units: props.reqUser.units,
                transferToBankName: bankNameToTransfer,
                transferCity: cityNameToGet,
                status: "processing...",
                date: defaultDate
            };
            console.log(data);
        
            await axios.post('http://localhost:3000/allocated', data);
            alert('Blood allocated successfully!');
        } catch (error) {
            console.error("Error allocating data", error);
        }
    };

    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const banks = await axios.get("http://localhost:3000/banks");
                setbanksData(banks.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    useEffect(() => {
        setAvailable(banksData);
    }, [banksData]);
    
    const filterAvailBanks = filterBank(available,searchText)

    function filterBank(available,searchKey){
        if (!available) return [];
        return (available.filter(p => p.city && p.city.toLowerCase().includes(searchKey.toLowerCase()))
        )
    
    }
    

    return (
        <>
        <div style={{ position: "relative", display: "flex", justifyContent: 'center', gap: "90px", alignItems: "center", flexDirection: "column" }}>
            <div className="allocate">
                <b>Need to : <i>Undrajavaram,U Mandal, East Godavari District,Andhra Pradesh</i></b><br />
                <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginBottom: "50px" }}>
                    <input type="text" placeholder='Search for City' onChange={e=> setCityNameToGet(e.target.value)} />
                    <p>To Bank : <input type="text" placeholder='Enter Bank Name to Transfer'  onChange={e => setBankNameToTransfer(e.target.value)} /></p>
                </div>
            </div>
            <div className="allocate">
                {/* <b>Need to : <i>Undrajavaram,U Mandal, East Godavari District,Andhra Pradesh</i></b><br /> */}
                <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginBottom: "50px" }}>
                    <input type="text" placeholder='Search for City'  onChange={e=>setSearchText(e.target.value)}  />
                    {/* <p>To Bank : <input type="text" placeholder='Enter Bank Name to Transfer' /></p> */}
                </div>
            </div>
            <table width={"80%"} >
                <tr >
                    <th style={{ backgroundColor: "black", color: "white" }}>Banks</th>
                    <th style={{ backgroundColor: "black", color: "white" }}>Location</th>
                    <th style={{ backgroundColor: "black", color: "white" }}>Groups</th>
                    <th style={{ backgroundColor: "black", color: "white" }}>Available</th>
                    <th style={{ backgroundColor: "black", color: "white" }}>More</th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td style={{display:"flex",gap:"10px",justifyContent:"space-around"}}><p>A+</p> <p>A-</p> <p>B+</p> <p>B- </p><p>AB+</p> <p>AB-</p> <p>O+</p> <p>O-</p></td>
                    <td></td>
                    <td></td>
                </tr>
                {filterAvailBanks ?  filterAvailBanks.map(bank=>{
                    return (
                        <tr>
                        {/* <td>{bank.bankName}</td> */}
                        <td>{bank.bankName}</td>
                        <td>{bank.city}</td>
                        <td style={{display:"flex",gap:"10px",justifyContent:"space-around"}}><p>A+</p> <p>A-</p> <p>B+</p> <p>B- </p><p>AB+</p> <p>AB-</p> <p>O+</p> <p>O-</p></td>

                        <td>5</td>
                        <td><button className='btn' onClick={() => handleAllocate(bank)}>Allocate</button></td>
                    </tr>
                    )
                }):banksData.map(bank=>{
                    return (
                        <tr>
                        <td>{bank.bankName}</td>
                        <td>{bank.city}</td>
                        <td>group</td>
                        <td>0</td>
                        <td><button className='btn' onClick={() => handleAllocate(bank)}>Allocate</button></td>
                    </tr>
                    )
                }) }
               
                
            </table>
        </div>
        </>
    )
}



export default DetailsGov
