//import PropTypes from 'prop-types';
import React, { useState } from "react";

import "./modalStyles.scss";

function Modal() {
  const [modal, setModal] = useState(false);

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
              <p>créer votre tableau</p>
              <button onClick={toggleModal} className="close__modal">
                x
              </button>
              <input type="text" placeholder="mon tableau ici" />
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
