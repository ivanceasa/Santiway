const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
					const resp = await fetch("https://3001-ivory-boa-704acxd6.ws-eu18.gitpod.io/api/login", options);
					if (resp.status !== 200) {
						alert("There was been some error");
						return false;
					}
					const data = await resp.json();
					console.log("This came from the backend", data);
					localStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
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

				fetch("https://3001-ivory-boa-704acxd6.ws-eu18.gitpod.io/api/protected", options)
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
