//import PropTypes from 'prop-types';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useAddTableByUserMutation } from "../../store/api/api";
import { addTable } from "../../store/reducer/userSlice";

import { GoDiffAdded } from "react-icons/go";
import {IoSend} from "react-icons/io5"

import "./modalStyles.scss";

function Modal() {
  const [modal, setModal] = useState(false);
  const [stateInput, setStateInput] = useState();

  const user_id = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const [addTableMutation] = useAddTableByUserMutation();

  const addTableau = async (e) => {
    e.preventDefault();
    try {
      const result = await addTableMutation({
        name: stateInput,
        userId: user_id.id,
      });
      dispatch(addTable(result.data));
      handlemodale();
      setStateInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const linkedinput = (e) => {
    setStateInput(e);
  };
  const handlemodale = () => {
    setModal(!modal);
  };

  return (
    <div className="table__modal">
      <button onClick={handlemodale} className={`btn-modal btn-modal-créer ${modal ? "rotate" : ""}`}>
        <GoDiffAdded />
      </button>
      {modal ? (
      <form className={`table__modal__content__form ${modal ? "open" : ""}`}
      type="submit">
        <input
          className="table__modal__content__input"
          onChange={(e) => linkedinput(e.target.value)}
          type="text"
          // placeholder="mon tableau ici"
          value={stateInput}
        />
        <button
          className="modal__content__button"
          type="submit"
          onClick={addTableau}
        >
          <IoSend/>
        </button>
      </form>) : null
        
      }
    </div>
  );
}
//Modal.propTypes = {};

//Modal.defaultProps = {};

export default React.memo(Modal);
