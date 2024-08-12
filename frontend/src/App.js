import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import Toaster from 'react-hot-toast';
import { Context } from './index.js';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login.js';
import Register from './components/Auth/Register.js';
import Navbar from './components/layout/Navbar.js';
import Footer from './components/layout/Footer.js';
import Home from './components/Home/Home.js';
import Jobs from './components/job/Jobs.js';
import JobDetails from './components/job/JobDetails.js';
import MyJobs from './components/job/MyJobs.js';
import PostJob from './components/job/PostJob.js';
import Application from './components/Applications/Application.js';
import MyApplication from './components/Applications/MyApplication.js';
import NotFound from './components/NotFound/NotFound.js';

const App = () => {
  // eslint-disable-next-line
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v1/user/getUserDetails", { withCredentials: true });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [setIsAuthorized, setUser]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/job/getAll" element={<Jobs />} />
        <Route path="job/:id" element={<JobDetails />} />
        <Route path="job/post" element={<PostJob />} />
        <Route path="job/me" element={<MyJobs />} />
        <Route path="application/:id" element={<Application />} />
        <Route path="application/me" element={<MyApplication />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <Toaster />
    </>
  );
};

export default App;



// import {React, useContext, useEffect} from 'react';
// import axios from 'axios';
// import Toaster from 'react-hot-toast';
// import {Context} from './index.js';
// import { Routes,Route } from 'react-router-dom';
// import './App.css';
// import Login from './components/Auth/Login.js';
// import Register from './components/Auth/Register.js';
// import Navbar from './components/layout/Navbar.js';
// import Footer from './components/layout/Footer.js';
// import Home from './components/Home/Home.js';
// import Jobs from './components/job/Jobs.js';
// import JobDetails from './components/job/JobDetails.js';
// import MyJobs from './components/job/MyJobs.js';
// import PostJob from './components/job/PostJob.js';
// import Application from './components/Applications/Application.js';
// import MyApplication from './components/Applications/MyApplication.js';
// import NotFound from './components/NotFound/NotFound.js';



// const App = () => {


// const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);

// useEffect(()=>{
//   const fetchUser = async ()=>{
//     try {
//       const response= axios.get("http://localhost:4001/api/v1/user/getUserDetails",{withCredentials:true});
//       setUser(response.data.user);
//       setIsAuthorized(true);
//     } catch (error) {
//       setIsAuthorized(false);
//     }
//   };
//   fetchUser();
//   },[isAuthorized]);

//   // if(isAuthorized){
//   //   return <Navigate to={}/>
//   // }

//   return (
//   <>

//     <Navbar/>

//     <Routes>
//     <Route path="/" element={<Home/>}/>
//     <Route path="/Login" element={<Login/>}/>
//     <Route path="/Register" element={<Register/>}/>
//     <Route path="/job/getAll" element={<Jobs/>}/>
//     <Route path="job/:id" element={<JobDetails/>}/>
//     <Route path="job/post" element={<PostJob/>}/>
//     <Route path="job/me" element={<MyJobs/>}/>
//     <Route path="application/:id" element={<Application/>}/>
//     <Route path="application/me" element={<MyApplication/>}/>
//     <Route path="*" element={<NotFound/>}/> {/*when we are using * in path that means when there is no path define by default it will redirect to the star path */}
//     </Routes>

//     <Footer/>
//     <Toaster/>

//   </>
//   )
// }

// export default App
