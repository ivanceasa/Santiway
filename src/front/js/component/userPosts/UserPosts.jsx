import React from "react";
import "./UserPosts.css";
import fotoPerfil from "../../../img/fotoPerfilPrueba.jpg";
import fotoPerfil2 from "../../../img/photoperfil2.jpg";
import fotoPerfil3 from "../../../img/photoPerfil.jpg";
import fotocamino1 from "../../../img/fotocamino1.jpg";
import PropTypes from "prop-types";
import { Users, PostsOfUsers } from "../../dummyData";
// import { Posts } from "../../dummyData";

const UserPosts = ({ postUsers }) => {
	console.log(postUsers);
	return (
		<div className="userpost">
			<div className="header">
				<img
					className="postProfileImg"
					// src={Users.filter(e => e.id === postUsers.user_id)[0].profile_picture}
					src={fotoPerfil}
					alt=""
				/>
				<span className="postUsername">
					<strong>{Users.filter(e => e.id === postUsers.user_id)[0].username}</strong>
				</span>
				<span className="postDate">{postUsers.date}</span>
				<div className="icono1">
					<i className="fas fa-ellipsis-v fa-2x" />
				</div>
			</div>
			<div className="texto">
				<p>{postUsers.post_content}</p>
			</div>
			<div className="bodyImage">
				{/* <img src={postUsers.photo} /> */}
				<img src={fotocamino1} />
			</div>
		</div>
	);
};

UserPosts.propTypes = {
	postUsers: PropTypes.string,
	Users: PropTypes.string
};

export default UserPosts;
