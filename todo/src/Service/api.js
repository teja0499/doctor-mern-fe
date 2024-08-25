import axios from 'axios';



export const test = async () => {
    const response = await axios.get('http://localhost:5000/', {
      
    });
    // console.log(response.data);
    console.log("working");
    

   
};
export const doctor_login = async (data) => {
    console.log(data);
    
        const response = await axios.post('http://localhost:5000/doctor/login',{},{
            headers: {
                'Content-Type': 'application/json',
                "email":data.email,
                "password":data.password
            },
        });
        return response.data;
};

export const doctor_Ragister = async (data,profile) => {
    console.log(data);
    const formData = new FormData();
    formData.append('file', profile);

    formData.append('data', JSON.stringify(data));
        const response = await axios.post('http://localhost:5000/doctor/sign_up',formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
};

export const getAllDoctor = async () => {
    // console.log(data);
    
        const response = await axios.get('http://localhost:5000/get_all_doctor');
        console.log(response.data);
        
        return response.data;
};

export const patient_Ragister = async (data,profile) => {
  
    const formData = new FormData();
    formData.append('file', profile);

    formData.append('data', JSON.stringify(data));
    
        const response = await axios.post('http://localhost:5000/patient/sign_up',formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
};


export const patient_login = async (data) => {
 ;
    
    console.log(data);
    
        const response = await axios.post('http://localhost:5000/patient/login',{},{
            headers: {
                'Content-Type': 'application/json',
                "email":data.email,
                "password":data.password
            },
        });
        console.log(response.data);

        
        return response.data;
};

export const saveConsultation = async (data) => {
    console.log(data);
    
        const response = await axios.post('http://localhost:5000/save-consultation',data);
        return response.data;
};


export const getConsulatationHistory = async (did) => {
    // console.log(data);
    
        const response = await axios.get(`http://localhost:5000/doctor/consultation_history/${did}`);
        console.log(response.data);
        
        return response.data;
};

export const getConsulatationReq = async (did) => {
    // console.log(data);
    
        const response = await axios.get(`http://localhost:5000/doctor/consultation_req/${did}`);
        console.log(response.data);
        
        return response.data;
};

export const completeConsulatationReq = async (data) => {
   
        console.log(data);
            const response = await axios.put('http://localhost:5000/update-consultation',data);
            return response.data;
    };

    export const userConsulationHistory = async (id) => {
        console.log(id);
        
            const response = await axios.get(`http://localhost:5000/get-consultation/${id}`);
            return response.data;
    };

    export const admin_login = async (data) => {
        console.log(data);
        
            const response = await axios.post('http://localhost:5000/admin/login',{},{
                headers: {
                    'Content-Type': 'application/json',
                    "email":data.email,
                    "password":data.password
                },
            });
            console.log(response.data);
            
            return response.data;
    };

    export const admin_Ragister = async (data) => {
        console.log(data);
        
            const response = await axios.post('http://localhost:5000/admin/sign_up',data);
            return response.data;
    };

    export const get_new_doctor = async () => {
      
            const response = await axios.get('http://localhost:5000/admin/get_new_doctor');
            return response.data;
    };

    export const approved_doctor = async (data) => {
      
        const response = await axios.put(`http://localhost:5000/admin/approved_doctor`,data);
        return response.data;
};

export const getAllUser = async () => {
    // console.log(data);
    console.log("all users");
    
    
        const response = await axios.get('http://localhost:5000/admin/get_users');
        console.log(response.data);
        
        return response.data;
};

export const getAllprescription = async () => {
    // console.log(data);
    console.log("all users");
    
    
        const response = await axios.get('http://localhost:5000/admin/get_all_prescription');
        console.log(response.data);
        
        return response.data;
};

export const checkTransactionId = async (id) => {
    // console.log(data);
    console.log("Trans Id");
    
    
        const response = await axios.get(`http://localhost:5000/payment_check/${id}`);
        console.log(response.data);
        
        return response.data;
};






















// export const test = async () => {
//     const response = await axios.get('http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/', {
      
//     });
//     // console.log(response.data);
//     console.log("working");
    

   
// };
// export const doctor_login = async (data) => {
//     console.log(data);
    
//         const response = await axios.post('http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/doctor/login',{},{
//             headers: {
//                 'Content-Type': 'application/json',
//                 "email":data.email,
//                 "password":data.password
//             },
//         });
//         return response.data;
// };

// export const doctor_Ragister = async (data,profile) => {
//     console.log(data);
//     const formData = new FormData();
//     formData.append('file', profile);

//     formData.append('data', JSON.stringify(data));
//         const response = await axios.post('http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/doctor/sign_up',formData,{
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         return response.data;
// };

// export const getAllDoctor = async () => {
//     // console.log(data);
    
//         const response = await axios.get('http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/get_all_doctor');
//         console.log(response.data);
        
//         return response.data;
// };

// export const patient_Ragister = async (data,profile) => {
  
//     const formData = new FormData();
//     formData.append('file', profile);

//     formData.append('data', JSON.stringify(data));
    
//         const response = await axios.post('http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/patient/sign_up',formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         return response.data;
// };

// export const patient_login = async (data) => {
//  ;
    
//     console.log(data);
    
//         const response = await axios.post('http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/patient/login',{},{
//             headers: {
//                 'Content-Type': 'application/json',
//                 "email":data.email,
//                 "password":data.password
//             },
//         });
//         console.log(response.data);

        
//         return response.data;
// };

// export const saveConsultation = async (data) => {
//     console.log(data);
    
//         const response = await axios.post('http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/save-consultation',data);
//         return response.data;
// };


// export const getConsulatationHistory = async (did) => {
//     // console.log(data);
    
//         const response = await axios.get(`http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/doctor/consultation_history/${did}`);
//         console.log(response.data);
        
//         return response.data;
// };

// export const getConsulatationReq = async (did) => {
//     // console.log(data);
    
//         const response = await axios.get(`http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/doctor/consultation_req/${did}`);
//         console.log(response.data);
        
//         return response.data;
// };

// export const completeConsulatationReq = async (data) => {
   
//         console.log(data);
//             const response = await axios.put('http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/update-consultation',data);
//             return response.data;
//     };

//     export const userConsulationHistory = async (id) => {
//         console.log(id);
        
//             const response = await axios.get(`http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/get-consultation/${id}`);
//             return response.data;
//     };

//     export const admin_login = async (data) => {
//         console.log(data);
        
//             const response = await axios.post('http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/admin/login',{},{
//                 headers: {
//                     'Content-Type': 'application/json',
//                     "email":data.email,
//                     "password":data.password
//                 },
//             });
//             return response.data;
//     };

//     export const admin_Ragister = async (data) => {
//         console.log(data);
        
//             const response = await axios.post('http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/admin/sign_up',data);
//             return response.data;
//     };

//     export const get_new_doctor = async () => {
      
//             const response = await axios.get('http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/admin/get_new_doctor');
//             return response.data;
//     };

//     export const approved_doctor = async (data) => {
      
//         const response = await axios.put(`http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/admin/approved_doctor`,data);
//         return response.data;
// };

// export const getAllUser = async () => {
//     // console.log(data);
//     console.log("all users");
    
    
//         const response = await axios.get('http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/admin/get_users');
//         console.log(response.data);
        
//         return response.data;
// };

// export const getAllprescription = async () => {
//     // console.log(data);
//     console.log("all users");
    
    
//         const response = await axios.get('http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/admin/get_all_prescription');
//         console.log(response.data);
        
//         return response.data;
// };


// export const checkTransactionId = async (id) => {
//     // console.log(data);
//     console.log("Trans Id");
    
    
//         const response = await axios.get(`http://ec2-16-171-18-54.eu-north-1.compute.amazonaws.com:8080/payment_check/${id}`);
//         console.log(response.data);
        
//         return response.data;
// };





