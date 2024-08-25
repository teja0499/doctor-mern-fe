import React, { useState } from 'react';
import { useLocation,useNavigate  } from 'react-router-dom';
import { saveConsultation } from '../Service/api';
import Payment from './payment';

const initialStep1 = { currentIllness: '', recentSurgery: '' };
const initialStep2 = { diabetics: '', allergies: '', others: '' };

const ConsultationForm = (props) => {
    const [currentStep, setCurrentStep] = useState(1);
    const[payment,setPaymet]=useState(false)
    const [formData, setFormData] = useState({
        step1: initialStep1,
        step2: initialStep2
    });
    const navigate = useNavigate();
    const location = useLocation();
    const { doctor } = location.state || {};
    const [loading,setLoading]=useState(false);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });

   

    const handleChange = (e) => {
        const { name, value } = e.target;
        const step = currentStep === 1 ? 'step1' : 'step2';
        setFormData(prevData => ({
            ...prevData,
            [step]: {
                ...prevData[step],
                [name]: value
            }
        }));
    };

    const handleSubmitStep1 = (e) => {
        e.preventDefault();
        setCurrentStep(2);
    };

    const handleSubmitStep2 = (e) => {
        e.preventDefault();
        setCurrentStep(3);
    };

    const handleSubmit = async (transactionId) => {
        try {
            setPaymet(false)
            setLoading(true)
           console.log(formData);
           const body={
            ...formData.step1,
            ...formData.step2,
            did:doctor._id,
            pid:localStorage.getItem("pid"),
            patientName:localStorage.getItem("name"),
            doctorName:doctor.name,
            address:doctor.address,
            transactionId:transactionId,
            date:formattedDate
           }
           const data=await saveConsultation(body);

           console.log(data);           
           setPaymet(false);
           props.showAlert("Information submitted Successfully","success")
        } catch (error) {
            console.log(error);
            props.showAlert(error.response.data.message,"danger")  
            setPaymet(false);
        }
        setLoading(false)
    //    navigate(-1);
    };
    const paymentMethod=()=>{
        setPaymet(true);
    }

    return (
        <div className="container mt-4">
          
          {!payment && <div>
            {currentStep === 1 && (
                <form onSubmit={handleSubmitStep1}>
                    <h2>Step 1: Current Illness and Recent Surgery</h2>
                    <div className="form-group">
                        <label htmlFor="currentIllness">Current Illness:</label>
                        <textarea
                            id="currentIllness"
                            name="currentIllness"
                            className="form-control"
                            rows="3"
                            value={formData.step1.currentIllness}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recentSurgery">Recent Surgery (Time span):</label>
                        <input
                            type="text"
                            id="recentSurgery"
                            name="recentSurgery"
                            className="form-control"
                            value={formData.step1.recentSurgery}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mb-3 mt-5 ">Next</button>
                </form>
            )}

            {currentStep === 2 && (
                <form onSubmit={handleSubmitStep2}>
                    <h2>Step 2: Family Medical History</h2>
                    <div className="form-group">
                        <label className="d-block">Diabetics:</label>
                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                id="diabeticsYes"
                                name="diabetics"
                                value="Diabetics"
                                className="form-check-input"
                                checked={formData.step2.diabetics === 'Diabetics'}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="diabeticsYes" className="form-check-label">Diabetics</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                id="diabeticsNo"
                                name="diabetics"
                                value="Non-Diabetics"
                                className="form-check-input"
                                checked={formData.step2.diabetics === 'Non-Diabetics'}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="diabeticsNo" className="form-check-label">Non-Diabetics</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="allergies">Any Allergies:</label>
                        <textarea
                            id="allergies"
                            name="allergies"
                            className="form-control"
                            rows="3"
                            value={formData.step2.allergies}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="others">Others:</label>
                        <textarea
                            id="others"
                            name="others"
                            className="form-control"
                            rows="3"
                            value={formData.step2.others}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="button" className="btn btn-secondary mb-3 mt-5  mx-2" onClick={() => setCurrentStep(1)}>Back</button>
                    <button type="submit" className="btn btn-primary mb-3 mt-5 ">Next</button>
                </form>
            )}

            {currentStep === 3 && (
                <form onSubmit={(e) => e.preventDefault()}>
                    <h2>Step 3: Review and Submit</h2>
                    <div className="form-group">
                        <label htmlFor="reviewCurrentIllness">Current Illness:</label>
                        <input
                            type="text"
                            id="reviewCurrentIllness"
                            className="form-control"
                            value={formData.step1.currentIllness}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reviewRecentSurgery">Recent Surgery (Time span):</label>
                        <input
                            type="text"
                            id="reviewRecentSurgery"
                            className="form-control"
                            value={formData.step1.recentSurgery}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reviewDiabetics">Diabetics:</label>
                        <input
                            type="text"
                            id="reviewDiabetics"
                            className="form-control"
                            value={formData.step2.diabetics}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reviewAllergies">Any Allergies:</label>
                        <input
                            type="text"
                            id="reviewAllergies"
                            className="form-control"
                            value={formData.step2.allergies}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reviewOthers">Others:</label>
                        <input
                            type="text"
                            id="reviewOthers"
                            className="form-control"
                            value={formData.step2.others}
                            readOnly
                        />
                    </div>
                    <button type="button" className="btn btn-secondary mb-3 mt-5  mx-2" onClick={() => setCurrentStep(2)}>Back</button>
                    <button type="button" className="btn btn-primary mb-3 mt-5 " onClick={paymentMethod}>Submit</button>
                </form>
            )}
            </div>}
            {payment && <Payment handleSubmit={handleSubmit} showAlert={props.showAlert} doctor={doctor}/>}
            
        </div>
    );
};

export default ConsultationForm;
