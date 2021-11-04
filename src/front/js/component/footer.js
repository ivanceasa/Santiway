import React, { Component } from "react";
import fourGeeks from "../../img/4geeks.jpg";
import shell from "../../img/shell.jpg";
import "../../styles/footer.scss";

export const Footer = () => (
	<nav id="footer" className="text-center text-muted bg-light">
		<div className="container mt-4">
			<div className="row">
				<div className="col-12 float-center">
					<div className="third col-12 text-center p-3">
						<ul>
							<li className="contactText">
								<div>
									<a href="https://3000-coral-antelope-t9kum4pk.ws-eu17.gitpod.io/">
										<img
											alt=""
											src={shell}
											width="30"
											height="30"
											className="d-inline-block align-top rounded-circle"
										/>
									</a>
									Santi-Way for Dummies
								</div>
								<div>
									<i className="far fa-envelope" />
									santiwayFD@gmail.com
								</div>
								<div>
									<i className="fas fa-map-marker-alt" />
									Santiago de Compostela, A Coruña 15705, ES
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="row text-muted">
				<div className="line" />
				<div className="col-12">
					<div className="second2">
						<div className="icono1">
							<a href="https://github.com/ivanceasa/" className="me-4 text-reset">
								<i className="fab fa-github fa-2x margin" />
							</a>{" "}
							<p>ivanceasa</p>
						</div>
						<div className="icono1">
							<a href="https://github.com/Felbf" className=" me-4 text-reset">
								{" "}
								<i className="fab fa-github fa-2x margin" />
							</a>
							<p>Felbf</p>
						</div>
						<div className="icono1">
							<a href="https://4geeksacademy.com/es/inicio" className="me-4 text-reset">
								{" "}
								<img src={fourGeeks} className="logo4Geeks margin" />
							</a>
							<p>4Geeks Academy</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div className="text-center p-3">
			© 2021 Copyright:{" "}
			<a className="text-muted" href="#">
				SantiWayforDummies.com
			</a>
		</div>
	</nav>
);
