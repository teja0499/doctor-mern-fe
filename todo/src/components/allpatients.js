import React, { useState, useEffect } from 'react';
import { getAllUser } from '../Service/api';
import Loader from '../loader/loader';

export default function AllPatients() {
    const [patients, setPatients] = useState([]);
    const [info, setInfo] = useState(false);
    const [patient, setPatient] = useState(null);
    const[loading ,setloading]=useState(false)

    const getPatients = async () => {
        try {
            setloading(true)
            const data = await getAllUser();
            setPatients(data);
            setloading(false)
        } catch (error) {
            console.error(error);
            // Handle error properly, e.g., show an alert or message
        }
    };

    const showInfo = (data) => {
        setInfo(true);
        setPatient(data);
    };


    useEffect(() => {
        getPatients();
    }, []);

    return (
        <div className='container'>
            {loading && <Loader/>}
            {!info && ( !loading &&
                patients.length !== 0 ? (
                    <div className='row'>
                        {patients.map((data, index) => (
                            <div className='col-md-4 mb-4' key={index}>
                                <PatientCard
                                    key={index}
                                    patient={data}
                                    showInfo={showInfo}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <h4 style={{ textAlign: 'center' }}>
                        <p>No Patients Found</p>
                    </h4>
                )
            )}
            {info && patient && (!loading &&
                <div>
                    <h2>Patient Information</h2>
                    <div style={{ marginBottom: '1rem' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                             <img src={patient.profilePicture} alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Name:</strong> {patient.name}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Email:</strong> {patient.email}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Mobile Number:</strong> {patient.mobileNumber}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Age:</strong> {patient.age}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>History of Illness:</strong> {patient.illness}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>History of Surgery:</strong> {patient.surgery}
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

export const PatientCard = (props) => {
    const { name, mobileNumber, profilePicture } = props.patient;
    const { showInfo, handleApproval } = props;

    return (
        <div className="card" style={{ width: '100%', height: '100%' }}>
            <img src={profilePicture} className="card-img-top" alt="Profile" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">Mobile: {mobileNumber}</p>
               
                <button className="btn btn-info mx-2 mt-2" onClick={() => showInfo(props.patient)}>
                    Show details
                </button>
            </div>
        </div>
    );
}
