import './App.css';
import React,{useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Alert from './components/alert';
import Login from './components/doctor_login';
import DoctorRegisterform from './components/doctor_register';
import PatientRagisterForm from './components/patient_ragister';
import DoctorLogin from './components/doctor_login';
import PatientLogin from './components/patient_login';
import Navbar from './components/navbar';
import AllDoctor from './components/alldoctor';
import DoctorCard from './components/doctorcard';
import Prescription from './components/prescription.';
import ConsultationForm from './components/consultation_form';
import ConsultationHisory from './components/consultation_hisory';
import ConsultationReq from './components/consultation_req';
import EditConsult from './components/editconsult';
import UserConsultationHistory from './components/userconsultationhistory';
import ConsultationDetailsPage from './components/consultationdetailspage';
import AdminRegisterForm from './components/admin_register_form';
import AdminLoginForm from './components/admin_login';
import NewDoctor from './components/newdoctor';
import AllPatients from './components/allpatients';
import GetAllprescription from './components/all_prescription';
import Payment from './components/payment';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    console.log("hi");
    
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <Router>
      
      {/* <div className="App container my-3 " style={{border:'black solid 1px',width:'rem'}}> */}
        <Navbar/>
        <Alert alert={alert} />
        <Routes>
         
          <Route path="/" element={<PatientLogin showAlert={showAlert}  />} />
          <Route path="/doctor_login" element={<DoctorLogin showAlert={showAlert}  />} />
          <Route path="/doctor_register_form" element={<DoctorRegisterform showAlert={showAlert}  />} />
          <Route path="/user_ragister_form" element={<PatientRagisterForm showAlert={showAlert}  />} />
          <Route path="/all_doctor" element={<AllDoctor showAlert={showAlert}  />} />
          <Route path="/doctor_card" element={<DoctorCard showAlert={showAlert}  />} />
          <Route path="/prescription" element={<Prescription showAlert={showAlert} />} />
          <Route path="/consultation_form" element={<ConsultationForm showAlert={showAlert} />} />
          <Route path="/consultation_history" element={<ConsultationHisory showAlert={showAlert} />} />
          <Route path="/consultation_req" element={<ConsultationReq showAlert={showAlert} />} />
          <Route path="/edit_consult" element={<EditConsult showAlert={showAlert} />} />
          <Route path="/user_consultation_history" element={<UserConsultationHistory showAlert={showAlert} />} />
          <Route path="/consultation-details" element={<ConsultationDetailsPage showAlert={showAlert} />} />
          <Route path="/admin_register_form" element={<AdminRegisterForm showAlert={showAlert} />} />
          <Route path="/admin_login" element={<AdminLoginForm showAlert={showAlert} />} />
          <Route path="/new_doctor" element={<NewDoctor showAlert={showAlert} />} />
          <Route path="/all_patients" element={<AllPatients showAlert={showAlert} />} />
          <Route path="/all_prescription" element={<GetAllprescription showAlert={showAlert} />} />
          <Route path="/payment" element={<Payment showAlert={showAlert} />} />

        </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
