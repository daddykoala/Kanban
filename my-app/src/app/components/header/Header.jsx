//import PropTypes from 'prop-types';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useWindowSize } from "../../service/screenSize";
import { openSidebar, closeSidebar } from "../../store/reducer/sidebarSlice";



import Modal from "./Modal";
import AuthModal from "../form/AuthModale";
import "./headerStyles.scss";

function Header() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  // const sidebarIsOpen = useSelector((state) => state.sidebar.isOpen);

  return (
    <header className="header">
      <h1 className="header__title">Trellite</h1>
      {/* Afficher le texte ou l'icône en fonction de la largeur de la fenêtre */}
      {windowWidth < 768 ? (
        <h4 className="header__create">Créer</h4>
      ) : (
        <h4 className="header__create">Créer</h4>
      )}
      <div className="header__login">
        <Modal />
        <AuthModal />
        {width < 768 ? (
          <span onClick={() => dispatch(openSidebar())}>fermer</span>
        ) : null}
      </div>
    </header>
  );
}
//Header.propTypes = {};

//Header.defaultProps = {};

export default React.memo(Header);
