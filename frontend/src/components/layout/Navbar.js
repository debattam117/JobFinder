import React, { useContext, useState } from 'react'
import {Context} from '../../index.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {

  const[show,setShow]=useState(false);
  const{isAuthorized,setIsAuthorized,user}=useContext(Context);
  const navigateTo=useNavigate();
  const handleLogout=async()=>{
    try {
      const response=await axios.get("http://localhost:4001/api/v1/user/logout",{withCredentials:true});
      toast.success(response.data.message)
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  }

  return (
    <>
    <nav className={isAuthorized?"navbarShow":"navbarHide"}>
      
    </nav>
    </>
  )
}

export default Navbar
