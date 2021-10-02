import React from "react";
import "./profile.css";
import Topbar from "../../component/topbar/Topbar";
//import Sidebar from "../../component/sidebar/Sidebar";
import Feed from "../../component/feed/Feed";
//import Rightbar from "../../component/rightbar/Rightbar";

const Profile = () => {
	return (
		<>
			<Topbar />
			<h1>Esto es Profile</h1>
			<div className="profile">
				{/*}
				<Sidebar />
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								className="profileCoverImg"
								src="assets/post/3.jpeg"
								alt=""
							/>
							<img
								className="profileUserImg"
								src="assets/person/7.jpeg"
								alt=""
							/>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">Safak Kocaoglu</h4>
							<span className="profileInfoDesc">Hello my friends!</span>
						</div>
					</div>
					<div className="profileRightBottom">
	*/}

				<Feed />
				{/*
						<Rightbar profile />
					</div>
				</div>
				*/}
			</div>
		</>
	);
};

export default Profile;
