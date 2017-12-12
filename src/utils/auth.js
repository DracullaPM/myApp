// import auth0 from "auth0-js";
// const authDomain = "tictacturing-ragapp.au.auth0.com";
// const clientId = "32ZWURSvYIS2XEiW7zakcE00LDSWLhew";

// class AuthService {
//     constructor() {
//         this.lock = new auth0.WebAuth({
//             domain: authDomain,
//             clientID: clientId,
//             scope: "openid email"
//         });
//         this.showLock = this.showLock.bind(this);      
//         // this.lock.on("authenticated", this.authProcess.bind(this));  
//     }

//     authProcess = (authResult) => {
//         console.log(authResult);
//     }

//     login() {
//         this.lock.authorize();
//     }

//     showLock() {
//         this.lock.show();
//     }

//     setToken = (authFields) => {
//         let {
//             idToken,
//             exp
//         } = authFields;
//         window.localStorage.setItem("idToken", idToken);
//         window.localStorage.setItem("exp", exp * 1000);
//     }

//     isCurrent = () => {
//         let expString = window.localStorage.getItem("exp");
//         if (!expString) {
//             window.localStorage.removeItem("idToken");
//             return false;
//         }
//         let now = new Date();
//         let exp = new Date(parseInt(expString, 10)); // 10 is radix parameter
//         if (exp < now) {
//             this.logout();
//             return false;
//         } else {
//             return true;
//         }
//     }

//     getToken() {
//         let idToken = window.localStorage.getItem("idToken");
//         if (this.isCurrent() && idToken) {
//             return idToken;
//         } else {
//             window.localStorage.removeItem("idToken");
//             window.localStorage.removeItem("exp");
//             return false;
//         }
//     }

//     logout = () => {
//         window.localStorage.removeItem("idToken");
//         window.localStorage.removeItem("exp");
//         window.location.reload();
//     }
// }

// const auth = new AuthService();

// export default auth;
import Auth0Lock from 'auth0-lock'
const authDomain = "tictacturing-ragapp.au.auth0.com";
const clientId = "32ZWURSvYIS2XEiW7zakcE00LDSWLhew";

class AuthService {
	constructor() {
		this.lock = new Auth0Lock(clientId, authDomain, {
			auth: {
				params: {
					scope: 'openid email'
				},
			},
		})

		this.showLock = this.showLock.bind(this)

		this.lock.on('authenticated', this.authProcess.bind(this))
	}

	authProcess = (authResult) => {
		console.log(authResult)
	}

	showLock() {
		this.lock.show()
	}

	setToken = (authFields) => {
		let {
			idToken,
			exp
		} = authFields
		localStorage.setItem('idToken', idToken)
		localStorage.setItem('exp', exp * 1000)
	}

	isCurrent = () => {
		let expString = localStorage.getItem('exp')
		if (!expString) {
			localStorage.removeItem('idToken')
			return false
		}
		let now = new Date()
		let exp = new Date(parseInt(expString, 10)) //10 is radix parameter
		if ( exp < now ) {
			this.logout()
			return false
		} else {
			return true
		}
	}

	getToken() {
		let idToken = localStorage.getItem('idToken')
		if (this.isCurrent() && idToken) {
			return idToken
		} else {
			localStorage.removeItem('idToken')
			localStorage.removeItem('exp')
			return false
		}
	}

	logout = () => {
		localStorage.removeItem('idToken')
		localStorage.removeItem('exp')
		location.reload()
	}

}

const auth = new AuthService()

export default auth
