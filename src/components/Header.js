import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import Logo from '../imagenes/LogoGIZ.png';
import Logo2 from '../imagenes/LogoCMSN.png';
import Logo3 from '../imagenes/LogoU.jpg';
import './style.css';

class Header extends Component {
	state = {
		redirect: null
	};

	renderContent() {
		switch (this.props.auth) {
			case null:
				return '';
			case false:
				return (
					<Link to="/login" className=" ui header yellow ">
						Iniciar Sesion
					</Link>
				);
			default:
				return (
					<Link to="/" className=" ui header yellow " onClick={this.user}>
						Cerrar Sesion
					</Link>
				);
		}
	}

	user = async () => {
		try {
			const response = await Axios({
				method: 'post',

				url: '/api/users/signout',
				headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
			});

			console.log(response);
			window.location.reload(true);
			this.setState({ redirect: '/' });
		} catch (e) {
			console.log('response: ', e.response.data.errors);
		}
	};
	render() {
		const Login = this.state.Login;
		console.log(this.props);
		console.log('state', this.state);

		return (
			<div className="ui stack menu HEAD  ">
				<div className=" ui four column grid ancho ">
					<div className="column  middle aligned center aligned grid">
						<div className="ui ">
							<Link to="/" className="ui image small">
								<img src={Logo3} alt="logoU" />
							</Link>
						</div>
					</div>

					<div className="column  middle aligned center aligned grid">
						<div className="ui ">
							<Link to="/" className="ui image medium ">
								<img src={Logo2} alt="logo" />
							</Link>
						</div>
					</div>

					<div className="column  middle aligned center aligned">
						<Link to="/" className="ui huge header black">
							<h1 className="ui ">Centro de Pronóstico de Energias Renovables Variables</h1>
						</Link>
					</div>

					<div className="column  middle aligned center aligned grid ">
						<div className=" ui">
							<Link to="/" className=" ui image medium">
								<img src={Logo} alt="logo2" />
							</Link>
						</div>
					</div>
				</div>
				<div className=" yellow right item">{this.renderContent()}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
