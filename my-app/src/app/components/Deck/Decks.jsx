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
  const [Lists, setLists] = useState([]);

  useEffect(() => {
    if (userState && userState.table) {
      const foundTable = userState.table.find((table) =>
      table.id === parseInt(decksId));
      console.log(foundTable);
      if (foundTable) {
        setLists(foundTable.list || [])
        console.log(Lists);
      } else {
        setLists([]); //eviter un crash donner un tableau vide
      }
    }
  }, [userState, decksId]);
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
                    // key={list.id}
                    title={list.name}
                    id={list.id}
                    position={list.position}
                    tableId={decksId}
                    tasks={list.tasks}
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
