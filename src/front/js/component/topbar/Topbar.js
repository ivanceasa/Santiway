import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import "./topbar.css";

const Topbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="topbarContainer">
			<div className="topbarLeft">
				<span className="logo">Camino de Santiago</span>
			</div>
			<div className="topbarCenter">
				{/*<div className="searchbar">
					<Search className="searchIcon" />
					<input placeholder="Search" className="searchInput" />
				</div>*/}
			</div>
			<div className="topbarRight">
				<div className="topbarLinks">
					<Link to="/rutas">
						<span className="topbarLink">Rutas</span>
					</Link>
					<Link to="/albergues">
						<span className="topbarLink">Albergues</span>
					</Link>
					<Link to="/consejos">
						<span className="topbarLink">Consejos</span>
					</Link>
				</div>
				<div className="topbarIcons">
					<div className="topbarIconItem">
						{!store.token ? (
							<Link to="/login">
								<button className="btn btn-primary">Log in</button>
							</Link>
						) : (
							<button onClick={() => actions.logout()} className="btn btn-primary">
								Log out
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Topbar;
