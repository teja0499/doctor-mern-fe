import React from 'react'
import { Link } from 'react-router-dom'

export default function DoctorCard(props) {
    const { name, did, specialty, profilePicture } = props.doctor;
    const { handleConsult, showInfo } = props
    const onClick = () => {
        console.log(did, name, specialty);

    }
    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
                <img src={profilePicture} className="card-img-top" alt="..." style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                    <h5 className="card-title">Dr. {name}</h5>
                    <h6 className="card-title">specialty : {specialty}</h6>
                    {localStorage.getItem('userType') !== "admin" && <button className="btn btn-primary mx-3" onClick={() => handleConsult(props.doctor)}>
                        Consult
                    </button>}
                    <button className="btn btn-info mx-3" onClick={() => showInfo(props.doctor)}>
                        Doctor Info
                    </button>
                </div>
            </div>

        </div>
    )
}
