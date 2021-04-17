import axios from 'axios';

import '../styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Navbar, Badge, Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

function Products() {
	axios.get("http://localhost:4001/products").then(function(res){
		console.log(res);
	})
  return (
    <div className="Products">

    </div>
  );
}

export default Products;
