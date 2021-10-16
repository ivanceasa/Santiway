import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";

const Profile = () => {
	return (
		<>
			<div className="card bg-dark text-white">
				<i className="fas fa-user-alt" />
			</div>
			<div>
				<h1>AQUI IRAN LOS DATOS DEL USUARIO</h1>
			</div>

			<div className="homeContainer" />
		</>
	);
};

export default Profile;
