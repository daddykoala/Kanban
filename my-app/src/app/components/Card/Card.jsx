import React from 'react';
//import PropTypes from 'prop-types';

import Task from '../task/Task';

import './cardStyles.scss';

function Card({names,tasks}) {

return (
    <div className='card'>
        <div className='card__header'>
            <h3>{names.name}</h3>
            <h3>+</h3>

        </div>
       {tasks.map((element,index)=> 
       <Task
       key={index}
       name={element.name}
       id={element.id}/>  
       )}
    </div>
);
}
// Card.propTypes = {};

// Card.defaultProps = {};

export default React.memo(Card);