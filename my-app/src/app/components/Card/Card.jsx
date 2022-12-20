import React from 'react';
//import PropTypes from 'prop-types';

import Task from '../task/Task';
import CardModale from './CardModale';

import './cardStyles.scss';

function Card({names,tasks}) {

return (
    <div className='card'>
        <div className='card__header'>
            <h3>{names}</h3>
            <CardModale/>

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