import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Home from "./Routes/HomeScreen"
import Login from "./Routes/Login"
import Resume from "./Components/Resume"
import PrivateRoute from "./Routes/PrivateRoute"
import PublicRoute from "./Routes/PublicRoute"

function App() {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Home} />
			<PublicRoute exact path="/login" component={Login} />
			{/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
			<Route exact path="/resume" component={Resume} />
			{/* <PrivateRoute exact path="/settings" component={Settings} />
			<PrivateRoute exact path="/logout" component={Logout} /> */}
		</BrowserRouter>
	)
}

export default App
