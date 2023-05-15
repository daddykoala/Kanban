import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePostListByUserMutation } from "../../store/api/api";
import { addList } from "../../store/reducer/userSlice";

function CreateCard({ tableId }) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user.user.table.list);
  const [postListbyUser, { data, isSuccess }] = usePostListByUserMutation();
    const [inputValue, setInputValue] = useState("");

  // j'enregistre ma nouvelle liste en bdd
  async function handleSubmit(e) {
    e.preventDefault();
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

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <h3>ajout d'une liste</h3>
        <button>+</button>
      </form>
    </div>
  );
}
// createCard.propTypes = {};

// createCard.defaultProps = {};

export default CreateCard;
