import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import shell from "../../img/shell.jpg";

const Navbar1 = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	function userNotRegister() {
		if (!store.token) {
			Swal.fire({
				title: "Debe estar registrado para acceder al sitio",
				icon: "warning",
				confirmButtonText: "Ok"
			});
			return (
				<Link to="/login">
					<span className="topbarLink text-white p-1">Experiencias</span>
				</Link>
			);
		} else {
			<Link to="/myprofile">
				<button className="topbarLink text-white p-1">Experiencias</button>
			</Link>;
		}
	}

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
					<Link to="/login">
						<span onClick={userNotRegister} className="topbarLink text-white p-1">
							Experiencias
						</span>
					</Link>

					{/* {!store.token ? (
						<Link to="/login">
							
							<span className="topbarLink text-white p-1">Experiencias</span>
						</Link>
					) : (
						<>
							<Link to="/myprofile">
								<button className="topbarLink text-white p-1">Experiencias</button>
							</Link>
						</>
					)} */}
				</div>

				<div className="ml-auto">
					{!localStorage.getItem("token") ? (
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
