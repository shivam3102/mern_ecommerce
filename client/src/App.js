import React,{useEffect,useState} from 'react';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomeProducts from './components/HomeProducts';
import Header from './shared/Header';
import Footer from './shared/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import SearchProducts from './components/SearchProducts';

function App(props) {
//arr.push({ooo})
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [token, settoken] = useState(localStorage.getItem('token'));
  return (

   <Router>
      <Header token={token}/>
        <Switch>
          <Route path="/" exact component={ HomeProducts }/>
          <Route path="/login" exact component={ token!=null ? HomeProducts : Login }/>
          <Route path="/register" exact component={ Register }/>
          <Route path="/product/:id" exact component={ ProductDetails }/>
          <Route path="/searchProducts" exact component={ SearchProducts }/>
          <Route path="/cart" exact component={ Cart }/>
        </Switch>
      <Footer/>
   </Router>
  );
}

export default App;
