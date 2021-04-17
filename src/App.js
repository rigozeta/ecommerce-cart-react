import logo from './logo.svg';
import './styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Navbar, Badge, Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div className="App">
		<header>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand>eStore</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						<FontAwesomeIcon icon={faShoppingCart} /> <Badge variant="danger">9</Badge>
					</Navbar.Text>
				</Navbar.Collapse>
			</Navbar>
		</header>

		<div className="mb-2 mt-2">
			<Container>
				<Row>
					<Col>
						Product list here
					</Col>
				</Row>
			</Container>

		</div>

		<footer>
			<p className="text-center">&copy; 2021 jrcgonzalez.com</p>
		</footer>

    </div>
  );
}

export default App;
