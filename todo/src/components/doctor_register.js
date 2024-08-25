import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctor_Ragister } from '../Service/api';
import Loader from '../loader/loader';

export default function DoctorRegisterform(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [experience, setExperience] = useState('');
    const [address, setAddress] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            setLoading(true)
            localStorage.clear();
            const body = {
                name,
                email,
                mobileNumber,
                specialty,
                yearsOfExperience: experience,
                address,
                password,
            };
            try {
                const data = await doctor_Ragister(body,profilePicture);
                console.log(data);
                
                if (data) {
                    props.showAlert("Account created Successfully", "success");
                    setLoading(false)
                    navigate("/doctor_login");
                }
                console.log(data);
            } catch (error) {
                console.log(error);
                
                console.log(error.response.data);
                props.showAlert(error.response.data.message, "danger");
            }
        } else {
            props.showAlert("Password and confirm password do not match", "danger");
        }
        setLoading(false)
    };

    return (
        <div className='container'>
            <h1>Doctor Registration Form</h1>
          { !loading && <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                    <input
                        type="file"
                        className="form-control"
                        id="profilePicture"
                        onChange={(e) => setProfilePicture(e.target.files[0])}
                        required
                    />
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
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
                    <div className="col-md-6">
                        <label htmlFor="specialty" className="form-label">Specialty</label>
                        <input
                            type="text"
                            className="form-control"
                            id="specialty"
                            placeholder='Specialty'
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
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
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="experience" className="form-label">Experience (in years)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="experience"
                            placeholder='Experience'
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
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
                        onClick={() => navigate('/doctor_login')}
                    >
                        Login
                    </button>
                </div>
            </form>}
            {loading && <Loader/>}
        </div>
    );
}
