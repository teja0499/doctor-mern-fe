import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patient_Ragister } from '../Service/api';
import Loader from '../loader/loader';

export default function PatientRagisterForm(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [illness, setIllness] = useState('');
    const [surgery, setSurgery] = useState('');
    const [age, setAge] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setProfilePic(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            if (password === confirmPassword) {
                setLoading(true)
                localStorage.clear();
                // const file = fileInput.files[0]
                const body = {
                    name,
                    email,
                    mobileNumber,
                    illness,
                    surgery,
                    age,
                    password,
                };
                const data = await patient_Ragister(body,profilePic);
                if (data) {
                    props.showAlert("Account created Successfully", "success");
                    setLoading(false)
                    navigate("/");
                }
                console.log(data);
            } else {
                props.showAlert("Password and confirm password do not match", "danger");
            }
            setLoading(false)
        } catch (error) {
            if(error?.response?.data.message)
            {
                props.showAlert(error.response.data.message, "danger");
            }
           else{
            props.showAlert("Internal server issue", "danger");
           }
            
        }
        setLoading(false)
        
    };

    return (
        <div className='container my-2'>
            <h1>User Registration Form</h1>
            {!loading && <form onSubmit={handleSubmit}>
                <div className="row mb-6">
                    <div className="col-md-12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <div className="d-flex align-items-center">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="file"
                                className="form-control ms-3"
                                id="profilePic"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                    </div>
                   
                </div>

                <div className="row mb-3">
                <div className="col-md-4">
                        <label htmlFor="age" className="form-label">Age (in years)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="age"
                            placeholder='Age'
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-4">
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
                    <div className="col-md-4">
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
                        <label htmlFor="illness" className="form-label">Illness</label>
                        <input
                            type="text"
                            className="form-control"
                            id="illness"
                            placeholder='Illness'
                            value={illness}
                            onChange={(e) => setIllness(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="surgery" className="form-label">Surgery</label>
                        <input
                            type="text"
                            className="form-control"
                            id="surgery"
                            placeholder='Surgery'
                            value={surgery}
                            onChange={(e) => setSurgery(e.target.value)}
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
                        Submit
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/')}
                    >
                        Login
                    </button>
                </div>
            </form>}
            {loading && <Loader/>}
        </div>
    );
}
