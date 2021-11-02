import React, { Component } from "react";
import "../../styles/footer.scss";
import shell from "../../img/shell.jpg";
import fourGeeks from "../../img/4geeks.jpg";

export const Footer = () => (
	<footer className="text-center text-lg-start bg-light text-muted h-auto">
		<div className="container text-center text-md-start mt-5">
			<div className="row mt-3  d-inline-flex">
				<div className="col-md-5 col-lg-5 col-xl-5 mx-auto mb-5">
					<h6 className="text-uppercase fw-bold mb-4">
						<img
							alt=""
							src={shell}
							width="30"
							height="30"
							className="d-inline-block align-top rounded-circle"
						/>
						Santi-Way for Dummies
					</h6>
				</div>

				<div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
					<h6 className="text-uppercase fw-bold mb-4 ">Useful links</h6>
					{/* poner 4geeks academy y breathe code */}
					<div>
						<a href="https://github.com/ivanceasa/" className="me-4 text-reset">
							<i className="fab fa-github" />
						</a>
						<p>ivanceasa</p>
					</div>
					<div>
						<a href="https://github.com/Felbf" className="me-4 text-reset">
							<i className="fab fa-github" />
						</a>
						<p>Felbf</p>
					</div>
					<div>
						<a href="https://github.com/Felbf" className="me-4 text-reset">
							<img src={fourGeeks} className="logo4Geeks" />
						</a>
						<p>4Geeks Academy</p>
					</div>
				</div>

				<div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
					<h6 className="text-uppercase fw-bold mb-4">Contact Us</h6>

					<p>
						<i className="fas fa-home me-3" /> Santiago de Compostela, A Coruña 15705, ES
					</p>
					<p>
						<i className="fas fa-envelope me-3" />
						santiwayFD@gmail.com
					</p>
					<p>
						<i className="fas fa-phone me-3" /> + 01 234 567 88
					</p>
				</div>
			</div>
		</div>

		<div className="text-center p-4">
			© 2021 Copyright:
			<a className="text-reset fw-bold" href="https://mdbootstrap.com/">
				MDBootstrap.com
			</a>
		</div>
	</footer>
);
