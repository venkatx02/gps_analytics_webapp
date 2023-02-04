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
    let locs = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];
    let durs = [0, 0, 0, 0, 0, 0];
    let bgcolor = ['red', 'blue', 'green', 'orange', 'yellow', 'white'];
    axios.get(`http://localhost:5000/api/gps/query/${id}`, {headers: {Authorization: `Bearer ${token}`}}).then(res => {
      setLogdata(res.data);
      let sumOfList = 0;
      for(const dataObj of res.data){
        sumOfList=sumOfList+5;
        if(dataObj.Location=='L1'){
          durs[0]=durs[0]+5
        }
        if(dataObj.Location=='L2'){
          durs[1]=durs[1]+5
        }
        if(dataObj.Location=='L3'){
          durs[2]=durs[2]+5
        }
        if(dataObj.Location=='L4'){
          durs[3]=durs[3]+5;
        }
        if(dataObj.Location=='L5'){
          durs[4]=durs[4]+5
        }
        if(dataObj.Location=='L6'){
          durs[5]=durs[5]+5
        }
      }
      let percentList = [];
      for(const x of durs){
        percentList.push((x/sumOfList)*100)
      }
      setData({
        labels: locs,
        datasets: [
          {
            label: 'Percentage of duration',
            data: percentList,
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