import React from 'react'
import {useEffect, useState, useContext} from 'react'
import {useParams, Navigate} from 'react-router-dom'
import axios from 'axios'
import { store } from './App'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

const Detail = () => {
  const token = localStorage.getItem("jwt");
  const {id} = useParams();
  const [gpsdata, setGpsdata] = useState([]);
  const [logdata, setLogdata] = useState([]);

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Duration',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/gps/${id}`, {headers: {Authorization: `Bearer ${token}`}}).then(res => {
      setGpsdata(res.data)
    })
  },[])

  const chart = () => {
    let locs = [];
    let durs = [];
    let bgcolor = [];
    axios.get(`http://localhost:5000/api/gps/query/${id}`, {headers: {Authorization: `Bearer ${token}`}}).then(res => {
      setLogdata(res.data);
      for(const dataObj of res.data){
        locs.push(dataObj.Location)
        durs.push(5)
        if(dataObj.Location=='L1'){bgcolor.push('red')}
        if(dataObj.Location=='L2'){bgcolor.push('blue')}
        if(dataObj.Location=='L3'){bgcolor.push('green')}
        if(dataObj.Location=='L4'){bgcolor.push('orange')}
        if(dataObj.Location=='L5'){bgcolor.push('yellow')}
      }
      setData({
        labels: locs,
        datasets: [
          {
            label: 'Duration',
            data: durs,
            backgroundColor: bgcolor,
            borderColor: bgcolor,
            borderWidth: 1,
          },
        ],
      })
    })
  }

  useEffect(()=>{
    chart();
  },[])

  return (
    <div className='container-detail'>
    <table className='detail-table'>
    <h1>{gpsdata.DeviceID}</h1>
    <h2>{gpsdata.DeviceType}</h2><br />
    <tr>
    <td>
    <table className='log-table'>
      <tr>
        <th>Timestamp</th>
        <th>Location</th>
      </tr>
      {logdata.map(item=>
        <tr>
        <td>{item.Timestamp}</td>
        <td>{item.Location}</td>
        </tr>
      )}
    </table>
    </td>
      <div className='pie-chart'>
      <Pie data={data} />
      </div>
    </tr>
    </table>
    </div>
  )
}

export default Detail