//import PropTypes from 'prop-types';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useAddTableByUserMutation } from "../../store/api/api";

import "./modalStyles.scss";

function Modal() {
  const [modal, setModal] = useState(false);
  const [stateInput, setStateInput] = useState();

  const user_id = useSelector((state) => state.user.user);
  
  
  const dispatch = useDispatch();
  const [addTableMutation] = useAddTableByUserMutation();

  const addTableau = (e) => {
    // au click j'ajoute un tableau a mon user
    e.preventDefault();
    //je log l'objet que je vais envoyer
    dispatch(addTableMutation({name:stateInput, user_id: user_id.id }));
    setStateInput("");
  };

  const linkedinput = (e) => {
    setStateInput(e);
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <button onClick={toggleModal} className="btn-modal">
        Créer
      </button>

      {modal && (
        <div className="overlay">
          <div className="modal">
            <div className="modal__content">
              <form action="submit">
                <p>créer votre tableau</p>
                <button onClick={toggleModal} className="close__modal">
                  x
                </button>
                <input
                  onChange={(e) => linkedinput(e.target.value)}
                  type="text"
                  placeholder="mon tableau ici"
                  
                  value={stateInput}
                />
                <button type="submit" onClick={addTableau}>
                  ok
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
//Modal.propTypes = {};

//Modal.defaultProps = {};

export default React.memo(Modal);
