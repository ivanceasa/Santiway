import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
import Topbar from "../component/topbar/Topbar";

const Profile = () => {
	return (
		<>
			<Topbar />
			<div className="card bg-dark text-white">
				<i className="fas fa-user-alt" />
			</div>
			<div>
				<h1>AQUI IRAN LOS DATOS DEL USUARIO</h1>
			</div>
			<form>
				<input type="button" value="GET" />
				<input type="button" value="POST" />
				<input type="button" value="PUT" />
				<input type="button" value="GET" />
				<input type="button" value="UPDATE" />
			</form>
			<div className="homeContainer" />
		</>
	);
};

export default Profile;
