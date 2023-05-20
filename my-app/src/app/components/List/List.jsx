import React, { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
//import PropTypes from 'prop-types';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { RiAddBoxLine } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
// api
import { useModifyListByTableMutation , useDeleteListByTableMutation } from "../../store/api/api";

import { modifyList ,removeList} from "../../store/reducer/userSlice";

//J'importe mes query;

// import ListModale from './ListModale';

import "./ListStyles.scss";

function List({ id, key, title, position ,tableId}) {
  const dispatch = useDispatch();
 

  const [input, setInput] = useState("");
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
// const api
    const [deleteListByTable] =useDeleteListByTableMutation();
  const [modifyListByTable] =
    useModifyListByTableMutation();

  //modifie la value de l'input
  const handleTitleChange = (e) => {
    setInput(e.target.value);

  };

  // va  passer isEditing a true pour modifier le titre de la liste
  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
  };

  const handleTitleSubmit = async () => {
    setIsEditing(false);
    try {
        
      const result = await modifyListByTable({ id, name: input });
      
      if (result) {
      

        dispatch(modifyList(result.data));
      }
    } catch (error) {
      
    }
  };

  const handleDelete = () => {
    //je recupere l'id pour dele la liste en bdd
    const result = deleteListByTable(id);
    if (result) {
      
    dispatch(removeList({id,tableId}))

    }
 //je suprime la lsite en bdd
  };

  const handleAdd = () => {};

  return (
    <div className="list" key={key} id={id} position={position}>
      <div className="list__header">
        {isEditing ? (
          <form onSubmit={handleTitleSubmit}>
            <input
              className="list__header__title"
              value={input}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              autoFocus
            />
            <button type="submit">
              <FaPen />
            </button>
          </form>
        ) : (
          <h3 className="list__header__title" onClick={handleTitleClick}>
            {title}
          </h3>
        )}
        <div className="utils">
          <button>
            <AiFillEdit onClick={handleTitleClick} style={{ marginRight: "10px" }} />
          </button>
          <button onClick={handleDelete}>
            <AiFillDelete />
          </button>
          
        </div>
      </div>
      {/* {tasks.map((element,index)=> 
       <Card
       key={index}
       name={element.name}
       id={element.id}/>  
       )} */}
    </div>
  );
}
// List.propTypes = {};

// List.defaultProps = {};

export default React.memo(List);
