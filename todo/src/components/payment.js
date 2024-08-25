import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import { checkTransactionId } from '../Service/api';
import Loader from '../loader/loader';

export default function Payment(props) {
    const [transactionId, setTransactionId] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const upiString = `upi://pay?pa=${1}&pn=${"tejas"}&am=${600}&cu=INR`;

    const checkTransaction = async (e) => {
        e.preventDefault();
        try {
            if (transactionId.trim().length === 0) {
                props.showAlert("Enter Transaction ID", "danger");
                return;
            }

            const flag = await checkTransactionId(transactionId);
            console.log(flag);
            console.log(!flag.exist);

            if (flag.exists) {
                setLoading(true)
                props.showAlert("Transaction successfully completed", "success");
                setTimeout(() => {
                    props.handleSubmit(transactionId);
                    setLoading(false)
                    navigate("/all_doctor");
                }, 2000)
            } else { props.showAlert("Transaction ID already registered", "danger"); }
        } catch (error) {
            console.log(error);
            props.showAlert("Internal server error", "danger");
        }
    };


    return (
        <div>
            {loading ? <Loader /> : <div className='container mt-4'>
                <div className="row gx-1"> {/* Reduced horizontal gap */}
                    <div className="col-md-6 text-center mb-3" style={{ borderRight: '1px solid lightgrey', padding: '15px' }}>
                        <h4 className='mb-3'>Scan and pay using UPI app</h4>
                        <QRCode value={upiString} size={128} />
                        <p className="fw-bold mb-2">or</p>
                        <p className="fw-bold">UPI ID: oksbi{props.doctor.name}.com</p>
                    </div>
                    <div className="col-md-6" style={{ padding: '15px' }}>
                        <h6 className='mb-2'>Pay using any app</h6> {/* Adjusted margin-bottom */}
                        <h3 className='mb-2'>₹ 600</h3> {/* Adjusted margin-bottom */}
                        <h6 className='mb-2'>(After Payment)</h6> {/* Adjusted margin-bottom */}
                        <h6 className='mb-3' style={{ color: 'grey' }}>Enter Transaction Id*</h6>
                        <input
                            type="text"
                            style={{ backgroundColor: '#f8f8f8', width: '100%' }}
                            className="form-control"
                            id="payment"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='mt-4 pt-3' style={{ borderTop: '1px solid lightgrey' }}>
                    <h5>CONSENT FOR ONLINE CONSULTATION</h5>
                    <p>
                        I HAVE UNDERSTOOD THAT THIS IS AN ONLINE CONSULTATION WITHOUT A PHYSICAL CHECKUP OF MY <br />
                        SYMPTOMS. THE DOCTOR HENCE RELIES ON MY DESCRIPTION OF THE PROBLEM OR SCANNED REPORTS <br />
                        PROVIDED BY ME. WITH THIS UNDERSTANDING, I HEREBY GIVE MY CONSENT FOR ONLINE CONSULTATION.
                    </p>
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
                            <div><label className="form-check-label" htmlFor="exampleCheck1">Yes I Accept</label></div>

                        </div>
                    </div>
                    <div className='text-center'>
                        <button type="button"
                            style={{ backgroundColor: '#00a60a', borderRadius: '20rem', }}
                            className="btn btn-success "
                            onClick={checkTransaction}
                        >
                            Submit Appointment
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    );
}
