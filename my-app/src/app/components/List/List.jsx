import React from 'react';
//import PropTypes from 'prop-types';

import Card from '../card/Card';
import ListModale from './ListModale';

import './ListStyles.scss';

function List({names,tasks}) {

return (
    <div className='card'>
        <div className='card__header'>
            <h3>{names}</h3>
            <ListModale/>

        </div>
       {tasks.map((element,index)=> 
       <Card
       key={index}
       name={element.name}
       id={element.id}/>  
       )}
    </div>
);
}
// List.propTypes = {};

// List.defaultProps = {};

export default React.memo(List);