//import PropTypes from 'prop-types';
import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./modalStyles.scss";

function Modal() {
  const [modal, setModal] = useState(false);
  const [tableauxArr, setTableauxArr] = useState(
    useSelector((state) => state.tableau.tableauName)
  );
  const [stateInput, setStateInput] = useState();
  console.log(tableauxArr, stateInput, "header");

  const addTableau = (e) => {
    e.preventDefault();
    const newArr = [...tableauxArr];
    const newTableau = {};
    newTableau.name = stateInput;
    // newTableau.id = newArr.lenght+1;

    newArr.push(newTableau);
    setTableauxArr(newArr);
    setStateInput('')
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
<button type="submit" onSubmit={addTableau}></button>
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
