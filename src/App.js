import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Navbar, Badge, Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import {default as Cart} from 'cart-lib';

import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import CartDetails from './components/CartDetails';

function App() {
	const cartLib = new Cart("mycart");
	const [cartQuantity, setCartQuantity] = useState(0);

	useEffect(()=>{
		const getCart = () => {
			cartLib.getCart().then(function(response){
				console.log("Cart", response)
				setCartQuantity(response.total_quantity)
			})
		}

		getCart();

	}, [])

	const subcribeCartUpdates = () => {
		cartLib.getCart().then(function(response){
			setCartQuantity(response.total_quantity)
		})
	}

	return (
		<Router>
		<div className="App">
			<header>
				<Navbar bg="dark" variant="dark" fixed="top">
					<Navbar.Brand><Link to="/">eStore</Link></Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text>
							<Link to='/cart'><FontAwesomeIcon icon={faShoppingCart} /> <Badge variant="danger">{cartQuantity}</Badge></Link>
						</Navbar.Text>
					</Navbar.Collapse>
				</Navbar>
			</header>

			<div className="mb-2 mt-2 pt-4">
				<Container>
					<Row>
						<Col>

							<Route path="/" exact render={()=>(
								<Products />
							)} />

							<Route path='/product/:id' render={(props)=>(
								<ProductDetail watcherFn={subcribeCartUpdates}/>
							)} />

							<Route path='/cart' render={(props)=>(
								<CartDetails watcherFn={subcribeCartUpdates}/>
							)} />


						</Col>
					</Row>
				</Container>

			</div>

			<footer>
				<Container>
					<Row>
						<Col className="text-center mt-2">
							<p >Prototype by: <a href="https://jrcgonzalez.com">jrcgonzalez</a></p>
							<p><a href="https://github.com/rigozeta/ecommerce-cart-react" target="_blank">GitHub Repository</a></p>
						</Col>
					</Row>
				</Container>
			</footer>

		</div>
		</Router>
	);
}

export default App;
