import React, { useState } from "react";
import "./posts.css";
import Feed from "../../component/feed/Feed";
import UserPosts from "../../component/userPosts/UserPosts";

const Posts = () => {
	return (
		<>
			<Feed />
			<UserPosts />
		</>
	);
};

export default Posts;
