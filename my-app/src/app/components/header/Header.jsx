//import PropTypes from 'prop-types';
import React from 'react';

import Modal from './Modal'
import './headerStyles.scss';

function Header() {
return (
    <div>
        <section>
        <h1>kanban</h1>
        <h4>nouveau tableau</h4>
        <div className='header__login'>
        <Modal/>
        </div>
        </section>
    </div>
);
}
//Header.propTypes = {};

//Header.defaultProps = {};

export default React.memo(Header);


   