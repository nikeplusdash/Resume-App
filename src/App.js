import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Home from "./Routes/HomeScreen"
import Login from "./Routes/Login"
import Dashboard from "./Routes/Dashboard"
import Resume from "./Components/Resume"
import PublicRoute from "./Routes/PublicRoute"
import PrivateRoute from "./Routes/PrivateRoute"

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<PublicRoute exact path="/login" component={Login} />
				<PrivateRoute exact path="/dashboard" component={Dashboard} />
				<PrivateRoute exact path="/resume" component={Resume} />
				{/* <PrivateRoute exact path="/settings" component={Settings} />
				<PrivateRoute exact path="/logout" component={Logout} /> */}
				<Redirect to="/UhOh" />
			</Switch>
		</BrowserRouter>
	)
}

export default App
