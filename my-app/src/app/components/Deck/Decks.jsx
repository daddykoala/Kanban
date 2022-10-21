import React from 'react';
//import PropTypes from 'prop-types';

import Card from '../Card/Card';

import './deckStyles.scss';

function Decks() {
return (
    <div>
        <h1>mon deck</h1>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
    </div>
);
}
//Decks.propTypes = {};

//Decks.defaultProps = {};

export default React.memo(Decks);