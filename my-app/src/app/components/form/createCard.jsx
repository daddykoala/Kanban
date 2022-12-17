import React from "react";

function createCard() {
    return (
        
        <div className='card__header'>
            <h3>ajout d'une carte</h3>
            <h3>+</h3>

        </div>
        
    );
    }
    // createCard.propTypes = {};
    
    // createCard.defaultProps = {};
    
    export default React.memo(createCard);