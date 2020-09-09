import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import Axios from 'axios';
import './style.css';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Dashboard from './pages/Dashboard';
import Datos from './pages/Datos';
import Login from './pages/Login';
import Geneolica from './pages/Geneolica';
import Gensolar from './pages/Gensolar';
import Operativo from './pages/Operativo';
import MenuVertical from './MenuVertical';
// import ''
class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<div className="">
							<Header />
						</div>
						<div className="ui grid">
							<div className="four wide column">
								<MenuVertical />
							</div>
							<div className="twelve wide stretched column">
								<Route path="/" exact component={Dashboard} />

								<Route path="/operativo" exact>
									<Operativo />
								</Route>

								<Route path="/datos" exact>
									<Datos />
								</Route>

								<Route path="/login" exact>
									<Login />
								</Route>

								<Route path="/geneolica" exact>
									<Geneolica />
								</Route>

								<Route path="/gensolar" exact>
									<Gensolar />
								</Route>
							</div>
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
