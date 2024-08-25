import React, { useState, useEffect } from 'react';
import { getAllprescription } from '../Service/api'; // Adjust import path as needed
import Loader from '../loader/loader';

export default function GetAllprescription(props) {
    const [prescription, setPrescription] = useState([]);
    const [info, setInfo] = useState(false);
    const [consultation, setConsultation] = useState(null);
    const[loading,setloading]=useState(false)
    

    const fetchprescription = async () => {
        try {
            setloading(true)
            const data = await getAllprescription();
            setPrescription(data);
            setloading(false)
        } catch (error) {
            console.error(error);
            props.showAlert("Internal server issue", "danger");
            setloading(false)
            // Handle error properly, e.g., show an alert or message
        }
    };

    const showInfo = (data) => {
        setInfo(true);
        setConsultation(data);
    };

    useEffect(() => {
        fetchprescription();
    }, []);

    return (
        <div className='container'>
            {loading && <Loader/>}
            {!info && (!loading &&
                prescription.length !== 0 ? (
                    <div className='row'>
                        {prescription.map((data, index) => (
                            <div className='col-md-4 mb-4' key={index}>
                                <ConsultationCard
                                    key={index}
                                    consultation={data}
                                    showInfo={showInfo}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <h4 style={{ textAlign: 'center' }}>
                        <p>No prescription Found</p>
                    </h4>
                )
            )}
            {info &&  ( !loading &&
                <div>
                    <h2>Consultation Details</h2>
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Doctor Name:</strong> {consultation.doctorName}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Patient Name:</strong> {consultation.patientName}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Date:</strong> {consultation.date}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Allergies:</strong> {consultation.allergies}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Current Illness:</strong> {consultation.currentIllness}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Recent Surgery:</strong> {consultation.recentSurgery}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Others:</strong> {consultation.others}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Diabetics:</strong> {consultation.diabetics ? 'Yes' : 'No'}
                        </div>
                        <h5>Doctor Consultation</h5>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Care to be Taken:</strong> {consultation.careToBeTaken || "N/A"}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Medicine:</strong> {consultation.medicine || "N/A"}
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

export const ConsultationCard = (props) => {
    const { doctorName, patientName, date, view } = props.consultation;
    const { showInfo } = props;

    return (
        <div className="card" style={{ width: '100%', height: '100%' }}>
            <div className="card-body">
                <h5 className="card-title">Doctor: {doctorName || "NA"}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Patient: {patientName}</h6>
                <p className="card-text">Date: {date}</p>
                <button className="btn btn-info mx-2 mt-2" onClick={() => showInfo(props.consultation)}>
                    View Details
                </button>
            </div>
        </div>
    );
}
