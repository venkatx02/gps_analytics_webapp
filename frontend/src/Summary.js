import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';

const Summary = () => {
  let navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const [gps, setGps] = useState([]);
  const [perpage, setPerpage] = useState([]);
  const [currpage, setCurrpage] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(()=>{
    axios.get('http://localhost:5000/api/gps', {headers: {Authorization: `Bearer ${token}`}}).then(res => {
      setGps(res.data)
      setPerpage(res.data.slice(0,5))
      setCurrpage(1)
    })
  }, [])

  const pageHandler = (pagenumber) => {
    setPerpage(gps.slice((pagenumber*5)-5, pagenumber*5))
    setCurrpage(pagenumber)
  }

  if(!token){
    return <Navigate to="/login" />
    }
  return (
    <div className='container-summary'>
    <center>
      <h1>GPS Summary</h1>
      <input type='text' value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder='Search...'/>
      <table>
        <tr>
          <th>Device ID</th>
          <th>Device Type</th>
          <th>Latest Timestamp</th>
          <th>Latest Location</th>
        </tr>
        {perpage.filter((item)=> item.DeviceID.toLowerCase().includes(search.toLowerCase()) || item.DeviceType.toLowerCase().includes(search.toLowerCase())).map(item=>
          <tr onClick={()=>{navigate(`/detail/${item._id}`)}}>
          <td>{item.DeviceID}</td>
          <td>{item.DeviceType}</td>
          <td>{item.Timestamp}</td>
          <td>{item.Location}</td>
          </tr>
          )}
      </table>
      <Pagination gps={gps} pageHandler={pageHandler} currpage={currpage}/>
    </center>
    </div>
  )
}
export default Summary