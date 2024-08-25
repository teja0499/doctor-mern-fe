import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/loader';
import { admin_login } from '../Service/api';

export default function AdminLoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[loading ,setloading]=useState(false)

    const navigate = useNavigate();
 
    const handleSubmit = async (e) => {
        try {
            setloading(true)
            e.preventDefault();
            const data = await admin_login({ email, password });
            // const data={}
            console.log(data);
            
            if (data) {
                console.log("hi");
                
                props.showAlert("Login Successful", "success");
                localStorage.setItem('aid', data.aid);
                localStorage.setItem('name', data.name);
                localStorage.setItem('email', data.email);
                localStorage.setItem('password', data.password);
                localStorage.setItem('userType', "admin");
                setloading(false)
                navigate("/new_doctor");
            }
        } catch (error) {
            console.log(error);
            setloading(false)
            props.showAlert(error?.response?.data.message ?? "internal server erroe","danger")
        }
        setloading(false)
    };

    return (
        <div className='container' style={{ marginBottom: '5rem' }}>
            <h2>Admin Login</h2>
           {loading ?<Loader/> :<form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
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
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
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
                <div className="flex justify-between">
                    <button type="submit" className="btn btn-primary mx-4">
                        Submit
                    </button>
                    {/* <button
                        type="button"
                        className="btn btn-primary mx-4"
                        onClick={() => navigate('/admin_register_form')}
                    >
                        Register
                    </button> */}
                </div>
            </form>}
        </div>
    );
}
