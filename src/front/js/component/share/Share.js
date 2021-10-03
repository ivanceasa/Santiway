import React from "react";
import "./share.css";

const Share = () => {
	return (
		<div className="share">
			<div className="shareWrapper">
				<div className="shareTop">
					{/*<img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />*/}
					<input placeholder="Escribe algo" className="shareInput" />
				</div>
				<hr className="shareHr" />
				<div className="shareBottom">
					<div className="shareOptions">
						<div className="shareOption">
							{/*<PermMedia htmlColor="tomato" className="shareIcon" />*/}
							<span className="shareOptionText">Añade una foto</span>
						</div>
					</div>
					<button className="shareButton">Share</button>
				</div>
			</div>
		</div>
	);
};

export default Share;
