import React from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import PropTypes from 'prop-types';
import List from "../List/List";
import CreateCard from "../form/createCard";
import "./deckStyles.scss";
import { IoLogIn } from "react-icons/io5";

function Decks() {
  const { decksId } = useParams();
  console.log(decksId,typeof(decksId));
  const userState = useSelector((state) => state.user.user);

  const [tableName,setTableName] = useState("");
  const [Lists, setLists] = useState([]);

 //je recupere la table dans mon stae user grace au tableid
  const table = userState.table.find((element) => element.id === parseInt(decksId));
  console.log(table,userState);

      return (
        <section className="deck">
          <div className="deck__add__list">
            <CreateCard tableId={decksId} />
            {/* <h2>{table.name}</h2> */}
          </div>
          <div className="deck__board">
           
            {
              // Affichez les listes si elles existent
              table.list.length > 0 ?
              table.list.map((elem) => {
                return (
                  <List
                    key={elem.id}
                    title={elem.name}
                    id={elem.id}
                    position={elem.position}
                    tableId={decksId}
                    tasks={elem.tasks}
                  />
                );
              })
              :
              <p>créer votre Liste !</p>
            }
          </div>
        </section>
      );
      
}
//Decks.propTypes = {};

//Decks.defaultProps = {};

export default Decks;
