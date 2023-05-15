import React from "react";

import { useSelector } from "react-redux";
//import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//import PropTypes from 'prop-types';

import List from "../List/List";
import CreateCard from "../form/createCard";
import "./deckStyles.scss";

function Decks() {
  //const { id } = useParams();


  const id = 44;
  const userState = useSelector((state) => state.user.user);



  const [tableau, setTableau] = useState(null);
  const [lists, setLists] = useState([]);

  //je vien recup mon tableau avec le params

 useEffect(() => {
    if (userState && userState.table) {

      const tables = userState.table;
      setTableau(tables);
      const foundTable = userState.table.find((table) => table.id === id);
      const foundList = foundTable.list;
      setLists(foundList);
    }
  }, [userState, id]);



      // console.log("lists en dhors use effect", lists,typeof lists, typeof lists[0,1,3] );
      

  return (
    <section className="deck">
      <div className="deck__add__list">
      <CreateCard />
      </div>
<div className="deck__board">

      {//je crée toutles listes de mon tableau
      lists.map((list) => {
         return (
            <List
              key={list.id}
              title={list.name}
              id={list.id}
              position={list.position}
              
              // cards={list.card}
              
            />
          );
        })}
</div>
      

    </section>
  );
}
//Decks.propTypes = {};

//Decks.defaultProps = {};

export default React.memo(Decks);
