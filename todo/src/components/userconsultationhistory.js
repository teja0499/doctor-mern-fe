import React, { useState, useEffect } from 'react';
import { userConsulationHistory } from '../Service/api';
import ConsultCard from './consult_card';
import jsPDF from 'jspdf';
import Loader from '../loader/loader';

export default function UserConsultationHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false); 
    

    const getHistory = async () => {
        try {
            setLoading(true);
            const id = localStorage.getItem("pid");
            const data = await userConsulationHistory(id);
            setHistory(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const generatePDF = (consult) => {
       
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text(`Doctor Name: ${consult.doctorName}`, 10, 10);
        doc.text(`Date: ${consult.date || "NA"}`, 160, 10);
        doc.text(`Address:${consult.address ||"NA"}`,10,20);
        doc.text(`Patient Name: ${consult.patientName}`, 10, 30);

        doc.setFillColor(1, 0,100); 
        doc.rect(0, 40, 250, 3, 'F');

        doc.text(`Care to be taken:`, 10, 50);
        doc.rect(10, 52, 190, 30);
        doc.text(consult.careToBeTaken || "", 12, 57);

        doc.text(`Medicine:`, 10, 93);
        doc.rect(10, 95, 190, 50);
        doc.text(consult.medicine || "", 12, 100);

        doc.setFillColor(1, 0,100); 
        doc.rect(0, 150, 250, 3, 'F');

        doc.text(consult.doctorName, 150, 180);

        doc.save(`Consultation_${consult.patientName}_${consult.date ||""}.pdf`);
    };

    useEffect(() => {
        getHistory();
    }, []);

    return (
        <div className='container mt-4'>
            {loading && <Loader/>  }
       {!loading &&    <div>
         { history.length!==0? <div className='row'>
                {history.map((consult, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <ConsultCard consult={consult} generatePDF={generatePDF} />
                    </div>
                ))}
            </div>
            :
            <h4 style={{textAlign:'center'}}><p>No consultation found</p></h4>
            }
            </div>}
        </div>
    );
}
