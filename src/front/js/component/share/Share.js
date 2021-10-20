import React from "react";
import "./share.css";
import fotoPerfil from "../../../img/fotoPerfilPrueba.jpg";

const Share = () => {
	return (
		<div className="share">
			<div className="shareWrapper">
				<div className="shareTop">
					<img className="shareProfileImg" src={fotoPerfil} alt="" />

					<input placeholder="Escribe algo" className="shareInput" />
				</div>
				<hr className="shareHr" />
				<div className="shareBottom">
					<div className="shareOptions">
						<div className="shareOption">
							<i className="fas fa-camera " />
							<span className="shareOptionText">Añade una foto</span>
						</div>
					</div>
					<button className="shareButton">Compartir</button>
				</div>
			</div>
		</div>
	);
};

export default Share;
