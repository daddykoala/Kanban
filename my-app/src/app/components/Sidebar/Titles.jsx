import { Link ,useNavigate,NavLink} from "react-router-dom";
import {
  useDeleteTableByUserMutation,
  useModifyTableByUserMutation,
} from "../../store/api/api";
import { removeTable ,modifyTable} from "../../store/reducer/userSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState,useEffect } from "react";

// import { BsFillTrash2Fill, BsPencilFill } from "react-icons/bs";
import { ReactComponent as TrashIcon } from "../../../ressources/garbage.svg";
import { ReactComponent as PencilIcon } from "../../../ressources/pen.svg";

//gestion de la fermeture du menu
import { closeSidebar } from "../../store/reducer/sidebarSlice";

function Titles({ names, index, className, tableId, userId }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteTableMutation] = useDeleteTableByUserMutation();
  const [modifyTableByUser] = useModifyTableByUserMutation()

  //modifcation du nom de tableau
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState("");

  //gestion du isactive sur le lien 
  const [linkIsActive, setLinkIsActive] = useState(false);
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

const handlecloseSidebar = () => {
    dispatch(closeSidebar());
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
    <div className={`title ${linkIsActive ? "active": ""}`} key={index}>
      {!isEditing && names ? (
        <div className="title__link ">

      <NavLink to={`/decks/${tableId}`} onClick={handlecloseSidebar}
      exact={true}
      className={({ isActive }) => (isActive ? setLinkIsActive(true) : setLinkIsActive(false))}>
        <h3>{names}</h3>
      </NavLink>
      <div className="button-container">
      <button className="titles__button" onClick={handleTitleClick}>
      <img
              src={require("../../../ressources/pen.png")}
              alt="Pencil Icon"
            />
      </button>
      <button className="titles__button" onClick={handlDeleteTable}>
      <img
                src={require("../../../ressources/garbage.png")}
                alt="Trash Icon"
              />
      </button>
        </div>
    </div>)
      : (
        <form className="title__editing"onSubmit={handleTitleSubmit}>
          <input
            value={input}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            autoFocus
          />
          <button type="submit"  className="titles__button__submit">
          <img
              src={require("../../../ressources/pen.png")}
              alt="Pencil Icon"
            />
          </button>
        </form>
      ) }
    </div>
  );
      }  

export default React.memo(Titles);
