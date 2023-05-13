import React from "react";

import { useSelector } from "react-redux";

//import PropTypes from 'prop-types';

import Card from "../Card/Card";
import CreateCard from "../form/createCard";
import "./deckStyles.scss";

function Decks() {
  // const list = useSelector((state) => state.user.table.list);

//  console.log(list);

  return (
      <div className="board">
      

        

        <CreateCard />
      
    </div>
  );
}
//Decks.propTypes = {};

//Decks.defaultProps = {};

export default React.memo(Decks);
