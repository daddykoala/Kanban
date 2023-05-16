//import PropTypes from 'prop-types';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useAddTableByUserMutation } from "../../store/api/api";
import { addTable } from "../../store/reducer/userSlice";

import {GoDiffAdded} from 'react-icons/go';

import "./modalStyles.scss";

function Modal() {
  const [modal, setModal] = useState(false);
  const [stateInput, setStateInput] = useState();

  const user_id = useSelector((state) => state.user.user)
  
  
  const dispatch = useDispatch();
  
  const [addTableMutation] = useAddTableByUserMutation();

  
  const addTableau = async (e) => {
    e.preventDefault();   
    try {
      const result = await addTableMutation({ name: stateInput, userId: user_id.id });
      dispatch(addTable(result.data))
      setStateInput("");
    }
    catch (error){
      console.error(error)
    }
  };

  const linkedinput = (e) => {
    setStateInput(e);
  };
  const handlemodale = () => {
    setModal(!modal);
  };

  return (
    <div>
      <button onClick={handlemodale} className="btn-modal">
      <GoDiffAdded/>
      </button>

      <div className={`overlay ${modal ? 'open' : ''}`}>
        
            <div className="modal__content">
              <form className="modal__content__form" action="submit">
                <p className="modal__content__title">créer votre tableau</p>
                <span onClick={handlemodale} className="close__modal">
                  x
                </span>
                <div className="modal__content__submit">
                <input className="modal__content__input"
                  onChange={(e) => linkedinput(e.target.value)}
                  type="text"
                  placeholder="mon tableau ici"
                  value={stateInput}
                />
                <button className="modal__content__button" type="submit" onClick={addTableau}>
                  ok
                </button>

                </div>
              </form>
            </div>
          
        </div>
    </div>
  );
}
//Modal.propTypes = {};

//Modal.defaultProps = {};

export default React.memo(Modal);
