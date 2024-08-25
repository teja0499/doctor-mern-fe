import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ConsultationDetailsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const consult = location.state?.consult;

    if (!consult) {
        return <p>No consultation details available.</p>;
    }

    return (
        <div className="container mt-4">
            <h2>Consultation Details</h2>
            <div className="card" style={{ width: "100%", padding: "20px" }}>
                <h5 className="card-title">Doctor: {consult.doctorName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Date: {consult.date}</h6>
                <p className="card-text"><strong>Patient Name:</strong> {consult.patientName}</p>
                <p className="card-text"><strong>Illness:</strong> {consult.currentIllness}</p>
                <p className="card-text"><strong>Care to be Taken:</strong> {consult.careToBeTaken}</p>
                <p className="card-text"><strong>Medicine:</strong> {consult.medicine}</p>
                <p className="card-text"><strong>Doctor Signature:</strong> ____________________</p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <button
                    className="btn btn-secondary mt-3 "
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </div>
        </div>
    );
}
