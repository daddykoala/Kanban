import React from 'react';
//import PropTypes from 'prop-types';

import Card from '../Card/Card';
import CreateCard from '../form/createCard';
import './deckStyles.scss';

function Decks() {
return (
    <div className='board'>
        <h1>titre tableau
        </h1>
        <section className='board__card'>

        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <CreateCard/>

        </section>
    </div>
);
}
//Decks.propTypes = {};

//Decks.defaultProps = {};

export default React.memo(Decks);