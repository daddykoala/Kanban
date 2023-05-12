//import PropTypes from 'prop-types';
import React from "react";
import { useSelector } from "react-redux";

import Titles from "./Titles";

import "./sidebarStyles.scss";
// import { useState } from "react";

function Sidebar() {
  //je recupere le state de user
  const userState = useSelector((state) => state.user.user);

  if (userState === undefined || userState === null) {
    return <div> marche pas </div>;
  }

  //j'ecoute les changemebt de state de user

  // const [display,setDisplay]=useState('none')
  // const toggleClassname= e => {
  //     if (display === 'none'){

  //         setDisplay('selected')
  //     }
  //     if (display === 'selected'){

  //         setDisplay('none')
  //     }

  // }

  return (
    <div>
      <section className="sidebar">
        <h2>tableaux</h2>
        <div>
          <h2>mes tableaux</h2>
          {userState.table &&
            userState.table.map((element, index) => (
              <Titles
                names={element.name}
                key={index}
                tableId={element.id}
                userId={userState.id}
                // className={display}
                // onClick={toggleClassname}
              >
                {element.name}
              </Titles>
            ))}
        </div>
      </section>
    </div>
  );
}
//sidebar.propTypes = {};

//sidebar.defaultProps = {};

export default Sidebar;
