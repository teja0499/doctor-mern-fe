import React, { useState, useEffect } from 'react';
import { getConsulatationHistory } from '../Service/api';
import ConsultReqCard from './consult_req_card';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/loader';

export default function ConsultationHistory(props) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchConsultationHistory = async () => {
        try {
            setLoading(true);
            const id = localStorage.getItem('did');
            const data = await getConsulatationHistory(id);
            setHistory(data ?? []);
        } catch (error) {
            props.showAlert("Internal server issue", "danger");
        } finally {
            setLoading(false);
        }
    };

    const editConsult = (data) => {
        console.log(data);
        
        navigate("/edit_consult", { state: { data } });
    };

    useEffect(() => {
        fetchConsultationHistory();
    }, []);

    if (loading) {
        // return <div className="container mt-4"><p>Loading...</p></div>;
    }

    return (
        <div className="container mt-4">
            {!loading &&<div className="row">
                {history.length > 0 ? (
                    history.map((req) => (
                        <div className="col-md-4 mb-4" key={req._id}>
                            <ConsultReqCard consult={req} page="history" editConsult={editConsult} />
                        </div>
                    ))
                ) : (
                    <div style={{textAlign:'center'}}>
                        <h4>No consultation history available.</h4>
                    </div>
                )}
            </div>}
            {loading && <Loader/>}
        </div>
    );
}
