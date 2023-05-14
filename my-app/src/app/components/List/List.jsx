import React from 'react';
//import PropTypes from 'prop-types';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Card from '../card/Card';
// import ListModale from './ListModale';

import './ListStyles.scss';

function List({id,key,title,position}) {

return (
    <div className='list'>
        <div className='list__header'>
            <h3 className='list__header__title'>{title}</h3>
            <div className='utils'>
                <button><AiFillEdit style={{ marginRight: '10px' }}/></button>
                <button>
                    <AiFillDelete />
                </button>
               
            </div>

        </div>
       {/* {tasks.map((element,index)=> 
       <Card
       key={index}
       name={element.name}
       id={element.id}/>  
       )} */}
    </div>
);
}
// List.propTypes = {};

// List.defaultProps = {};

export default React.memo(List);