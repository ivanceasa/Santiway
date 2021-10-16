import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar1 = () => {
	return (
		<div>
			<nav classNameName="navbar navbar-expand-lg navbar-light bg-light">
				<div classNameName="container-fluid">
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link" to="/">
									Home
								</Link>
							</li>
							{/*<li className="nav-item">
                        <Link to="/">
                            <span className="navbar-brand mb-0 h1">A Home</span>
                        </Link>
                    </li>*/}
							<li className="nav-item">
								<Link className="nav-link" to="/rutas">
									Rutas
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/albergues">
									Albergues
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/consejos">
									Consejos
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/profile">
									Mi cuenta
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar1;
