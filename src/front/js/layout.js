import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import Albergues from "./pages/albergues";
import Rutas from "./pages/rutas";
import Consejos from "./pages/consejos";
import MyProfile from "./pages/myprofile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import Navbar1 from "./component/Navbar1";
import RutasDetails from "./pages/rutasDetails";
import Booking from "./pages/booking";
import Confirm from "./pages/confirm";
import CheckoutBooking from "./pages/checkoutBooking";

import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar1 />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/albergues">
							<Albergues />
						</Route>
						<Route exact path="/albergues/:detailsId">
							<Booking />
						</Route>
						<Route exact path="/rutas">
							<Rutas />
						</Route>
						<Route exact path="/rutas/:detailsId">
							<RutasDetails />
						</Route>
						<Route exact path="/myprofile">
							<MyProfile />
						</Route>
						<Route exact path="/consejos">
							<Consejos />
						</Route>
						<Route exact path="/confirmation">
							<Confirm />
						</Route>
						<Route exact path="/checkout">
							<CheckoutBooking />
						</Route>

						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
