import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "../card/Card";
//react icons
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaPen } from "react-icons/fa";
// api
import {
  useModifyListByTableMutation,
  useDeleteListByTableMutation,
  usePostCardByListMutation
} from "../../store/api/api";

import { modifyList, removeList, addCard } from "../../store/reducer/userSlice";
import { sanitizedValue } from "../../service/input";

import "./ListStyles.scss";

function List({ id, title, position, tableId, tasks }) {
console.log('tasks', tasks);
  const userState = useSelector((state) => state.user.user);
  useEffect(() => {
    console.log("userState", userState);
  }, [userState]);
  
  const dispatch = useDispatch();
  const [inputList, setInputList] = useState("");
  const [inputCard, setInputCard] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [cardEditing, setcardEditing] = useState(false);
  // const api
  const [deleteListByTable] = useDeleteListByTableMutation();
  const [modifyListByTable] = useModifyListByTableMutation();
  const [postCardByList] = usePostCardByListMutation();

  useEffect(() => {
    console.log("cardEditing", cardEditing);
  }, [cardEditing]);

  //modifie la value de l'inputList
  

  // va  passer isEditing a true pour modifier le titre de la liste
  const handleTitleClick = () => {
    setIsEditing(!cardEditing);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
  };

  const handleTitleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await modifyListByTable({ id, name: inputList });
      if (result) {
        dispatch(modifyList(result.data));
        setIsEditing(false);
      }
    } catch (error) {}
  };

  async function handleDelete() {
   
    console.log("id", id);
    try {
      const result = await deleteListByTable({ id, tableId });
      console.log("je suis dans le try", result);
      if (result && result.data) {
        console.log('je suis ici');
        dispatch(removeList({id:id, table_id:tableId}))
      }
    } catch (error) {
console.log(error);
    }
  
  };

  const handleAdd = () => {};

  const handleSubmitCard = async (e) => {
    e.preventDefault();
    //query pour ajouter une carte
    console.log("je passe ici ",id, inputCard,typeof(id), typeof(inputCard));
    const result = await postCardByList({ list_id: id, name: inputCard });
    if (result) {
      console.log("je passe ici 2",result);
      dispatch(addCard( result.data));
      setcardEditing(!cardEditing);
      setInputCard("");
    }
    //dispatch pour ajouter une carte
  };

  const handleShowFormCard = (e) => {
    e.preventDefault();
    console.log("click", cardEditing);
    setcardEditing(!cardEditing);
  };

    //fonction pour tout mes states locaux sur les onchange qui sanitize les valeurs
  const handleInputChange = (e, stateValue) => {
    stateValue(sanitizedValue(e.target.value));
  };
  return (
    <div className="list" key={id} id={id} position={position}>
      <div className="list__header">
        {isEditing ? (
          <form onSubmit={handleTitleSubmit}>
            <input
              className="list__header__input"
              value={inputList}
              onChange={(e) => handleInputChange(e, setInputList)}
              onBlur={handleTitleBlur}
              autoFocus
            />
            <button className="list__header__button" type="submit">
              <FaPen />
            </button>
          </form>
        ) : (
          <div className="list__header">
            <h2 className="list__header__title" onClick={handleTitleClick}>
              {title}
            </h2>
            <div className="utils">
              <button>
                <AiFillEdit
                  onClick={handleTitleClick}
                  style={{ marginRight: "10px" }}
                />
              </button>
              <button onClick={handleDelete}>
                <AiFillDelete />
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <form onSubmit={handleSubmitCard} className="form__add__card">
          <input
            className={`form__add__card__input ${
              cardEditing ? "openInput" : ""
            } `}
            type="text"
            placeholder="Ajouter une carte"
            value={inputCard}
            onChange={(e) => handleInputChange(e, setInputCard)}
          />
          {/* gestion du formulaire de carte */}
          {cardEditing ? (
            <button className="form__add__card__button openInput" type="submit">
              <IoMdAddCircleOutline />
            </button>
          ) : (
            <button
              className="form__add__card__button"
              type="button"
              onClick={handleShowFormCard}
            >
              <IoMdAddCircleOutline />
            </button>
          )}
        </form>
      </div>

      {(tasks || []).map((element, index) => (
  <Task id={element.id} name={element.name} listId={id} />
))}
    </div>
  );
}
// List.propTypes = {};

// List.defaultProps = {};

export default React.memo(List);
