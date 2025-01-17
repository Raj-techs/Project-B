import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Transfer = () => {
  const [allcatedData,setallocateData]=useState([])
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/allocated");
            setallocateData(res.data);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []);
  return (
    <>
      <div className="gov-transfer">
        <div className="gov-trans-btns">
            <button className='btn'> Allocated</button>
            <button className='btn'> Less Occured areas</button>
        </div>
        <table>
            <tr >
                <th>From</th>
                <th>Loc</th>
                <th>To</th>
                <th>Loc</th>
                <th>Group</th>
                <th>Units</th>
                <th>Status</th>
                <th>More</th>
            </tr>
            {allcatedData.map(item=>{
              return(<tr>
                <td>{item.fromBank}</td>
                <td>{item.fromCity}</td>
                <td>{item.transferToBankName}</td>
                <td>{item.transferCity}</td>
                <td>{item.group}</td>
                <td>{item.units}</td>
                <td>{item.status}</td>
            </tr>)
            })}
            

                    </table>
        <div className="gov-trans-data"></div>
      </div>
    </>
  )
}

export default Transfer
