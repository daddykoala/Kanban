//import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import './sidebarStyles.scss';

function Sidebar() {
    const tableauName = useSelector(state => state.tableauName)
    console.log(tableauName,);
return (
    <div>
        <section className='sidebar'>
        <h2>tableaux</h2>
        <div>
        <h2>mes tableaux</h2>
        <span>{tableauName}</span>
        

        </div>
        </section>
    </div>
);
}
//sidebar.propTypes = {};

//sidebar.defaultProps = {};

export default React.memo(Sidebar);