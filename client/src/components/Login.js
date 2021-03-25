import React,{useState} from 'react';
import { Link,Redirect } from 'react-router-dom';
import { loginUser } from '../api/apicalls'
import { withRouter } from 'react-router-dom';

const Login = (props) => {
    const [login, setRegister] = useState({
      
        email: '',
        password: ''
    });
    const [errormessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState({
        token: '',
        login: false
    })

    // console.log(localStorage.getItem('token'));

    const changeHandler =(e)=>{

        login[e.target.name] =e.target.value
        setRegister(login)

    }
    
    let submitForm= (e)=>{
         e.preventDefault();
         console.log(login)
         loginUser(login).then(
            response=>{
                //console.log(response.data.token)
                if(response.data.error==1){
                    setErrorMessage(response.data.message)
                }else{
                    console.log(response);
                    alert("Login Succesfully");
               
                    localStorage.setItem('token',response.data.token)
                    localStorage.setItem('user',response.data.user.id)
                    setUserData['token'] = localStorage.getItem('token')
                    setUserData['login'] = true;
                      
                   //<Redirect to={{ pathname: '/', state: setUserData['token'] }}/>
                }
               
            }
        ).catch(error =>{
            console.log(error)
        })
    }

    const redirectToHome =() =>{
        let token = localStorage.getItem('token');
        if(token){
            return    <Redirect to='/' />
        }
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
                        <div className="login_res text-white ">
                            <h1 className="text-center mb-4">Login</h1>
                            <form className="" onSubmit = {submitForm}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" onChange={changeHandler} className="form-control" placeholder="Enter Email"/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" onChange={changeHandler} className="form-control" placeholder="Enter Password"/>
                                </div>
                                <span className="text-white">{errormessage=='' ? ' ': `${errormessage}`}</span>
                                <div className="text-right"><a href="">Forgot Password?</a></div>

                                <div className="mt-3 text-center">
                                    <button className="btn btn-success">Login</button>
                                </div>
                            </form>

                            <div className="text-center">
                                <small>Doesn't have account? <Link to="/register">SignUp</Link></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {}
        </React.Fragment>
    );
}

export default withRouter(Login);
