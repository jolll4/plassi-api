import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationBarStyles.css";

class NavigationBar extends React.Component {
	render() {
		return (
			<nav>
				<NavLink to="/">Main page</NavLink>
				<NavLink to="/SeatingOrder">SeatingOrder</NavLink>
				<NavLink to="/SeatingOrderCsv">SeatingOrder From Csv</NavLink>
				<NavLink to="/TextBoxes">TextBoxes</NavLink>
			</nav>
		);
	}
}

export default NavigationBar;
