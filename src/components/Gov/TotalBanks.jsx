import React, { useEffect, useState } from 'react'
import { UsersData } from '../../data/Users'
import { Link } from 'react-router-dom'
import axios from 'axios'
const TotalBanks = () => {
    const [users, setUsers] = useState([]);
    const [banks,setbanks]=useState([])
    const [searchCity,setsearchCity]=useState('') 
    const [searchBloodGroup,setsearchBloodGroup]=useState('') 
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filterAvailBankss, setFilterAvailBankss] = useState(banks);
    useEffect(_=>{
        axios.get("http://localhost:3000/banks").then(res=>setbanks(res.data))
        console.log(banks);
        axios.get('http://localhost:3000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
    },[])

    const filterAvailBanks = filterBank(banks,searchCity)
    const filterAvailBGroups = filterGroups(filteredUsers,searchBloodGroup)

    function filterBank(available,searchKey){
        if (!available) return [];
        return (available.filter(p => p.city && p.city.toLowerCase().includes(searchKey.toLowerCase()))
        )
    
    }
    function filterGroups(available,searchKey){
        if (!available) return [];
        return (available.filter(p => p.group && p.group.toLowerCase().includes(searchKey.toLowerCase()))
        )
    
    }
    const handleRowClick = (bankName) => {
        const filtered = users.filter(user => user.bankName === bankName);
        setFilteredUsers(filtered);
        console.log(filteredUsers);
      };
  return (
    <>
      <div className="total-banks">
        <div className="total-header">
            <button className='complete-btn'>Gov</button>
            <button className='complete-btn'>Private</button>
            <button className='complete-btn'>Red Cross</button>
        <input type="text" placeholder='Search for City' onChange={e=>setsearchCity(e.target.value)} style={{width:"170px",height:"30px",margin:"10px"}} />
        </div>

        <div className="total-bank">
        {filterAvailBGroups ? <table width={"100%"}>
        <input type="text" placeholder='Search for Group'  onChange={e=>setsearchBloodGroup(e.target.value)} style={{width:"170px",height:"30px",margin:"10px"}} />
                <tr >
                <th style={{backgroundColor:"black",color:"white"}}>Name</th>
                <th style={{backgroundColor:"black",color:"white"}}>Group</th>
                <th style={{backgroundColor:"black",color:"white"}}>Age</th>
                <th style={{backgroundColor:"black",color:"white"}}>Mobile</th>
                <th style={{backgroundColor:"black",color:"white"}}>More</th>
                </tr>
                {filterAvailBGroups ? filterAvailBGroups.map(items=>{
                    return(<tr>
                        <td style={{margin:"10px",fontSize:".6em"}}><i class="fa-solid fa-user"></i>
                            <p style={{ marginTop: "15px", marginLeft: "15px",fontSize:"1.6em" }}>{items.name}</p></td>
                        <td className="group">{items.group}</td>
                        <td className="group">{items.age}</td>
                        <td className="group">{items.mobile}</td>
                        <button className='btn' >Details</button>
                    </tr>)
                }): <h1>No Users Found</h1>}
            </table> : <h1>No Users Found</h1>}
        </div>

        <div className="total-users">
        <table style={{width:"100%"}}>
                <tr>
                <th>Name</th>
                <th>Location</th>
                <th>State</th>
                <th>Mobile</th>
                <th>More</th>
                </tr>
                {filterAvailBanks.map(items=>{
                    return(<tr  style={{margin:"20px"}}>
                        <td style={{margin:"10px",fontSize:".6em"}}><i class="fa-solid fa-user"></i>
                            <p style={{ marginTop: "15px", marginLeft: "15px",fontSize:"1.6em" }}>{items.bankName}</p></td>
                        <td className="group">{items.city}</td>
                        <td className="group">{items.state}</td>
                        <td className="group">{items.contactNo}</td>
                        <button className='btn' onClick={_=>handleRowClick(items.bankName)}>Details</button>
                    </tr>)
                })}
            </table>
        </div>
      </div>
    </>
  )
}

export default TotalBanks
