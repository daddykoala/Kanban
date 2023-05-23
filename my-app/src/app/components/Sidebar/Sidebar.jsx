import React from "react";
import { NavLink } from "react-router-dom";
import { BsFillTrash2Fill, BsPencilFill } from "react-icons/bs";
import "./sidebarStyles.scss";

function Sidebar() {
  return (
    <aside>
    <nav className="sidebar">
    <h1>Mes tableaux</h1>
      <div className="title">
        <NavLink to="/decks/1" activeClassName="active">
          <div>Tableau 1</div>
        </NavLink>
        <div className="button-container">
          <button className="titles__button">
            <BsPencilFill />
          </button>
          <button className="titles__button">
            <BsFillTrash2Fill />
          </button>
        </div>
      </div>

    </nav>
    </aside>
  );
}

export default Sidebar;
