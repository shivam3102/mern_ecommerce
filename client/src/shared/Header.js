import React,{useState,useEffect} from 'react';
import Navbar from './Navbar';
import {Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import {logoutUser } from '../api/apicalls'

const Header = (props) => {
    const [tokenCheck, setTokenCheck ] =useState(false)

    const [name, setName] = useState('');

    const changeHandler =(e) =>{
        localStorage.clear();
        setName(e.target.value)
    }
    const checkLoginStatus=()=>{
          if(props.token){
            setTokenCheck(false)
        }else{
            setTokenCheck(true)
        }
    }
    useEffect(() => {
        checkLoginStatus();
    },[])

    const logout=() =>{
        localStorage.set('token','');
        logoutUser()
        .then(response=>{
            setTokenCheck(true)
           
            console.log(response)
        }).catch(error=>{
            console.log(error)
        })
    }
    const submitForm =(e)=>{
        e.preventDefault()
      console.log('name', name)
    //   localStorage.setItem( 'searchValue', name );
        props.history.push({
            pathname: '/searchProducts',
            search: `?name=${name}`
          });
    }

      
    return (
        <React.Fragment>
            <section className="container-fluid bg-primary py-1 navbar-light">
                <div className="navHeader row">
                    <div className="col-md-3">
                        <div className="">
                            <Link to="/"><h1 className="mb-0">LOGO</h1></Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="top_nav mt-2">
                            <form className="w-100 d-flex text-center " onSubmit={submitForm}>
                                <input type="text" className="form-control"  placeholder="Search" name="search" onChange={changeHandler} />
                                <button className="btn btn-success py-2"><i className="fas fa-search"></i> Search</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-right top_nav">
                            <Link to="/cart" className="cartDser m-2 ">
                                <i className="fab fa-opencart"></i> 
                                <span className="cartCount">{0}</span>
                            </Link>

                           {tokenCheck ? 
                                <Link to="/login" className="cartDser ml-2 ">
                                    Login | Register
                                </Link>
                           : 
                            <Link to="/" onClick={logout} className="cartDser ml-4 ">
                               Logout
                            </Link>
                          
                       }
                        </div>
                    </div>
                </div>
            </section>
            <Navbar/>
        </React.Fragment>
    );
}

export default withRouter(Header);
