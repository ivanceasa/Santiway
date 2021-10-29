import React, { useContext, useEffect } from "react";
import { Button, Card, CardGroup, Row } from "react-bootstrap";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import fotoPerfil from "../../img/fotoPerfilPrueba.jpg";

const CardPost = () => {
	const history = useHistory();
	const { store, actions } = useContext(Context);
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
					<strong>Peregrino1</strong>
				</span>
				<span className="postDate">Hace 5 minutos</span>
				<div className="icono1">
					<i className="fas fa-ellipsis-v fa-2x" />
				</div>
			</div>
			<div className="texto">
				<p>First Post</p>
			</div>
			<div className="bodyImage">
				<img className="bodyImage" src={fotocamino1} />
			</div>
		</div>
	);
};

export default CardPost;

<div className="post">
<div className="postWrapper">
  <div className="postTop">
    <div className="postTopLeft">
      <img
        className="postProfileImg"
        src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
        alt=""
      />
      <span className="postUsername">
        {Users.filter((u) => u.id === post?.userId)[0].username}
      </span>
      <span className="postDate">{post.date}</span>
    </div>
    <div className="postTopRight">
      <MoreVert />
    </div>
  </div>
  <div className="postCenter">
    <span className="postText">{post?.desc}</span>
    <img className="postImg" src={post.photo} alt="" />
  </div>
  <div className="postBottom">
    <div className="postBottomLeft">
      <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
      <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
      <span className="postLikeCounter">{like} people like it</span>
    </div>
    <div className="postBottomRight">
      <span className="postCommentText">{post.comment} comments</span>
    </div>
  </div>
</div>
</div>
