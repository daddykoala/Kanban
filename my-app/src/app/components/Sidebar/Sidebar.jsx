//import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

// import Titles from "./Titles";

import './sidebarStyles.scss';
import { useState } from 'react';

function Sidebar() {
    const titles = useSelector(state => state.user.user)
    console.log("log titles",titles);
    const [display,setDisplay]=useState('none')
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
        {titles.maps((element)=>

        <h3>
            names={element.name}
            key={element.index}
            className={display}
            {/* onClick={toggleClassname} */}

        </h3>
        

        )}
        

        </div>
        </section>
    </div>
);
}
//sidebar.propTypes = {};

//sidebar.defaultProps = {};

export default React.memo(Sidebar);