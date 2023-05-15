import React, { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
//import PropTypes from 'prop-types';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { RiAddBoxLine } from "react-icons/ri";
import { FaPen } from "react-icons/fa";

import { useModifyListByTableMutation } from "../../store/api/api";
import { modifyList } from "../../store/reducer/userSlice";

//J'importe mes query;

// import ListModale from './ListModale';

import "./ListStyles.scss";

function List({ id, key, title, position }) {
  const dispatch = useDispatch();
  

  const [input, setInput] = useState("");
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [modifyListByTable, { data, isSuccess }] =
    useModifyListByTableMutation();

  //modifie la value de l'input
  const handleTitleChange = (e) => {
    setInput(e.target.value);
    console.log(input);
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
    console.log("je passe is editing a false ");
    try {
        console.log("id", id);
        
      const result = await modifyListByTable({ id, name: input });
      console.log("result", result.data);
      if (result) {
        console.log("j'ai eu mon result et je rentre dans la condition", typeof id);

        dispatch(modifyList({ table_id: result.data.table_id }));
        //si ok je modifie le titre de la liste
        //je modifi le state
        //j'apelle mon api ici
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {};

  const handleAdd = () => {};

  return (
    <div className="list" key={key} id={id} position={position}>
      <div className="list__header">
        {isEditing ? (
          <form onClick={handleTitleSubmit}>
            <input
              className="list__header__title"
              value={input}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              autoFocus
            />
            <button>
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
            <AiFillEdit style={{ marginRight: "10px" }} />
          </button>
          <button>
            <AiFillDelete />
          </button>
          <button>
            <RiAddBoxLine />
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
