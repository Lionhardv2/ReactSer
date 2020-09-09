import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

export default class Login extends Component {
	state = {
		email: '',
		password: '',
		redirect: null
	};
	onSubmit = async (event) => {
		event.preventDefault();
		const { email, password } = this.state;
		try {
			const response = await Axios({
				method: 'post',
				url: '/api/users/signin',
				headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
				data: {
					email: email,
					password: password
				}
			});
			this.setState({ email: '', password: '' });

			console.log(response);
			this.setState({ redirect: '/' });
			window.location.reload(true);
		} catch (e) {
			console.log('response: ', e.response.data.errors);
			this.setState({ email: '', password: '' });
		}
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		}

		return (
			<div className="">
				<div className="padd" />
				<div className="ui grid  middle aligned center aligned grid">
					<div className="twelve wide stretched column ">
						<div className="ui middle aligned center aligned grid">
							<div className="column">
								<h2 className="ui teal image header">
									<div className="content">Iniciar Sesión</div>
								</h2>
								<form className="ui large form" onSubmit={this.onSubmit}>
									<div className="ui stacked segment">
										<div className="field">
											<div className="ui left icon input">
												<i className="user icon">{/* ::before */}</i>
												<input
													type="email"
													// name="email"
													placeholder="E-mail address"
													value={this.state.email}
													onChange={(e) => this.setState({ email: e.target.value })}
												/>
											</div>
										</div>
										<div className="field">
											<div className="ui left icon input">
												<i className="lock icon">{/* ::before */}</i>
												<input
													type="password"
													value={this.state.password}
													placeholder="Password"
													onChange={(e) => this.setState({ password: e.target.value })}
												/>
											</div>
										</div>
										<input
											className="ui fluid large teal submit button"
											type="submit"
											value="Ingresar"
										/>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
