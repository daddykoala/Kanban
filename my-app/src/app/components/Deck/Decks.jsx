import React from "react";
import "./deckStyles.scss";
import "../List/ListStyles.scss";
import "../card/taskStyles.scss";

function Decks() {
  return (
    <section className="deck">
      <div className="deck__board">

        <div className="list">
          <div className="list__header">
            <h1 className="list__header__title">Liste 1</h1>
          </div>
          <div className='card__container'>
            <h1 className='card__container__name'>Task 1</h1>
            <input className='card__container__checkbox' type="checkbox" />
          </div>
          <div className='card__container'>
            <h1 className='card__container__name'>Task 2</h1>
            <input className='card__container__checkbox' type="checkbox" />
          </div>
          <div className='card__container'>
            <h1 className='card__container__name'>Task 3</h1>
            <input className='card__container__checkbox' type="checkbox" />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Decks;

