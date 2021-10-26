import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const MyProfile = () => {
	const { store, actions } = useContext(Context);
	const [posts, setPosts] = useState([]);
	const [newPost, setNewPost] = useState("");

	async function sendPost() {
		const response = await fetch(`${process.env.BACKEND_URL}/api/profile/post`, {
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({
				post: newPost
			})
		});
		const responseJson = await response.json();
		setPosts([...posts, responseJson]);
	}

	async function getPosts() {
		const response = await fetch(`${process.env.BACKEND_URL}/api/posts`, {
			headers: {
				"Content-Type": "application/json"
			}
		});
		const responseJson = await response.json();
		setPosts(responseJson);
	}

	return (
		<div className="text-center mt-5">
			<button onClick={getPosts}>Recibir posts</button>
			<div className="posts">
				{posts.map(post => (
					<div key={post.id}>
						{post.created_at}-{post.post_content}
					</div>
				))}
			</div>
			<div>
				<input type="text" onChange={event => setNewPost(event.target.value)} />
				<button onClick={sendPost}>Enviar</button>
			</div>
		</div>
	);
};

export default MyProfile;

<div className="share">
	<div className="shareWrapper">
		<div className="shareTop">
			<img className="shareProfileImg" /*src={fotoPerfil}*/ alt="" />

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
</div>;
