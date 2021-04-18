import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link, useParams} from 'react-router-dom';
import axios from 'axios';
import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

import '../styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Card, Container, Row, Col, Button, Alert, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faChevronLeft, faMinus, faPlus, faCartPlus} from '@fortawesome/free-solid-svg-icons'

import {default as Cart} from 'cart-lib';


function ProductDetail() {
	const cartLib = new Cart("mycart");

	const [product, setProduct] = useState([]);
	const [productLoaded, setProductLoaded] = useState(false);
	const [inputQuantity, setInputQuantity] = useState(1);
	const [validInput, setValidInput] = useState(true);
	const location = useParams();

	useEffect(()=>{

		const getProduct = () => {
			axios({
				method: 'get',
				// url: "http://localhost:4001/products?id=" + location.id,
				url: "https://607be75767e6530017573630.mockapi.io/products?id=" + location.id,
			}).then((response)=>{
				console.log("get product", response);
				setProductLoaded(true);
				setProduct(response.data[0]);
			},(error)=>{
				izitoast.error({
				    title: 'Error',
				    message: 'Could not retrieve product details.'
				});
				console.log("error getting product", error);
			})
		}

		getProduct();

	}, [location.id])

	const validateInput = (val) => {
		if(val < 1 || val > 100){
			setValidInput(false);
		}else{
			setValidInput(true);
		}
	}

	const updateInput = (val) => {
		if(val){
			if(typeof val != 'number'){
				val = val.target.value;
			}
		}else{
			val = 1;
		}

		setInputQuantity(parseInt(val));
		validateInput(val);
	}

	const addToCart = () => {
		let addProduct = product;
		addProduct.quantity = inputQuantity;

		cartLib.addToCart(addProduct).then(function(response){
			izitoast.success({
				title: 'OK',
				message: 'Product added to cart.'
			});

			cartLib.getCart();
		}).catch(function(err){
			console.log("error adding cart", err)
			izitoast.error({
				title: 'Error',
				message: 'Could not add product.'
			});
		});
	}



  return (
	<Container>
		<Row className="mb-2">
			<Col>
				<Button variant="dark"><Link to='/'><FontAwesomeIcon icon={faChevronLeft} /> Back</Link></Button>
			</Col>
		</Row>

		{productLoaded && (<Row>
			<Col className="product">
				<Card bg="dark" text="white">
					<Card.Img src={product.featured_image} />
					<Card.Body>
						<Card.Title>
							<h2>{product.title}</h2>
						</Card.Title>
						<Card.Text>
							<span className="price"><FontAwesomeIcon icon={faTag} /> {product.price}</span>
						</Card.Text>
					</Card.Body>
					<Card.Footer className="text-center">
						Quantity:
						<Form>
							<Form.Row className="text-center">
								<Col xs="4" md={{span:2, offset: 3}}><Button variant="dark" onClick={()=>{updateInput(inputQuantity - 1)}}><FontAwesomeIcon icon={faMinus} /></Button></Col>
								<Col xs="4" md="2"><Form.Control type="number" min="1" max="100" onChange={updateInput} value={inputQuantity}/></Col>
								<Col xs="4" md="2"><Button variant="dark" onClick={()=>{updateInput(inputQuantity + 1)}}><FontAwesomeIcon icon={faPlus} /></Button></Col>
							</Form.Row>

							{!validInput && (
								<Alert variant="danger" className="mb-2 mt-2">Invalid Quantity. Should be a minimum of 1 and maximum of 100</Alert>
							)}

							<Button className="mb-2 mt-2" variant={(validInput ? 'info':'secondary')} disabled={!validInput} block onClick={addToCart}><FontAwesomeIcon icon={faCartPlus} /> Add to Cart</Button>



						</Form>

					</Card.Footer>
				</Card>
			</Col>
		</Row>)}

		{!productLoaded && (
			<Row>
				<Col><Alert variant="dark">Getting product details...</Alert></Col>
			</Row>
		)}
	</Container>
  );
}

export default ProductDetail;
