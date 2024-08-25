import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { admin_Ragister } from '../Service/api';
// import { admin_Register } from '../Service/api'; // Assuming you have this API endpoint

export default function AdminRegisterForm(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const[loading ,setloading]=useState(false)

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setloading(false)
           if(password===confirmPassword){
            const body = {
                name,
                email,
                mobileNumber,
                password,
            };
            const data = await admin_Ragister(body);
            if (data) {
                props.showAlert("Account created Successfully", "success");
                navigate("/admin_login");
            }
           }
           else{
            props.showAlert("Password andConfirm Password does not match", "danger");
           }
        } catch (error) {
            console.log(error.response.data);
            props.showAlert(error.response.data, "danger");
        }
    };

    return (
        <div className='container'>
            <h1>Admin Registration Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                  
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="mobileNumber"
                            placeholder='Phone no.'
                            value={mobileNumber}
                            pattern="\d{10}"
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary mx-3">
                        Register
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/admin_login')}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
