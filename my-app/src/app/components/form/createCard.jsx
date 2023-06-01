import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePostListByUserMutation } from "../../store/api/api";
import { addList } from "../../store/reducer/userSlice";
import { IoMdAddCircleOutline } from "react-icons/io"

import { IoSend } from "react-icons/io5";
import { sanitizedValue } from "../../service/input";

function CreateCard({ tableId }) {
  const dispatch = useDispatch();
  const [Editing, setEditing] = useState(false);

  const [postListbyUser, { data, isSuccess }] = usePostListByUserMutation();
  const [name, setName] = useState("");
  const [inputValue, setInputValue] = useState("");

  //accessibilite au clavier
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isTooltipVisibleSubmit, setIsTooltipVisibleSubmit] = useState(false);

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

        dispatch(addList(data));
      }
      setInputValue("");
    } catch (error) {}
  }
  function opensForm() {
    setEditing(true);
  }
  function closeForm() {
    setEditing(false);
  }
  function handleInputChange(e) {
    setName(sanitizedValue(e.target.value));
    setInputValue(sanitizedValue(e.target.value));
  }

  return (
    <div>
      {Editing ? (
        <div>
          <form className="create__card" onSubmit={handleSubmit}>
            <button
              type="submit"
              onClick={closeForm}
              // accessibilté au clavier
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
              onFocus={() => setIsTooltipVisible(true)}
              onBlur={() => setIsTooltipVisible(false)}
              aria-label="fermer le formulaire"
            >
              <IoMdAddCircleOutline
                className={`create__card__button ${Editing ? "rotate" : ""}`}
              />
              {/* // accessibilté au clavier */}
              {isTooltipVisible && (
                <span className="tooltip">fermer le formulaire</span>
              )}
            </button>
            <div className="input__anim">
              <input
                className="create__card__input maj"
                type="text"
                placeholder="ajouter une liste"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                className="create__card__button__input maj"
                onClick={closeForm}
                //accessibilté au clavier
                onMouseEnter={() => setIsTooltipVisibleSubmit(true)}
                onMouseLeave={() => setIsTooltipVisibleSubmit(false)}
                onFocus={() => setIsTooltipVisibleSubmit(true)}
                onBlur={() => setIsTooltipVisibleSubmit(false)}
                aria-label="soumettre"
              >
                <IoSend />
                {isTooltipVisibleSubmit && (
                <span className="tooltip">soumettre le formulaire</span>
              )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={opensForm}
          // accessibilté au clavier
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
          onFocus={() => setIsTooltipVisible(true)}
          onBlur={() => setIsTooltipVisible(false)}
          aria-label="modifier une liste"
        >
          {/* <IoMdAddCircleOutline className="create__card__button" /> */}
          {/* // accessibilté au clavier */}
          {isTooltipVisible && (
            <span className="tooltip">créer votre liste</span>
          )}
        </button>
      )}
    </div>
  );
}

// createCard.propTypes = {};

// createCard.defaultProps = {};

export default CreateCard;
