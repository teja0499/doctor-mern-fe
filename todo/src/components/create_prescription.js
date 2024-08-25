import React, { useState } from 'react';


const CreatePrescription = (props) => {
    const { consultationId}=props
    const [prescription, setPrescription] = useState({
        careToBeTaken: '',
        medicines: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrescription(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hii");
        
        try {
            await axios.post('/api/prescriptions', {
                consultationId,
                ...prescription
            });
            props.showAlert('Prescription created successfully!',"success")
            setPrescription({ careToBeTaken: '', medicines: '' }); 
        } catch (error) {
            console.error('Error creating prescription', error);
            alert('Error creating prescription');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create Prescription</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="careToBeTaken">Care to be Taken:</label>
                    <input
                        type="text"
                        id="careToBeTaken"
                        name="careToBeTaken"
                        className="form-control"
                        value={prescription.careToBeTaken}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="medicines">Medicines:</label>
                    <textarea
                        id="medicines"
                        name="medicines"
                        className="form-control"
                        rows="3"
                        value={prescription.medicines}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-3">Submit Prescription</button>
            </form>
        </div>
    );
};

export default CreatePrescription;
