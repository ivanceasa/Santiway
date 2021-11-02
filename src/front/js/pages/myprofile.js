import React, { useState, useContext, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import fotoPerfil from "../../img/profilePhoto.png";
import "../../styles/myprofile.scss";

const MyProfile = () => {
	const { store, actions } = useContext(Context);
	const [posts, setPosts] = useState([]);
	const [newPost, setNewPost] = useState("");
	const [file, setFile] = useState(null);

	useEffect(() => {
		getPosts();
	}, []);
	useEffect(() => {
		actions.getUsers();
	}, []);

	async function sendPost(id) {
		const data = new FormData();
		const date = Date.now();
		const user_id = id;
		data.append("newPost", newPost);
		data.append("file", file);
		data.append("date", date);
		data.append("user_id", user_id);
		const response = await fetch(`${process.env.BACKEND_URL}/api/post`, {
			headers: {
				Authorization: "Bearer " + store.token
			},
			method: "POST",
			body: data
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
		<>
			{/*}
			<div className="getPosts text-center mt-5">
				<button onClick={getPosts}>Ver todos los posts</button>
			</div>
	      */}
			<div className="share mt-4">
				<div className="shareWrapper">
					<div className="shareTop">
						<img className="shareProfileImg" src={fotoPerfil} alt="" />

						<input
							placeholder="Escribe algo"
							className="shareInput"
							onChange={event => setNewPost(event.target.value)}
						/>
					</div>

					<hr className="shareHr" />
					{/*
					{file && (
						<div className="shareImgContainer">
							<img className="shareImg" src={URL.createObjectURL(file)} alt="" />
							<button className="shareCancelImg" onClick={() => setFile(null)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-x-circle-fill"
									viewBox="0 0 16 16">
									<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
								</svg>
							</button>
						</div>
					)}
					*/}

					<div className="shareBottom">
						<div className="shareOptions">
							<label htmlFor="file" className="shareOption">
								<i className="fas fa-camera " />
								<span className="shareOptionText ml-1">Añade una foto</span>
								<input
									style={{ display: "none" }}
									type="file"
									id="file"
									accept=".png,.jpeg,.jpg"
									onChange={e => setFile(e.target.files[0])}
								/>
							</label>
						</div>
						<button className="shareButton" onClick={sendPost}>
							Compartir
						</button>
					</div>
				</div>
			</div>
			<div className="posts mt-5">
				{posts.map(post => (
					<div key={post.id} className="userpost">
						<div className="header pl-auto">
							<img className="postProfileImg" src={fotoPerfil} alt="" />
							<span className="postUsername">
								{store.users.map(user => {
									if (user.id === post.user_id) {
										return <strong>{user.username}</strong>;
									}
								})}
							</span>
							<span className="postDate">{post.created_at}</span>
							<div className="icon1">
								<i className="fas fa-ellipsis-v fa-2x" />
							</div>
						</div>
						<div className="postText mx-3">{post.post_content}</div>
						<div className="bodyImage">
							<img className="bodyImage" src={post.photo} />
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default MyProfile;
