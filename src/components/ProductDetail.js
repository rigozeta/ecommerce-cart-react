import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link, useParams} from 'react-router-dom';
import axios from 'axios';
import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

import '../styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Card, Container, Row, Col, Button, Alert, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faChevronLeft, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'


function ProductDetail() {


	const [product, setProduct] = useState([]);
	const [productLoaded, setProductLoaded] = useState(false);
	const location = useParams();

	useEffect(()=>{

		const getProduct = () => {
			axios({
				method: 'get',
				url: "http://localhost:4001/products?id=" + location.id,
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
						<Form>
							<Form.Row className="text-center">
								<Col xs="4" md={{span:2, offset: 3}}><Button variant="danger"><FontAwesomeIcon icon={faMinus} /></Button></Col>
								<Col xs="4" md="2"><Form.Control type="number" /></Col>
								<Col xs="4" md="2"><Button variant="success"><FontAwesomeIcon icon={faPlus} /></Button></Col>
							</Form.Row>
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
