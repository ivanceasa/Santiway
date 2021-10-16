import React from "react";
import "./posts.css";
import Topbar from "../../component/topbar/Topbar";
import Feed from "../../component/feed/Feed";

const Posts = () => {
	return (
		<>
			<h1>Esto es Posts</h1>
			<div className="posts">
				<Feed />
			</div>
		</>
	);
};

export default Posts;
