import React, { useState, useEffect } from 'react';
import { getConsulatationReq } from '../Service/api';
import ConsultReqCard from './consult_req_card';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/loader';

export default function ConsultationReq(props) {
    const [consultationReq, setConsultationReq] = useState([]);
    const [loading,setLoading]=useState(false);
    const navigate = useNavigate();

    const consReq = async () => {
        try {
            setLoading(true)
            const id = localStorage.getItem("did");        
            const data = await getConsulatationReq(id);
            setConsultationReq(data);
        } catch (error) {
            props.showAlert("Server issue", "danger");
        }
        setLoading(false)
    };

    const giveConsult = (data) => {
        console.log(data);
        
        navigate("/prescription", { state: { data } });
    };

    useEffect(() => {
        consReq();
    }, []);

    return (
        <div className="container mt-4">
         { !loading &&  <div>
          {consultationReq.length!==0 ?  <div className="row">
                {consultationReq.map((req) => (
                    <div className="col-md-4 mb-4" key={req.id}>
                        <ConsultReqCard consult={req} giveConsult={giveConsult} page="first" />
                    </div>
                ))}
            </div> :<div style={{textAlign:'center'}}>
                <h4>No new Consultation Request</h4>
                </div> }
                </div>}
                {loading && <Loader/>}
        </div>
    );
}
