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

var meses = new Array(
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre'
);
var f = new Date();
var HOY = f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear();

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			temperatura: dataTemp.T2s_1s,
			Time: dataTemp.Time,

			data: {
				labels: Object.values(dataTemp.Time).map((b) => {
					//
					return String(new Date(b).getUTCHours()) + ':' + String(new Date(b).getUTCMinutes()) + '0';
				}),

				datasets: [
					{
						label: 'Resolucion cada 30 [min]',
						backgroundColor: '#E6EEFF',
						borderColor: '#FFB105',
						borderWidth: 2,
						fill: true,
						pointRadius: 1,
						options: {
							sampleSize: 12
						},
						// spanGaps: true,
						data: Object.values(dataWind.W10s_1s)
					}
				]
			},
			data2: {
				labels: Object.values(dataTemp.Time).map((b) => {
					return String(new Date(b).getUTCHours()) + ':' + String(new Date(b).getUTCMinutes()) + '0';
				}),

				datasets: [
					{
						label: 'Temperatura en Grados Celcius',
						backgroundColor: '#E6EEFF',
						borderColor: '#FFB105',
						fill: true,
						fontColor: 'black',
						pointRadius: 0,
						data: Object.values(dataTemp.T2s_1s)
					}
				]
			}
		};
	}

	render() {
		return (
			<div className="ui">
				<div className="padd2 ui header black  aligned center aligned  " />
				<div className="padd2 ui header black  aligned center aligned  ">
					Ubicacion Geografica
					<br />Latitud: -17.6290737 <span className="tab" /> Longitud: -65.2842807
				</div>

				<div className="padd2 ui header black  aligned center aligned  " />
				<div class="ui divider" />

				<div className="ui grid container  animate__animated animate__fadeInLeft">
					<div className="sixteen wide column">
						<div className="ui ">
							<div class="ui segment color yellow">
								<div className="ui header black middle aligned center aligned">
									Velocidad de viento m/s a 10m de altura
								</div>
								<br />
								{HOY}

								{/* <div class="ui segment"> */}
								<Line
									data={this.state.data}
									options={{
										maintainAspectRatio: true,
										legend: {
											display: true
										},
										scales: {
											xAxes: [
												{
													stacked: true,
													ticks: {
														min: 0,
														maxTicksLimit: 24
													}
												}
											],
											yAxes: [
												{
													stacked: false
												}
											]
										}
									}}
								/>
							</div>
						</div>
					</div>
					<div className="sixteen wide column">
						<div className="ui ">
							<div class="ui segment">
								<div className="ui header black middle aligned center aligned">Temperatura</div>
								<br />
								{HOY}
								<Line
									data={this.state.data2}
									options={{
										maintainAspectRatio: true,
										legend: {
											display: true
										},
										scales: {
											xAxes: [
												{
													stacked: true,
													ticks: {
														min: 0,
														maxTicksLimit: 24
													}
												}
											],
											yAxes: [
												{
													stacked: false
												}
											]
										}
									}}
								/>
							</div>
						</div>
					</div>
					<div className="eight wide column">
						<div className="padd2 ui header black  aligned center aligned  " />
						<div className="padd2 ui header black  aligned center aligned  " />
						<div className="ui ">
							<div className="ui segment">
								<div className="ui header black middle aligned center aligned">
									Distribucion de Weibull
								</div>
								<div className="ui image">
									<img src={Weibull} alt="logo" />
								</div>
							</div>
						</div>
					</div>
					<div className="eight wide column">
						<div className="ui ">
							<div className="ui segment">
								<div className="ui header black middle aligned center aligned">Rosa de Vientos</div>
								<WindRose data={dataWind2} columns={data.columns} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
