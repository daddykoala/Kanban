import React from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";

//import PropTypes from 'prop-types';

import Card from "../Card/Card";
import CreateCard from "../form/createCard";
import "./deckStyles.scss";

function Decks() {
  const { id } = useParams();
  const tableState = useSelector((state) => state.table);
  console.log("tableState", tableState); 

//   const [tableau, setTableau] = useState(null);
//   const [lists, setLists] = useState([]);
//   //je vien recup mon tableau avec le params

//   useEffect(() => {
//     if (userState && userState.table) {
//       console.log("userState", userState);
//       const tables = userState.table   
//       const parsedId = parseInt(id.trim());

//     console.log("Parsed id", parsedId);
//       setTableau(tables);
//       const tableau = userState.table.find(table => table.id === parsedId);
//     console.log("Found tableau", tableau);
     
      
//     }
//   }, [userState, id])

//   console.log(tableau);
//   //je boucle sur tableau pour avor des consoles log du type de tableau.id

// const table = tableau && tableau.find((element) => element.id === parseInt(id));






  return (
    <div className="board">
      <CreateCard />
    </div>
  );
}
//Decks.propTypes = {};

//Decks.defaultProps = {};

export default React.memo(Decks);
