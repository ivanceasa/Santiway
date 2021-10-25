import React from "react";
import "./userProfile.css";
import PropTypes from "prop-types";
import UserPosts from "../../component/userPosts/UserPosts.jsx";
import fotoPerfil from "../../../img/fotoPerfilPrueba.jpg";

const UserProfile = () => {
	return (
		<div className="row py-5 px-4">
			<div className="col-md-11 mx-auto">
				<div className="bg-white shadow rounded overflow-hidden">
					<div className="px-4 pt-0 pb-4 cover">
						<div className="media align-items-end profile-head">
							<div className="profile mr-3">
								<img src={fotoPerfil} className="ProfileImg" />
								<button type="button" className="btn btn-outline-secondary h-1">
									Edit profile
								</button>
							</div>
							<div className="media-body mb-5 text-white">
								<h4 className="mt-0 mb-0">Mark Williams</h4>
								<p className="small mb-4">
									{" "}
									<i className="fas fa-map-marker-alt mr-2" />
									New York
								</p>
							</div>
						</div>
					</div>
					<div className="bg-light p-4 d-flex justify-content-end text-center" />
					<div className="px-4 py-3">
						<h5 className="mb-0">About</h5>
						<div className="p-4 rounded shadow-sm bg-light">
							<p className="font-italic mb-0">Web Developer</p>
							<p className="font-italic mb-0">Lives in New York</p>
							<p className="font-italic mb-0">Photographer</p>
						</div>
					</div>
					<div className="py-4 px-4">
						<div className="d-flex align-items-center justify-content-between mb-3">
							<h5 className="mb-0">Recent posts</h5>
							<a href="#" className="btn btn-link text-muted">
								Show all
							</a>
						</div>
						<div className="row">
							<UserPosts />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

UserPosts.propTypes = {
	postUsers: PropTypes.string,
	Users: PropTypes.string
};

export default UserProfile;
