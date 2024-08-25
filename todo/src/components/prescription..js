import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { completeConsulatationReq } from '../Service/api';
import Loader from '../loader/loader';

export default function Prescription(props) {
    const location = useLocation();
    const { data } = location.state || {}; 
    const [care, setCare] = useState('');
    const [medicine, setMedicine] = useState(''); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const prescriptionData = {
            ...data,
            doctorName: localStorage.getItem("name"),
            careToBeTaken: care,
            medicine: medicine,
            // date: formattedDate,
            address:localStorage.getItem("address"),
        };

        try {
            const response = await completeConsulatationReq(prescriptionData);
            console.log(prescriptionData);
            
            if (response) {
                const shouldDownload = window.confirm("Do you want to download the prescription as a PDF?");

                if (shouldDownload) {
                    const doc = new jsPDF();
                    doc.setFontSize(12);
                    doc.text(`Doctor Name: ${localStorage.getItem("name")}`, 10, 10);
                    doc.text(`Date: ${formattedDate}`, 160, 10);
                    doc.text(`Address: ${localStorage.getItem("address")}`,10,20);
                    doc.text(`Patient Name: ${data.patientName}`, 10, 30);
            
                    doc.setFillColor(1, 0,100); 
                    doc.rect(0, 40, 250, 3, 'F');
            
                    doc.text(`Care to be taken:`, 10, 50);
                    doc.rect(10, 52, 190, 30);
                    doc.text(care || "NA", 12, 57);
            
                    doc.text(`Medicine:`, 10, 93);
                    doc.rect(10, 95, 190, 50);
                    doc.text(medicine|| "NA", 12, 100);
            
                    doc.setFillColor(1, 0,100); 
                    doc.rect(0, 150, 250, 3, 'F');
            
                    doc.text(localStorage.getItem("name"), 150, 180);
            
                    doc.save(`Consultation_${data.patientName}_${formattedDate ||""}.pdf`);
                }
                setLoading(false)
                props.showAlert('Prescription sent to patient successfully!', "success");
                navigate("/consultation_req");
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
            props.showAlert('Internal server Issue', "Error");
          
        }
    };

    return (
        <div className="container border mt-4 p-4">
           {!loading &&  <form onSubmit={handleSubmit}>
                <div className="row flex">
                    <div className="col-md-6">
                        <p className="font-weight-bold mb-0">Dr {localStorage.getItem("name")}</p>
                        <p><strong>Address:</strong> {localStorage.getItem("address")}</p>
                        <p className="font-weight-bold mb-0">Patient Name: {data.patientName}</p>
                    </div>
                    <div className="col-md-6 text-right">
                        <p><strong>Date:</strong> {formattedDate}</p>
                    </div>
                </div>
                <hr className="border-top border-primary" />
                <div className="mt-3">
                    <p><strong>Care to be taken</strong></p>
                    <textarea 
                        className="form-control mb-3" 
                        rows="5" 
                        value={care} 
                        onChange={(e) => setCare(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <p><strong>Medicine</strong></p>
                    <textarea 
                        className="form-control mb-3" 
                        rows="5" 
                        value={medicine} 
                        onChange={(e) => setMedicine(e.target.value)} 
                    />
                </div>
                <hr className="border-top border-primary mt-4" />
                <div className="row">
                    <div className="col-md-12 text-right">
                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                        <p className="mt-4">Dr {localStorage.getItem("name")}</p>
                    </div>
                </div>
            </form>}
            {loading && <Loader/>}
        </div>
    );
}
