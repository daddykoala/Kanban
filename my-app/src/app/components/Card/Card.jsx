import React from 'react';
//import PropTypes from 'prop-types';

import Task from '../task/Task';

import './cardStyles.scss';

function Card() {
return (
    <div className='card'>
        <div className='card__header'>
            <h3>Nom de ma carte</h3>
            <h3>+</h3>

        </div>
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