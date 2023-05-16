//import PropTypes from 'prop-types';
import React, { useEffect } from "react";
import { useSelector } from "react-redux";


import Titles from "./Titles";
import { Link } from "react-router-dom";

import "./sidebarStyles.scss";
// import { useState } from "react";

function Sidebar() {
  //je recupere le state de user
  const userState = useSelector((state) => state.user.user);
  const tokenState = useSelector((state) => state.auth);
  
   useEffect(() => {
      console.log("userState", userState);
      console.log(tokenState);
    }, [userState,tokenState]);

  if (userState === undefined || userState === null) {
    return <div className="sidebar">
      <h2>tableaux</h2>
      <div>
        <h2>mes tableaux</h2>
        </div>;
    </div>
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
  
          {userState.table[0] ? (
            userState.table.map((element, index) => (
              <Link to={`/decks/${element.id}`} key={index}>
                <Titles
                  names={element.name}
                  key={index}
                  tableId={element.id}
                  userId={userState.id}
                >
                  {element.name}
                </Titles>
              </Link>
            ))
          ) : (
            <p>Créez vos premiers tableaux</p>
          )}
        </div>
      </section>
    </div>
  );
}
//sidebar.propTypes = {};

//sidebar.defaultProps = {};

export default Sidebar;
