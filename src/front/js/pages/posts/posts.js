import React, { useState } from "react";
import "./posts.css";
import Feed from "../../component/feed/Feed";
import UserPosts from "../../component/userPosts/UserPosts.jsx";
import { Users, PostsOfUsers } from "../../dummyData";

const Posts = () => {
	return (
		<>
			<Feed />
			{PostsOfUsers.map(e => (
				<UserPosts key={e.id} postUsers={e} />
			))}
		</>
	);
};

export default Posts;
