import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<Link className="btn btn-primary m-1" to="/signup">
					Sign Up
				</Link>
				<div className="ml-auto">
					{!store.token ? (
						<Link to="/login">
							<button className="btn btn-primary">Log in</button>
						</Link>
					) : (
						<button onClick={() => actions.logout()} className="btn btn-primary">
							Log out
						</button>
					)}
				</div>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
