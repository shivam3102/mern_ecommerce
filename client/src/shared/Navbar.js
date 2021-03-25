import React from 'react';
import {useEffect, useState } from 'react'
import { getCategories } from '../api/apicalls'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [categories, setCategories] = useState([]);

    const preLoad = () => {
        getCategories().then(response => {
         console.log(response)
            setCategories(response)
        })
    }

    useEffect(() => {
        
       preLoad()
    },[]);
   
    return (
       
            <div className="">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="main_nav">    
                        <ul className="navbar-nav navSpace m-auto">
                            { categories.map((category)=>{
                               return (
                                <li key={category._id} className="nav-item"><Link className="nav-link" to="#"> {category.name} </Link></li>
                               );
                            })
                        }
                            
                            {/* <li className="nav-item"><a className="nav-link" href="#"> Services </a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link  dropdown-toggle" href="#" data-toggle="dropdown">  More items  </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#"> Submenu item 1</a></li>
                                    <li><a className="dropdown-item" href="#"> Submenu item 2 </a></li>
                                </ul>
                            </li> */}
                        </ul>
                    </div>
                </nav>
            </div>  
        
    );
}

export default Navbar;
