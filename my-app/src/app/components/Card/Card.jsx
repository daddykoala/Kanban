import React from 'react';
// import PropTypes from 'prop-types';

import './taskStyles.scss';

function Task({name,id}
    ) {
return (
    <div key={id}>
        {name}
    </div>
);
}
// Task.propTypes = {};

// Task.defaultProps = {};

export default React.memo(Task);