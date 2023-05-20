import React from 'react';
// import PropTypes from 'prop-types';

import './taskStyles.scss';

function Task({name,id}
    ) {
return (
    <div className='card__container' key={id}>
        <h1 className='card__container__name'>{name}</h1>
        <input className='card__container__checkbox' type="checkbox" />
        
    </div>
);
}
// Task.propTypes = {};

// Task.defaultProps = {};

export default React.memo(Task);