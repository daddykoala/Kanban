import React from 'react';
// import PropTypes from 'prop-types';

import './taskStyles.scss';

function Task({name,id}
    ) {
return (
    <div className='card__container' key={id}>
        <h3 className='card__container__name'>{name}</h3>
        <input className='card__container__checkbox' type="checkbox" />
        
    </div>
);
}
// Task.propTypes = {};

// Task.defaultProps = {};

export default React.memo(Task);