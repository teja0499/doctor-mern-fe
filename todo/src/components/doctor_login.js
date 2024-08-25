import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctor_login } from '../Service/api';
import Loader from '../loader/loader';

export default function DoctorLogin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const data=await doctor_login({email,password})
      console.log(data);
      
      setLoading(false)
      if(data)
      {
        props.showAlert("Login  Successfully","success")
        localStorage.setItem('did', data._id);
        localStorage.setItem('name', data.name);
        localStorage.setItem('address', data.address);
        localStorage.setItem('password', data.password);
        localStorage.setItem('userType', "doctor");
       
        navigate("/consultation_req")
      }
      
    } catch (error) {
      console.log(error);
      setLoading(false)
      if(error?.response?.data?.message)
        {props.showAlert(error?.response?.data?.message,"danger")}
        else 
        {
          props.showAlert("Network issue","danger")
        }
    }
  };

  const havingData=async ()=>{
    try {
    
    } catch (error) {
      console.log(error);
      props.showAlert(error.response.data,"danger")
    }
  }
  useEffect(() => {  
  
  }, [])
  
  
  return (
    <div className='container' style={{ marginBottom:'5rem' }}>
       <h2>Doctor Login</h2>
     {!loading && <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between" >
            <button type="submit" className="btn btn-primary mx-4">
                Submit
            </button>
            <button
                type="button"
                className="btn btn-primary mx-4"
                onClick={() => navigate('/doctor_register_form')}
            >
                Register
            </button>
            
        </div>
      </form>}
      {loading && <Loader/>}
    </div>
  );
}
