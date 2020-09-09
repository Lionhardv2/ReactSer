import React, { Component } from 'react';
import axios from 'axios';
import Helpers from '../../../src/helpers';

export default class Datos extends Component {
	componentDidMount() {
		// window.location.reload(true);
	}

	state = {
		loading: false,
		errors: null,
		file: ''
	};

	handleChange = (event) => {
		this.setState({
			// Numero de caracteres
			file: event.currentTarget.value.substring(0, 4)
		});
	};

	handleSubmit = (event) => {
		this.setState(
			{
				errors: null,
				loading: true
			},
			() => {
				Helpers.httpRequest(`http://159.203.72.155/api?file=${this.state.file}`, 'get')
					// 1. Convert the data into 'blob'
					.then((response) => response.blob())
					.then((blob) => {
						// 2. Create blob link to download
						const url = window.URL.createObjectURL(new Blob([ blob ]));
						const link = document.createElement('a');
						link.href = url;
						link.setAttribute('download', `sample.${this.state.file}`);
						// 3. Append to html page
						document.body.appendChild(link);
						// 4. Force download
						link.click();
						// 5. Clean up and remove the link
						link.parentNode.removeChild(link);
						this.setState({
							loading: false
						});
					})
					.catch((error) => {
						error.json().then((json) => {
							this.setState({
								errors: json,
								loading: false
							});
						});
					});
			}
		);

		event.preventDefault();
	};

	render() {
		const { file, loading, errors } = this.state;
		return (
			<div className="animate__animated animate__fadeInDownBig">
				<div className="padd" />
				<div className="ui grid  middle aligned center aligned grid">
					<div className="twelve wide stretched column ">
						<div className="ui middle aligned center aligned grid">
							<div className="column">
								{errors ? (
									<div className="form-group">
										<div className="alert alert-danger">
											<strong>Error!</strong> {errors.message || 'Something went wrong.'}
										</div>
									</div>
								) : null}

								<form className="ui large form" onSubmit={this.handleSubmit}>
									<div className="ui stacked segment">
										<div className="field">
											<div className="ui left icon input">
												<i className="cloud download icon">{/* ::before */}</i>
												<input
													disabled={loading}
													onChange={this.handleChange}
													value={file}
													type="text"
													name="file"
													placeholder="File type, ex csv"
													autoComplete="off"
												/>
											</div>
										</div>

										<button disabled={loading} className="ui fluid large teal submit button">
											{loading ? (
												'Downloading...'
											) : (
												<div>
													<i className="cloud download icon" /> Download
												</div>
											)}
										</button>
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
