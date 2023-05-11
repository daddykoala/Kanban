import React from "react";
import { useSelector } from "react-redux";

//import PropTypes from 'prop-types';

import Card from "../Card/Card";
import CreateCard from "../form/createCard";
import "./deckStyles.scss";

function Decks() {
  const listTableaux = useSelector((state) => state.tableau.tableauName);

  const {lists} = listTableaux[0]
  // console.log(listTableaux,'decks');

  return (
      <div className="board">
      <h1>{listTableaux.name}</h1>
      <section id={listTableaux.id} className="board__card">

        {lists.map((element, index)=>{
            const {task} = element
            return <Card key={index} id={element.id} names={element.name} tasks={task} />;
        })},

        <CreateCard />
      </section>
    </div>
  );
}
//Decks.propTypes = {};

//Decks.defaultProps = {};

export default React.memo(Decks);
