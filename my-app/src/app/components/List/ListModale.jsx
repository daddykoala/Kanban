//import PropTypes from 'prop-types';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "./ListModaleStyles.scss";

function ListModal() {

  const [modal, setModal] = useState(false);
  const [tableauxArr, setTableauxArr] = useState(
    useSelector((state) => state.tableau.tableauName)
  );

  const [stateInput, setStateInput] = useState();
  const dispatch = useDispatch()


  const addTask = (e) => {
    
    e.preventDefault();
    const newArr = [...tableauxArr];
    const newTableau = {};
    const newList=
            {
              id:newArr.lists.lenght + 1 ,
              name: stateInput,
              task: [],
            }
    
    // newTableau.id = newArr.lenght+1;


    newArr.lists.push(newList);
    setTableauxArr(newArr);
    setStateInput('')
    dispatch({
      type: "ADDTASK",
      payload:tableauxArr
    })
    
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

              <p>créer votre liste</p>
              <button onClick={toggleModal} className="close__modal">
                x
              </button>
              <input
                onChange={(e) => linkedinput(e.target.value)}
                type="text"
                placeholder="ma liste ici"
                value={stateInput}
              />
<button type="submit" onClick={addTask}>ok</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
//ListModal.propTypes = {};

//ListModal.defaultProps = {};

export default React.memo(ListModal);