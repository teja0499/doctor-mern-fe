import React from 'react'
import { Link } from 'react-router-dom'

export default function ConsultReqCard(props) {
    const {patientName,date,diabetics,currentIllness}=props.consult
    const {giveConsult,editConsult}=props;
    console.log(props.consult);
    
  return (
    <div>
        <div className="card" style={{ width: "18rem" }}>
  <img src="..." className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Name : {patientName}</h5>
    <h6 className="card-title">Date : {date}</h6>
    <h6 className="card-title">Diabetics : {diabetics==='Diabetics'?'Yes' : 'NO'}</h6>
    <p className="card-text">
    Illness : {currentIllness}
    </p>
  </div>
  <div className="card-body">
   {props.page==="first" && <button  className="btn btn-success" onClick={()=>{giveConsult(props.consult)}}>
    Prescription 
    </button>}

    {props.page==="history" && <button  className="btn btn-success" onClick={()=>{editConsult(props.consult)}}>
    Edit Prescription 
    </button>}
    
  </div>
</div>

    </div>
  )
}
