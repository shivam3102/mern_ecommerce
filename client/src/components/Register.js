import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import {registerUser } from '../api/apicalls'
const Register = () => {

    const [register, setRegister] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errormessage, setErrorMessage] = useState('')

    const changeHandler =(e)=>{

        register[e.target.name] =e.target.value
        setRegister(register)

    }
    let submitForm= (e)=>{
         e.preventDefault();
         console.log(register)
        registerUser(register).then(
            response=>{
               // console.log(response)
                if(response.data.error==0){
                    setErrorMessage(response.data.message)
                }else{
                    alert(response.data.message);
                    
                    e.target.reset();
                }
               
            }
        ).catch(error =>{
            console.log(error)
        })
    }
    return (
        <React.Fragment>
            <div className="container-fluid backRe py-3">
                <div className="row">
                    <div className="col-md-7 border-right">
                        <div className="middle_center justify-content-center">
                            <img src="assets/images/Onlineshopping-pana.png" className="img-fluid w-75"/>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="login_res text-white">
                            <h1 className="text-center mb-4">Register</h1>
                            <form className="" onSubmit={submitForm}> 
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" name="name" className="form-control" onChange={changeHandler} placeholder="Enter Name"/>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" className="form-control" onChange={changeHandler} placeholder="Enter Email"/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" className="form-control" onChange={changeHandler} placeholder="Enter Password"/>
                                </div>
                               <span className="text-white">{errormessage=='' ? ' ': `${errormessage}`   }</span>

                                <div className="mt-3 text-center">
                                    <button className="btn btn-success px-5 font-weight-bold">Register</button>
                                </div>
                            </form>
                            <div className="text-center mt-4">
                                <small>Already have account <Link to="/login">SignIn</Link></small>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    );
}

export default Register;
