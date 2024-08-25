import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { patient_login, test } from '../Service/api';
import Loader from '../loader/loader';
// import { login } from '../Service/api';
// import { useDispatch } from 'react-redux';
// import { setAdmin, setUser_id } from './redux/reducer/authSlice'; // Adjust the path as necessary

export default function PatientLogin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[loading ,setloading]=useState(false)

  const navigate = useNavigate();
  // const dispatch = useDispatch(); 

  const handleSubmit = async (event) => {
    try {
      setloading(true)

      event.preventDefault()
        const data= await patient_login({email,password}); 
        console.log(data);
        
        if(data)
        {
          props.showAlert("Login  Successfully","success")
              localStorage.setItem('pid', data._id);
              localStorage.setItem('name', data.name);
              localStorage.setItem('password', data.password);
              localStorage.setItem('userType', "user");
              setloading(false)
              console.log("data");
              
          navigate("/all_doctor")
        }
    } catch (error) {
      console.log(error);
      if(error?.response?.data)
      {props.showAlert(error?.response?.data.message,"danger")}
      else 
      {
        props.showAlert("Network issue","danger")
      }

     
    }
    setloading(false)
  };

  const havingData=async ()=>{
    try {
       
        
    await test();
    } catch (error) {
      console.log(error);
    //   props.showAlert(error.response.data,"danger")
    }
  }
  useEffect(() => {  
    if(localStorage.length!==0)
    {
      const userType=localStorage.getItem("userType");
      if(userType==="user")
      {
        navigate("/all_doctor");
      }
      else if(userType==="doctor")
      {
        navigate("/consultation_history")
      }
    }
  }, [])
  
  
  return (
   (loading ?  <Loader/> : <div className='container' style={{ marginBottom:'5rem' }}>
        <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
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
                onClick={() => navigate('/user_ragister_form')}
            >
                Register
            </button>
          
        </div>
      </form>
    </div> )
  );
}
