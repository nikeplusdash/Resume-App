import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Home from "./Routes/HomeScreen"
import PrivateRoute from "./Routes/PrivateRoute"

function App() {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Home} />
			{/* <PublicRoute exact path="/login" component={Login} />
			<PrivateRoute exact path="/dashboard" component={Dashboard} />
			<PrivateRoute exact path="/resume" component={Resume} />
			<PrivateRoute exact path="/settings" component={Settings} />
			<PrivateRoute exact path="/logout" component={Logout} /> */}
		</BrowserRouter>
	)
}

export default App
