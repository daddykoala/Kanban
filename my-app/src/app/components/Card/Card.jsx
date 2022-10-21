import React from 'react';
//import PropTypes from 'prop-types';

import Task from '../task/Task';

import './cardStyles.scss';

function Card() {
return (
    <div className='card'>
        <h1>Nom de ma carte</h1>
       <Task/>
       <Task/> 
       <Task/> 
       <Task/> 
       <Task/>  
    </div>
);
}
// Card.propTypes = {};

// Card.defaultProps = {};

export default React.memo(Card);