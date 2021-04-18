import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';
import Swal from 'sweetalert2'

import '../styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Card, Row, Col, Button, Alert, Media, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTag, faSearch, faTrash, faMinus, faPlus, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import {default as Cart} from 'cart-lib';

function CartDetails({watcherFn}) {
	const cartLib = new Cart("mycart");
	const [cartItems, setCartItems] = useState([]);

	useEffect(()=>{


		getCart();

	}, [])

	const getCart = () => {
		cartLib.getCart().then(function(response){
			console.log("get Cart", response)
			setCartItems(response.rows)
		})
	}

	const updateQuantity = (evt, item) => {
		console.log(evt, item);
		item.quantity = evt.target.value;
		cartLib.updateCart(item).then(function(response){
			izitoast.success({
				title: 'OK',
				message: 'Product updated.'
			});

			watcherFn();
		}).catch(function(err){
			console.log("error updating cart", err)
			izitoast.error({
				title: 'Error',
				message: 'Could not update cart.'
			});
		});
	}

	const deductQuantity = (item) => {
		if(item.quantity > 1){
			item.quantity = parseInt(item.quantity);
			item.quantity -= 1;
			cartLib.updateCart(item).then(function(response){
				izitoast.success({
					title: 'OK',
					message: 'Product updated.'
				});

				watcherFn();
			}).catch(function(err){
				console.log("error updating cart", err)
				izitoast.error({
					title: 'Error',
					message: 'Could not update cart.'
				});
			});
		}

	}

	const addQuantity = (item) => {
		if(item.quantity < 100){
			item.quantity = parseInt(item.quantity);
			item.quantity += 1;
			cartLib.updateCart(item).then(function(response){
				izitoast.success({
					title: 'OK',
					message: 'Product updated.'
				});

				watcherFn();
				getCart();
			}).catch(function(err){
				console.log("error updating cart", err)
				izitoast.error({
					title: 'Error',
					message: 'Could not update cart.'
				});
			});
		}

	}

	const removeItem = (item) => {

		Swal.fire({
			title: `Remove '${item.title}' from your cart?`,
			showCancelButton: true,
			confirmButtonText: `Remove`,
		}).then((result) => {
			if (result.isConfirmed) {
				cartLib.removeProduct(item).then(function(response){
					izitoast.success({
						title: 'OK',
						message: 'Product removed from cart.'
					});
					watcherFn();
					getCart();
				}).catch(function(err){
					console.log("error removing product", err)
					izitoast.error({
						title: 'Error',
						message: 'Could not remove product.'
					});
				});
			}
		});


	}

  return (
    <div className="Products">
		<h3>My Cart</h3>
		{cartItems.length > 0 && (
			<Row className="mb-2">
				<Col>
					<Button variant="dark"><Link to='/'><FontAwesomeIcon icon={faChevronLeft} /> Back</Link></Button>
				</Col>
			</Row>
		)}
		<Row>
			<Col md="12" lg="12" className="cart">
			{cartItems.map((item, id)=>{

				return <Media key={item.id} className="mb-2">
							<img width="64" height="64" className="mr-3" src={item.featured_image} />
							<Media.Body>
								<h5>{item.title}</h5>
								<p>
									<span className="price"><FontAwesomeIcon icon={faTag} /> {item.price}</span>
								</p>
								<p>
									Quantity:
								</p>
								<Form>
									<Form.Row className="text-center">
										<Col xs="4" md={{span:2, offset: 3}}>
											{item.quantity > 1 && (
												<Button variant="dark" onClick={()=>{deductQuantity(item)}}><FontAwesomeIcon icon={faMinus} /></Button>
											)}
										</Col>
										<Col xs="4" md="2"><Form.Control type="number" min="1" max="100" onChange={(e)=>{updateQuantity(e, item)}} value={item.quantity}/></Col>
										<Col xs="4" md="2">
											{item.quantity < 100 && (
												<Button variant="dark" onClick={()=>{addQuantity(item)}}><FontAwesomeIcon icon={faPlus} /></Button>
											)}
										</Col>
									</Form.Row>
								</Form>
								<p className="text-right mt-2">
									<Button variant="danger" size="sm" onClick={()=>{removeItem(item)}}><FontAwesomeIcon icon={faTrash} /> Remove</Button>
								</p>
							</Media.Body>
						</Media>
			})}
			</Col>
		</Row>

		{cartItems.length < 1 && (
			<Row className="mb-2 mt-2">
				<Col className="text-center">
					There are no products in your cart yet.
					<Button variant="info" className="mb-2 mt-2"><Link to="/">Add Products</Link></Button>
				</Col>
			</Row>
		)}
    </div>
  );
}

export default CartDetails;
