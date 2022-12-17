//import PropTypes from 'prop-types';
import React from 'react';


import './sidebarStyles.scss';

function sidebar() {
return (
    <div>
        <section className='sidebar'>
        <h2>tableaux</h2>
        <div>
        <h2>mes tableaux</h2>
        

        </div>
        </section>
    </div>
);
}
//sidebar.propTypes = {};

//sidebar.defaultProps = {};

export default React.memo(sidebar);