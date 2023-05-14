import React from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";

//import PropTypes from 'prop-types';

import Card from "../List/List";
import CreateCard from "../form/createCard";
import "./deckStyles.scss";

function Decks() {
  const { id } = useParams();
  // const id =44
  const userState = useSelector((state) => state.user.user);



  const [tableau, setTableau] = useState(null);
  const [lists, setLists] = useState([]);
  //je vien recup mon tableau avec le params

  useEffect(() => {
    if (userState && userState.table) {
     
      const tables = userState.table ;
      setTableau(tables);
      const foundTable = userState.table.find(table => table.id === id);

     
      
    }
  }, [userState, id])


  //je boucle sur tableau pour avor des consoles log du type de tableau.id

const table = tableau && tableau.find((element) => element.id === parseInt(id));






  return (
    <div className="board">
      <CreateCard />
    </div>
  );
}
//Decks.propTypes = {};

//Decks.defaultProps = {};

export default React.memo(Decks);
