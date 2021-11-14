import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Button } from "react-bootstrap";
import "../../styles/navbar1.scss";
import Swal from "sweetalert2";
import shell from "../../img/shell.jpg";
import es from "../../img/spain.png";
import it from "../../img/italy.png";
import uk from "../../img/united-kingdom.png";
import ger from "../../img/germany.png";
import chi from "../../img/china.png";
import { FormattedMessage } from "react-intl";
import { langContext } from "../store/langContext";

const Navbar1 = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const language = useContext(langContext);

	function NoRegister() {
		Swal.fire({
			title: "Debe estar registrado para acceder al sitio",
			icon: "warning",
			confirmButtonText: "Ok"
		});
	}

	return (
		<div>
			{/*<IntlProvider locale="es" messages={MensajesEspañol}>*/}
			<Navbar /*bg="dark"*/ variant="dark" style={{ background: " #42b72a" }}>
				<Navbar.Brand href="/">
					<img
						alt=""
						src={shell}
						width="30"
						height="30"
						className="d-inline-block align-top rounded-circle"
					/>
					<FormattedMessage id="menu.brand" defaultMessage="Camino de Santiago" />
				</Navbar.Brand>

				<div className="d-flex justify-content-center ml-auto">
					<Link to="/">
						<span className="topbarLink text-white p-1">
							<FormattedMessage id="menu.home" defaultMessage="Inicio" />
						</span>
					</Link>
					<Link to="/rutas">
						<span className="topbarLink text-white p-1">
							<FormattedMessage id="menu.routes" defaultMessage="Rutas" />
						</span>
					</Link>
					<Link to="/albergues">
						<span className="topbarLink text-white p-1">
							<FormattedMessage id="menu.hostels" defaultMessage="Albergues" />
						</span>
					</Link>
					<Link to="/consejos">
						<span className="topbarLink text-white p-1">
							<FormattedMessage id="menu.advice" defaultMessage="Consejos" />
						</span>
					</Link>

					{!localStorage.getItem("token") ? (
						<Link to="/login">
							<span onClick={NoRegister} className="topbarLink text-white p-1 mr-5">
								<FormattedMessage id="menu.experiences" defaultMessage="Experiencias" />
							</span>
						</Link>
					) : (
						<>
							<Link to="/myprofile">
								<span className="topbarLink text-white p-1 mr-5 pr-5">
									<FormattedMessage id="menu.experiences" defaultMessage="Experiencias" />
								</span>
							</Link>
						</>
					)}

					<div className="flags">
						<button onClick={() => language.setLanguage("es")}>
							<img src={es} alt="" />
						</button>
						<button onClick={() => language.setLanguage("en")}>
							<img src={uk} alt="" />
						</button>
						<button onClick={() => language.setLanguage("it")}>
							<img src={it} alt="" />
						</button>
						<button onClick={() => language.setLanguage("ger")}>
							<img src={ger} alt="" />
						</button>
						<button onClick={() => language.setLanguage("chi")}>
							<img src={chi} alt="" />
						</button>
					</div>
				</div>

				<div className="ml-auto">
					{!localStorage.getItem("token") ? (
						<Link to="/login">
							<Button variant="warning">
								<FormattedMessage id="menu.login" defaultMessage="Acceder/Registro" />
							</Button>
						</Link>
					) : (
						<Button
							onClick={() => {
								actions.logout();
								history.push("/");
							}}
							variant="warning">
							<FormattedMessage id="menu.logout" defaultMessage="Salir" />
						</Button>
					)}
				</div>
			</Navbar>
			{/*</IntlProvider>*/}
		</div>
	);
};

export default Navbar1;
