//import PropTypes from 'prop-types';
import React, { useEffect,useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { closeSidebar } from "../../store/reducer/sidebarSlice";


import Titles from "./Titles";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";


import { useWindowSize } from "../../service/screenSize";

import "./sidebarStyles.scss";
// import { useState } from "react";

function Sidebar() {
  //je recupere le state de user
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user.user);
  const tokenState = useSelector((state) => state.auth.token);
  const sidebarIsOpen = useSelector((state) => state.sidebar.isOpen);
  // const [isSidebarOpen, setSidebarOpen] = useState(false);

  
  useEffect(() => {
    console.log("userState", userState);
    
  }, [userState]);
  
  console.log("sidebarIsOpen", sidebarIsOpen);
  //gestion du small screen  
  const {width} = useWindowSize();
  console.log("width", width);
  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  if (userState === undefined || userState === null) {
    return <section className={`sidebar ${ sidebarIsOpen ? 'open' : ''}`}>
      { width < 768 ? <span className="sidebar__btn__quit" onClick={handleCloseSidebar}><ImCross/></span> : null}
      
      <div>
          {/* { true ? <span>fermer</span> : null} */}
        <h2>mes tableaux</h2>
        
        </div>;
    </section>
  }


  
  
  return (
    
      <section className={`sidebar ${ sidebarIsOpen ? 'open' : ''}`}>
          { width < 768 ? <span className="sidebar__btn__quit" onClick={handleCloseSidebar}><ImCross/></span> : null}
       
        <div>
         
          <h2>mes tableaux</h2>
  
          {userState.table[0] ? (
            userState.table.map((element, index) => (
              
                <Titles
                  names={element.name}
                  key={index}
                  tableId={element.id}
                  userId={userState.id}
                >
                  {element.name}
                </Titles>
              
            ))
          ) : (
            <p>Créez vos premiers tableaux</p>
          )}
        </div>
      </section>
    
  )
}
//sidebar.propTypes = {};

//sidebar.defaultProps = {};

export default Sidebar;
