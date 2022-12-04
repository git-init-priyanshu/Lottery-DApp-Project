import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
        <div className='text-center'>You Are?</div>
        <div className='text-center'>
            <Link to = "/manager">
                <button className="btn btn-secondary" >Manager</button> 
            </Link>
            <br />
            <Link to = "/players">
                <button className="btn btn-secondary" >Player</button> 
            </Link>
        </div>
    </>
  )
}
