//import PropTypes from 'prop-types';
import React , {useState,useEffect} from 'react';

//icon
import {GoDiffAdded} from 'react-icons/go';


import Modal from './Modal'
import './headerStyles.scss';

function Header() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
return (
    
        <header className='header'>
          <h1 className='header__title'>Trellite</h1>
          {/* Afficher le texte ou l'icône en fonction de la largeur de la fenêtre */}
          {windowWidth < 768 ? (
            <h4 className='header__create'><GoDiffAdded/></h4>
          ) : (
            <h4 className='header__create'>nouveau tableau</h4>
          )}
          <div className='header__login'>
            <Modal/>
          </div>
        </header>
      );
}
//Header.propTypes = {};

//Header.defaultProps = {};

export default React.memo(Header);


   