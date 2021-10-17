import React from "react";
import "./posts.css";
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
