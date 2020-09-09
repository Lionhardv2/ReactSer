import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

let clase1 = 'item';
export default class MenuVertical extends Component {
	state = {
		Login: false,
		clase1C: 'item ui header yellow  active ',
		clase2C: 'item',
		clase3C: 'item',
		clase4C: 'item',
		clase5C: 'item',
		clase6C: 'item'
	};

	class1 = () => {
		this.setState({
			clase1C: ' item active yellow',
			clase2C: 'item',
			clase3C: 'item',
			clase4C: 'item',
			clase5C: 'item',
			clase6C: 'item'
		});
		console.log(this.state.clase1C);
	};

	class2 = () => {
		this.setState({
			clase1C: 'item ',
			clase2C: 'item active yellow',
			clase3C: 'item',
			clase4C: 'item',
			clase5C: 'item',
			clase6C: 'item'
		});
	};

	class3 = () => {
		this.setState({
			clase1C: 'item ',
			clase2C: 'item ',
			clase3C: ' item active yellow',
			clase4C: 'item',
			clase5C: 'item',
			clase6C: 'item'
		});
	};

	class4 = () => {
		this.setState({
			clase1C: 'item ',
			clase2C: 'item ',
			clase3C: 'item',
			clase4C: 'item active yellow',
			clase5C: 'item',
			clase6C: 'item'
		});
	};

	class5 = () => {
		this.setState({
			clase1C: 'item ',
			clase2C: 'item ',
			clase3C: 'item ',
			clase4C: 'item ',
			clase5C: ' item active yellow',
			clase6C: 'item'
		});
	};

	class6 = () => {
		this.setState({
			clase1C: 'item ',
			clase2C: 'item ',
			clase3C: 'item ',
			clase4C: 'item ',
			clase5C: ' item ',
			clase6C: 'item active yellow'
		});
	};
	async componentDidMount() {
		try {
			const response = await Axios.get('/api/users/currentuser');
			console.log(response.data.currentUser);
			this.setState({ Login: response.data.currentUser });
		} catch (e) {
			console.log('response', e);
		}
	}

	render() {
		const Login = this.state.Login;

		return (
			<div className="">
				<div className="ui vertical fluid tabular  menu altura">
					<div className="menu ">
						<div className="">
							<Link to="/" className={this.state.clase1C} onClick={this.class1}>
								Pronóstico Operativo Eolico
							</Link>
						</div>
						<Link to="/operativo" className={this.state.clase2C} onClick={this.class2}>
							Pronóstico Operativo Solar
						</Link>
						{Login ? (
							<div>
								<Link to="/gensolar" className={this.state.clase3C} onClick={this.class3}>
									Generación Solar
								</Link>

								<Link to="/geneolica" className={this.state.clase4C} onClick={this.class4}>
									Generación Eolica
								</Link>

								<Link to="/datos" className={this.state.clase5C} onClick={this.class5}>
									Descargas
								</Link>
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}
