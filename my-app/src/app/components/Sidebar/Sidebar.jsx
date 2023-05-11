//import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';


// import Titles from "./Titles";

import './sidebarStyles.scss';
import { useState,useEffect } from 'react';

function Sidebar() {
//je recupere le state de user
    const userState = useSelector(state => state.user.user);
    //je met l'array souhaité dans un state
    // const [titles,setTitles]=useState(null)

    // useEffect(() => {
    //     if(userState && userState.user && userState.user.table) {
    //       setTitles(userState);
    //     }
    //   }, [userState]);

    console.log("log titles",userState);
    // const [display,setDisplay]=useState('none')
    ;

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
        <section className='sidebar'>
        <h2>tableaux</h2>
        <div>
        <h2>mes tableaux</h2>
        {userState.table && userState.table.map((element, index )=>

        <h3 
        names={element.name}
        key={element.index}
        // className={display}
        // onClick={toggleClassname}
         >
        {element.name}

        </h3>
        

        )}
        

        </div>
        </section>
    </div>
);
}
//sidebar.propTypes = {};

//sidebar.defaultProps = {};

export default Sidebar;