import React from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//import PropTypes from 'prop-types';

import List from "../List/List";
import CreateCard from "../form/createCard";
import "./deckStyles.scss";

function Decks() {
  const { decksId } = useParams();
  const userState = useSelector((state) => state.user.user);
  const [tableau, setTableau] = useState(null);
  const [lists, setLists] = useState([]);
console.log(decksId);
  //je vien recup mon tableau avec le params
  useEffect(() => {
    console.log(decksId);
    if (userState && userState.table) {
      const tables = userState.table;
      setTableau(tables);
      const foundTable = userState.table.find((table) => table.id === decksId);
      if (foundTable) {
        const foundList = foundTable.list;
        setLists(foundList);
      } else {
        setLists([]); // Si aucune table n'est trouvée, initialiser les listes comme un tableau vide
      }
    }
  }, [userState, decksId]);



      // console.log("lists en dhors use effect", lists,typeof lists, typeof lists[0,1,3] );
      

      return (
        <section className="deck">
          <div className="deck__add__list">
            <CreateCard tableId={decksId} />
          </div>
          <div className="deck__board">
           
            {
              // Affichez les listes si elles existent
              lists.length > 0 ?
              lists.map((list) => {
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
