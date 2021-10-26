import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

import shell from "../../img/shell.jpg";

const Navbar1 = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	return (
		<div>
			<Navbar /*bg="dark"*/ variant="dark" style={{ background: " #42b72a" }}>
				<Navbar.Brand href="/">
					<img
						alt=""
						src={shell}
						width="30"
						height="30"
						className="d-inline-block align-top rounded-circle"
					/>{" "}
					Camino de Santiago
				</Navbar.Brand>

				<div className="d-flex justify-content-center ml-auto">
					<Link to="/">
						<span className="topbarLink text-white p-1">Home</span>
					</Link>
					<Link to="/rutas">
						<span className="topbarLink text-white p-1">Rutas</span>
					</Link>
					<Link to="/albergues">
						<span className="topbarLink text-white p-1">Albergues</span>
					</Link>
					<Link to="/consejos">
						<span className="topbarLink text-white p-1">Consejos</span>
					</Link>
					<Link to="/myprofile">
						<span className="topbarLink text-white p-1">Mi perfil</span>
					</Link>
				</div>

				<div className="ml-auto">
					{!store.token ? (
						<Link to="/login">
							<Button variant="warning">Login/Sign up</Button>
						</Link>
					) : (
						<Button
							onClick={() => {
								actions.logout();
								history.push("/");
							}}
							variant="warning">
							Log out
						</Button>
					)}
				</div>
			</Navbar>
		</div>
	);
};

export default Navbar1;
