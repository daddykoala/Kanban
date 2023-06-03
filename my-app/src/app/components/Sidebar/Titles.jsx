import { Link ,useNavigate} from "react-router-dom";
import {
  useDeleteTableByUserMutation,
  useModifyTableByUserMutation,
} from "../../store/api/api";
import { removeTable ,modifyTable} from "../../store/reducer/userSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState,useEffect } from "react";
import { BsFillTrash2Fill, BsPencilFill } from "react-icons/bs";

function Titles({ names, index, className, tableId, userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteTableMutation] = useDeleteTableByUserMutation();
  const [modifyTableByUser] = useModifyTableByUserMutation()
  //modifcation du nom de tableau
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState("");

  const handleTitleChange = (e) => {
    setInput(e.target.value);
  };

  async function handleTitleSubmit(e) {
  
    e.preventDefault();
    try {
      
      const result = await modifyTableByUser({ id: tableId, name: input });
      if (result) {
        
        dispatch(modifyTable(result.data));
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleTitleBlur = () => {
    setIsEditing(false);
  };

  const handleTitleClick = (event) => {
    event.preventDefault();
    setIsEditing(true);
    setInput(names); // Set current name as the input value
  };



  async function handlDeleteTable() {
    try {
      // au click je recupere l'id du tableaupour le delete en bdd
      const result = await deleteTableMutation(tableId);
      if (result) {
        dispatch(removeTable(tableId));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="title" key={index}>
      <Link to={`/decks/${tableId}`}>
        {!isEditing && <h3>{names}</h3>}
      </Link>
      {isEditing ? (
        <form onSubmit={handleTitleSubmit}>
          <input
            value={input}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            autoFocus
          />
          <button type="submit"  className="titles__button__submit">
            <BsPencilFill />
          </button>
        </form>
      ) : (
        <div className="button-container">
          <button className="titles__button" onClick={handleTitleClick}>
            <BsPencilFill />
          </button>
          <button className="titles__button" onClick={handlDeleteTable}>
            <BsFillTrash2Fill />
          </button>
        </div>
      )}
    </div>
  );
      }  

export default React.memo(Titles);
