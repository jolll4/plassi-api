import { NavLink as Link } from "react-router-dom";
import React from "react";

class NavigationBar extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/Home">Main page</Link>
        <Link to="/SeatingOrder">The Next page</Link>
      </nav>
    );
  }
}

export default NavigationBar;
