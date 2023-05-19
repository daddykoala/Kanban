import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePostListByUserMutation } from "../../store/api/api";
import { addList } from "../../store/reducer/userSlice";
import{IoMdAddCircleOutline} from "react-icons/io"
import {IoSend} from "react-icons/io5"

function CreateCard({ tableId }) {
  const dispatch = useDispatch();
  const [Editing, setEditing] = useState(false);

  const [postListbyUser, { data, isSuccess }] = usePostListByUserMutation();
  const [name, setName] = useState("");
    const [inputValue, setInputValue] = useState("");

  // j'enregistre ma nouvelle liste en bdd
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("tableId", tableId);
    try {
      await postListbyUser({
        name: inputValue,
        tableId: tableId,
      });
      if (isSuccess && data) {
        //je dispatch mon action
        console.log("data", data);
        dispatch(addList(data));
        
      }
      setInputValue("");
    } catch (error) {
      console.log(error);


    }
  }
  function opensForm() {
    setEditing(true);
  }
  function closeForm() {
    setEditing(false);
  }
  function handleInputChange(e) {
    console.log(Editing);
    console.log(name,inputValue);
    setName(e.target.value);
    setInputValue(e.target.value);
  }

  return (
    <div>
      {Editing ? (
        <div >
        <form className="create__card" onSubmit={handleSubmit}>
  <button type="submit" onClick={opensForm}>
    <IoMdAddCircleOutline className={`create__card__button ${Editing ? "rotate" : ""}`} />
  </button>
  <div className="input__anim">
    <input className="create__card__input maj" type="text" value={inputValue} onChange={handleInputChange} />
    <button className="create__card__button__input maj" onClick={closeForm}><IoSend /></button>
  </div>
</form>
    
        </div>
      ) : (
        <button onClick={opensForm}>
          <IoMdAddCircleOutline className="create__card__button"/>
        </button>
      )}
    </div>
  );
}

// createCard.propTypes = {};

// createCard.defaultProps = {};

export default CreateCard;
