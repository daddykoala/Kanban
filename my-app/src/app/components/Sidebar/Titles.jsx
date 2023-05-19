import { Link } from "react-router-dom";
import {
  useDeleteTableByUserMutation,
  useModifyTableByUserMutation,
} from "../../store/api/api";
import { removeTable } from "../../store/reducer/userSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { BsFillTrash2Fill, BsPencilFill } from "react-icons/bs";

function Titles({ names, index, className, tableId, userId }) {
  const dispatch = useDispatch();
  const [deleteTableMutation] = useDeleteTableByUserMutation();
  const [modifyTableByUser] = useModifyTableByUserMutation()
  //modifcation du nom de tableau
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState("");

  const handleTitleChange = (e) => {
    setInput(e.target.value);
  };

  async function handleTitleSubmit(e) {
    console.log("je passe dans le submit", tableId);
    e.preventDefault();
    setIsEditing(false);
    try {
      console.log("je passe dans le try", tableId);
      const result = await modifyTableByUser({ id: tableId, name: input });
      if (result) {
        console.log("je passe dans le reducer", result.data);
        dispatch(modifyTableByUser(result.data));
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleTitleBlur = () => {
    setIsEditing(false);
  };

  const handleTitleClick = () => {
    setIsEditing(true);
    setInput(names); // Set current name as the input value
  };



  async function handlDeleteTable() {
    try {
      // au click je recupere l'id du tableaupour le delete en bdd
      const result = await deleteTableMutation(tableId);
      if (result) {
        dispatch(removeTable(tableId));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="title" key={index}>
      <Link to={`/decks/${tableId}`}>
        {isEditing ? (
          <form onSubmit={handleTitleSubmit}>
            <input
              value={input}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              autoFocus
            />
            <button type="submit" className="titles__button__submit"  >
          <BsPencilFill />
        </button>
          </form>
        ) : (
          <div >{names}</div>
        )}
      </Link>
      {isEditing ? null : (
      <div className="button-container">
        <button className="titles__button" onClick={handleTitleClick}>
          <BsPencilFill />
        </button>
        <button onClick={handlDeleteTable}>
          <BsFillTrash2Fill />
        </button>
      </div>
    )}
    </div>
  );
}

export default React.memo(Titles);
