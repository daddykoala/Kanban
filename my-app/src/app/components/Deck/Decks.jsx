import React from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//import PropTypes from 'prop-types';

import List from "../List/List";
import CreateCard from "../form/createCard";
import "./deckStyles.scss";

function Decks() {
  // const { decksId } = useParams();
  const decksId = 80
  const userState = useSelector((state) => state.user.user);
  const [tableau, setTableau] = useState(null);
  // const [Lists, setLists] = useState([]);

  //je vien recup mon tableau avec le params
  // useEffect(() => {

  //   if (userState && userState.table) {
  //     const tables = userState.table;
  //     console.log(userState);
  //     setTableau(tables);
  //    console.log(tables);
  //     const foundTable = userState.table.findIndex((table) => table.id === parseInt(decksId));
  //     console.log(foundTable);
  //     if (foundTable !== -1) {
  //       // const foundList = foundTable.list;
  //       setLists(userState.table[foundTable].list)
  //       console.log(Lists);;
  //     } else {
  //       setLists([]); // Si aucune table n'est trouvée, initialiser les listes comme un tableau vide
  //     }
  //   }
  // }, [userState, decksId]);


  const Lists = [
    { id: 1, name: 'List 1', position: 1 },
    { id: 2, name: 'List 2', position: 2 },
    { id: 3, name: 'List 3', position: 3 },
    { id: 4, name: 'List 4', position: 4 },
    { id: 5, name: 'List 5', position: 5 },
  ];
    
      

      return (
        <section className="deck">
          <div className="deck__add__list">
            <CreateCard tableId={decksId} />
          </div>
          <div className="deck__board">
           
            {
              // Affichez les listes si elles existent
              Lists.length > 0 ?
              Lists.map((list) => {
                return (
                  <List
                    key={list.id}
                    title={list.name}
                    id={list.id}
                    position={list.position}
                    tableId={decksId}
                  />
                );
              })
              :

              <p>let's go Connect !!!</p>
 
            }
          </div>
        </section>
      );
      
}
//Decks.propTypes = {};

//Decks.defaultProps = {};

export default Decks;
