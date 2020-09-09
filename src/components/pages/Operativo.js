import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { WindRose, calculateWindRose } from 'react-windrose-chart';

import dataTemp from './Prueba/temp.json';
import dataWind from './Prueba/wind.json';
import dataWindDir from './Prueba/windDir.json';

import dataTemp1 from './Prueba/temp1.json';
import dataWind1 from './Prueba/wind1.json';
import dataWindDir1 from './Prueba/windDir1.json';

import Weibull from '../../imagenes/Weibull.png';

const data2 = {
	direction: Object.values(dataWindDir.Wds_1s),
	speed: Object.values(dataWind.W10s_1s)
};

const data = {
	data: [
		{
			angle: 'N  ',
			'0-1': 0.5,
			/* ... */
			'6-7': 0.2,
			'7+': 0.1,
			total: 4.9
		} /* ... */
	],
	columns: [ 'angle', '0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7+' ]
};

const dataWind2 = calculateWindRose(data2);

export default class Operativo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			temperatura: dataTemp.T2s_1s,
			Time: dataTemp.Time,

			data: {
				labels: Object.values(dataTemp.Time).map((b) => {
					//
					return (
						// new Date(b).getUTCDate() +
						String(new Date(b).getUTCFullYear()) +
						'/0' +
						String(new Date(b).getUTCMonth() + 1) +
						'/' +
						new Date(b).getUTCDate() +
						' ' +
						String(new Date(b).getUTCHours())
					);
				}),

				datasets: [
					{
						label: 'Irradiacion kWh/m2',
						backgroundColor: '#E6EEFF',
						borderColor: '#FFB105',
						borderWidth: 2,
						fill: true,
						pointRadius: 1,
						// spanGaps: true,
						data: Object.values(dataWind.W10s_1s)
					}
				]
			},
			data2: {
				labels: Object.values(dataTemp1.Time).map((b) => {
					return (
						new Date(b).getUTCDate() +
						'/' +
						String(new Date(b).getUTCMonth() + 1) +
						'/ ' +
						String(new Date(b).getUTCFullYear()) +
						' ' +
						String(new Date(b).getUTCHours())
					);
				}),

				datasets: [
					{
						label: 'Temperatura en Grados Celcius',
						backgroundColor: '#E6EEFF',
						borderColor: '#FFB105',
						fill: true,
						fontColor: 'black',
						pointRadius: 0,
						data: Object.values(dataTemp1.T2s_1s)
					}
				]
			}
		};
	}

	render() {
		return (
			<div>
				<div className="">
					<div className="padd2 ui header black middle aligned center aligned  ">
						Ubicacion Geografica
						<br />Latitud: -16.3232 Longitud:-65.3232
					</div>

					<div className="ui grid container  animate__animated animate__fadeInLeft">
						<div className="eight wide column">
							<div className="ui ">
								<div className="ui header black middle aligned center aligned">
									Global Horizontal Irradiation kWh/m2
								</div>

								<Line data={this.state.data2} />
							</div>
						</div>
						<div className="eight wide column">
							<div className="ui ">
								<div className="ui header black middle aligned center aligned">
									Direct Horizontal Irradiation kWh/m2
								</div>

								<Line data={this.state.data2} />
							</div>
						</div>
						<div className="eight wide column">
							<div className="ui ">
								<div className="ui header black middle aligned center aligned">
									Diffuse Horizontal Irradiation kWh/m2
								</div>

								<Line data={this.state.data2} />
							</div>
						</div>
						<div className="eight wide column">
							<div className="ui ">
								<div className="ui header black middle aligned center aligned">
									Temperatura °C a 2m de altura
								</div>
								<Line data={this.state.data2} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
