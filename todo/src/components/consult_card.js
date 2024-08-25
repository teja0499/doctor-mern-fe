import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConsultCard(props) {
    const navigate = useNavigate();
    const { doctorName, date, currentIllness ,view} = props.consult;
    const { generatePDF } = props;
    console.log(props.consult);
    console.log(view);
    
    
    const showDetails = () => {
        navigate('/consultation-details', {
            state: {
                consult: props.consult,
            }
        });
    };
    // const 

    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Dr. {doctorName}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Date: {date}</h6>
                    <p className="card-text mb-0" >
                        Illness: {currentIllness}
                    </p>
                   
                    <p>Status :  <strong>{view ?"Completed":"Pending"}</strong></p>
                    <div className="d-flex justify-content-between">
                        <button 
                            className="btn btn-secondary" 
                            onClick={showDetails}
                        >
                            Show Details
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            onClick={() => generatePDF(props.consult)}
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
