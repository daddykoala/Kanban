//import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import Titles from "./Titles";

import './sidebarStyles.scss';

function Sidebar() {
    const titles = useSelector(state => state.tableau.tableauName)
    console.log(titles ,'hello');

return (
    <div>
        <section className='sidebar'>
        <h2>tableaux</h2>
        <div>
        <h2>mes tableaux</h2>
        {titles.map((element)=>

        <Titles
        names={element.name}
        key={element.index}
        />

        )}
        

        </div>
        </section>
    </div>
);
}
//sidebar.propTypes = {};

//sidebar.defaultProps = {};

export default React.memo(Sidebar);