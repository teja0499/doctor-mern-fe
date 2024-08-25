import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { completeConsulatationReq } from '../Service/api';
import Loader from '../loader/loader';


export default function EditConsult(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const { data } = location.state || {};
    console.log(data);

    const [medicine, setMedicine] = useState('');
    const [careToBeTaken, setCareToBeTaken] = useState('');

    useEffect(() => {
        if (data) {
            setMedicine(data.medicine || '');
            setCareToBeTaken(data.careToBeTaken || '');
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const finalData = { ...data, medicine, careToBeTaken }
            const updateData = await completeConsulatationReq(finalData);
            setLoading(false)
            if (updateData) {
                props.showAlert("Update successfully","success")
                navigate(-1);
            }
        } catch (error) {
            console.error("Error updating consultation:", error);
        }
        setLoading(false)
    };

    return (
        <div className="container">
            <h2>Edit Consultation</h2>
            {!loading && <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="careToBeTaken">Care to be Taken</label>
                    <textarea
                        id="careToBeTaken"
                        className="form-control"
                        rows="3"
                        value={careToBeTaken}
                        onChange={(e) => setCareToBeTaken(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="medicine">Medicine</label>
                    <textarea
                        id="medicine"
                        className="form-control"
                        rows="3"
                        value={medicine}
                        onChange={(e) => setMedicine(e.target.value)}
                    />
                </div>
                {/* <div className='text-center'> */}
                    <button type="submit" className="btn btn-primary my-2 ">Update</button>
                {/* </div> */}
            </form>}
            {loading && <Loader />}
        </div>
    );
}
