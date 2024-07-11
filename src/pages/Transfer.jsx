import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Transfer = (props) => {
  console.log(props);
  const [transfer,setTransfer]=useState([])
  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/allocated');
            setTransfer(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    fetchUsers();
}, []);
const filteredTransfers = transfer.filter(item => item.fromBank === props.data.bankName);
console.log(filteredTransfers);
  return (
    <>
   
      <div className="transfer">
        <h2 style={{fontSize:"1.4em"}}>Transfer Details</h2>
        <div className="transfer-divs">
          
          {filteredTransfers ? filteredTransfers.map(item=>{
            if(item.fromBank ===  props.data.bankName){
              return(<div className="transfer-div">
                <p><p>Our Bank</p> <i class="fa-solid fa-arrow-right"></i> <p> {item.transferToBankName}</p> </p>
                <p>Blood Units : {item.units}</p>
                <p>Blood Group : {item.group}</p>
               <div style={{display:"flex",margin:"10px"}}> <button className='complete-btn'>Completed</button>
                <button className='update-btn'>update</button></div>
                <p>Date : {item.date}</p>

              </div>)
            }
            
          }): <div className="no-transfer"></div>} 
         
          
        </div>
        <div className="transfer-anim">
            <div className="car"></div>
            <div className="img1"></div>
            <div className="road"></div>
            <div className="img2"></div>
        </div>
      </div>
    </>
  )
}

export default Transfer
