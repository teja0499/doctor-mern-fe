import React, { useState, useEffect } from 'react'
import { approved_doctor, get_new_doctor } from '../Service/api'
import Loader from '../loader/loader';


export default function NewDoctor() {
    const [doctorData, setDoctorData] = useState([]);
    const [info, setInfo] = useState(false);
    const [doctor, setDoctor] = useState(null);
    const[loading ,setloading]=useState(false)

    const getDoctors = async () => {
        try {
            setloading(true)
            const data = await get_new_doctor();
            setDoctorData(data);
            console.log(data);
            setloading(false)
        } catch (error) {
            console.error(error);
            setloading(false)
        }
        
    };

    const showInfo = (data) => {
        console.log(data);
        setInfo(true);
        setDoctor(data);
    };

    const isApprove = async (data, flag) => {
        try {
            setloading(true)
            const doctorData = {
                ...data,
                adminApprove: flag,
            };
            await approved_doctor(doctorData);
            getDoctors();
            setloading(false)
        } catch (error) {
            console.error(error);
            setloading(false)
        }
    };

    useEffect(() => {
        getDoctors();
    }, []);

    return (
        <div className='container'>
            {loading && <Loader/>}
            {!info && (!loading &&
                doctorData.length!==0 ?  <div className='row'>
                    {doctorData.map((data, index) => (
                        <div className='col-md-4 mb-4' key={index}>
                            <NewDoctorCard
                                key={index}
                                doctor={data}
                                isApprove={isApprove}
                                showInfo={showInfo}
                            />
                        </div>
                    ))}
                </div>:
                <h4 style={{textAlign:'center'}}><p>No New Docotor Register</p></h4>
            )
            }
            {info && doctor && (!loading &&
                <div>
                    <h2>Information Display</h2>
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Name:</strong> {doctor.name}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Email:</strong> {doctor.email}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Mobile Number:</strong> {doctor.mobileNumber}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Address:</strong> {doctor.address}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Specialty:</strong> {doctor.specialty}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Years of Experience:</strong> {doctor.yearsOfExperience}
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => setInfo(false)}>
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}

export const NewDoctorCard = (props) => {
    const { name, did, specialty,profilePicture } = props.doctor;
    const { showInfo ,isApprove} = props

   
    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
            <img src={profilePicture} className="card-img-top" alt="..." style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                    <h5 className="card-title">Dr. {name}</h5>
                    <h6 className="card-title">specialty : {specialty}</h6>
                    <button className="btn btn-success mx-2" onClick={() => isApprove(props.doctor,true)}>
                        Approve
                    </button>
                    <button className="btn btn-danger  mx-2" onClick={() => isApprove(props.doctor,false)}>
                        Reject
                    </button>
                    <button className="btn btn-info mx-2 mt-2 " onClick={() => showInfo(props.doctor)}>
                        Doctor Info
                    </button>
                </div>
            </div>

        </div>
    )
}

