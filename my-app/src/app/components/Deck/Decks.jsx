import React from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//import PropTypes from 'prop-types';

import List from "../List/List";
import CreateCard from "../form/createCard";
import "./deckStyles.scss";

function Decks() {
  const { id } = useParams();
  const userState = useSelector((state) => state.user.user);
  const [tableau, setTableau] = useState(null);
  const [lists, setLists] = useState([]);

  //je vien recup mon tableau avec le params
  useEffect(() => {
    if (userState && userState.table) {
      const tables = userState.table;
      setTableau(tables);
      const foundTable = userState.table.find((table) => table.id === id);
      if (foundTable) {
        const foundList = foundTable.list;
        setLists(foundList);
      } else {
        setLists([]); // Si aucune table n'est trouvée, initialiser les listes comme un tableau vide
      }
    }
  }, [userState, id]);



      // console.log("lists en dhors use effect", lists,typeof lists, typeof lists[0,1,3] );
      

      return (
        <section className="deck">
          <div className="deck__add__list">
            <CreateCard tableId={id} />
          </div>
          <div className="deck__board">
            <div className="list"></div>
            <div className="list"></div>
            <div className="list"></div>
            <div className="list"></div>
            <div className="list"></div>
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
                    tableId={id}
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

export default React.memo(Decks);
