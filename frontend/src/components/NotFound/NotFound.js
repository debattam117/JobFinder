import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css';

const NotFound = () => {
  return (
    <>
    <section className='Page Not Found!'>
     <div className='Content'>
      <img src="/notfound.png" alt="not found"/>
      <Link to={"/"}>RETURN TO HOME</Link>
     </div>
    </section>
    </>
  )
}

export default NotFound
