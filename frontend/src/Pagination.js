import React from 'react'
import { useState } from 'react'

const Pagination = ({gps, pageHandler, currpage}) => {
    let pageNumbers = []
    for(let i=1; i<Math.ceil(gps.length/5)+1; i++){
        pageNumbers.push(i)
    };
  return (
    <div>
    <center>
    {currpage!=1 &&
    <button className='pagebutton' onClick={()=>pageHandler(currpage-1)}>Previous</button>
    }
    {pageNumbers.map(page=><button className='pagebutton' onClick={()=>pageHandler(page)}>{page}</button>)}
    {currpage!=Math.ceil(gps.length/5) &&
    <button className='pagebutton' onClick={()=>pageHandler(currpage+1)}>Next</button>
    }
    </center>
    </div>
  )
}

export default Pagination