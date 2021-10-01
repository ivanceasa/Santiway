import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { useHistory } from "react-router-dom";
import "./login.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	console.log("This is your token", store.token);
	const handleClick = () => {
		actions.login(email, password).then(() => {
			history.push("/");
		});
	};

	return (
		<div className="text-center mt-5">
			{store.token && store.token != "" && store.token != undefined ? (
				"You are logged in whit this token" + store.token
			) : (
				<div className="login">
					<div className="loginWrapper">
						<div className="loginLeft">
							<h3 className="loginLogo">Bienvenido!</h3>
							<span className="loginDesc">Conecta con peregrinos de todo el mundo.</span>
						</div>
						<div className="loginRight">
							<div className="loginBox">
								<input
									type="email"
									placeholder="Email"
									value={email}
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									onChange={e => {
										setEmail(e.target.value);
									}}
								/>

								<input
									type="password"
									placeholder="Password"
									value={password}
									className="form-control"
									id="exampleInputPassword1"
									onChange={e => {
										setPassword(e.target.value);
									}}
								/>
								<button type="submit" className="loginButton" onClick={handleClick}>
									Log In
								</button>
								<span className="loginForgot">Forgot Password?</span>
								<button className="loginRegisterButton">Create a New Account</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;
