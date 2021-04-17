import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

import '../styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Card, Row, Col, Button, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTag, faSearch } from '@fortawesome/free-solid-svg-icons'

function Products() {
	const [products, setProducts] = useState([]);
	const [productsLoaded, setProductsLoaded] = useState(false);

	useEffect(()=>{
		const getProducts = () => {

			axios({
				method: 'get',
				url: "http://localhost:4001/products",
			}).then((response)=>{
				console.log("get products", response);
				setProducts(response.data);
				setProductsLoaded(true);
			},(error)=>{
				izitoast.error({
				    title: 'Error',
				    message: 'Could not retrieve products.'
				});
				console.log("error getting products", error);
			})
		}

		getProducts();

	}, [])

	const isProductLoaded = () => {
		return false;
	}

  return (
    <div className="Products">
		<h3>Products</h3>
		{productsLoaded && (
			<Row>
				{products.map((product, id)=>{
					return <Col md="12" lg="4" className="mb-2" key={product.id}>
							<Card bg="dark" text="white" className="product">
								<Card.Img variant="top" src={product.featured_image} />
								<Card.Body>
									<Card.Text>
										<strong>{product.title}</strong><br />
										<span className="price"><FontAwesomeIcon icon={faTag} /> {product.price}</span>
									</Card.Text>
								</Card.Body>
								<Card.Footer className="text-center">
									<Button variant="info"><FontAwesomeIcon icon={faSearch} /> View More</Button>
								</Card.Footer>
							</Card>
						</Col>
				})}
			</Row>
		)}

		{!productsLoaded && (<Row>
			<Col><Alert variant="dark">Getting products...</Alert></Col>
		</Row>)}


    </div>
  );
}

export default Products;
