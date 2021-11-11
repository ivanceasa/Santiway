const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			routes: [],
			hostels: [],
			users: [],
			user: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			getRoutes: () => {
				fetch(process.env.BACKEND_URL + "/api/routes")
					.then(resp => resp.json())
					.then(data => setStore({ routes: data }))
					.catch(error => console.log(error));
			},
			getHostels: () => {
				fetch(process.env.BACKEND_URL + "/api/hostels")
					.then(resp => resp.json())
					.then(data => setStore({ hostels: data }))
					.catch(error => console.log(error));
			},
			getUsers: () => {
				fetch(process.env.BACKEND_URL + "/api/profiles")
					.then(resp => resp.json())
					.then(data => setStore({ users: data }))
					.catch(error => console.log(error));
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			syncTokenFromLocalStore: () => {
				const token = localStorage.getItem("token");
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			logout: () => {
				localStorage.removeItem("token");
				console.log("Log out");
				setStore({ token: null });
			},

			login: async (email, password) => {
				const options = {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};

				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", options);
					if (resp.status !== 200) {
						/*alert("There was been some error");*/
						return false;
					}
					const data = await resp.json();
					console.log("This came from the backend", data);
					localStorage.setItem("token", data[0].access_token);
					setStore({ token: data[0].access_token });
					setStore({ user: data[1].id });
					localStorage.setItem("user", data[1].id);
					return true;
				} catch (error) {
					console.log("There has been an error login in");
				}
			},

			getMessage: () => {
				const store = getStore();
				const options = {
					headers: {
						Authorization: "Bearer " + store.token
					}
				};

				fetch(process.env.BACKEND_URL + "/api/profile", options)
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},

			/*
			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			*/
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
