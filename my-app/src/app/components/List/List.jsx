import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/Card";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { RiAddBoxLine } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaPen } from "react-icons/fa";
// api
import {
  useModifyListByTableMutation,
  useDeleteListByTableMutation,
} from "../../store/api/api";

import { modifyList, removeList } from "../../store/reducer/userSlice";

//J'importe mes query;

// import ListModale from './ListModale';

import "./ListStyles.scss";

function List({ id,  title, position, tableId, tasks }) {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [cardEditing, setcardEditing] = useState(false);
  // const api
  const [deleteListByTable] = useDeleteListByTableMutation();
  const [modifyListByTable] = useModifyListByTableMutation();

  useEffect(() => {
    console.log("cardEditing", cardEditing);
  }, [cardEditing]);
  //modifie la value de l'input
  const handleTitleChange = (e) => {
    setInput(e.target.value);
  };

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
      const result = await modifyListByTable({ id, name: input });
      if (result) {
        setIsEditing(false);
        dispatch(modifyList(result.data));
      }
    } catch (error) {}
  };

  const handleDelete = async () => {
    //je recupere l'id pour dele la liste en bdd
    const result = await deleteListByTable({id,tableId});
    if (result.data) {
      console.log("result", result);
      dispatch(removeList(result.data));
    }
    //je suprime la lsite en bdd
  };

  const handleAdd = () => {};

  const handleSubmitCard = async (e) => {
    e.preventDefault();
    //query pour ajouter une carte
    const result = await modifyListByTable({ id:id, name: input });
    if (result) {
      dispatch(modifyList(result.data));
      setcardEditing(!cardEditing);
    }
    //dispatch pour ajouter une carte
  };

  const handleShowFormCard = (e) => {
    e.preventDefault();
    console.log("click", cardEditing);
    setcardEditing(!cardEditing);
  };

  return (
    <div className="list" key={id} id={id} position={position}>
      <div className="list__header">
        {isEditing ? (
          <form onSubmit={handleTitleSubmit}>
            <input
              className="list__header__input"
              value={input}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              autoFocus
            />
            <button className="list__header__button" type="submit">
              <FaPen />
            </button>
          </form>
        ) : (
          <div className="list__header">
            <h1 className="list__header__title" onClick={handleTitleClick}>
              {title}
            </h1>
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
            value={value}
            onChange={(e) => setValue(e.target.value)}
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

      {/* {tasks.map((element, index) => (
        <Card  id={element.id} name={element.name} listId={id} />
      ))} */}
    </div>
  );
}
// List.propTypes = {};

// List.defaultProps = {};

export default React.memo(List);
