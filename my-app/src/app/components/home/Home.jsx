import React from "react";
import { useSelector } from "react-redux";
import AuthModale from "../form/AuthModale";
import Titles from "../Sidebar/Titles";

import "./homeStyles.scss";

function HomePage() {

  
  const user = useSelector((state) => state.user.user);
  if (!user) {
    return (
      <section className="home-page">
        <div className="welcome-message">
          <h1>Prêt à embarquer</h1>
          <p>Connectez-vous pour commencer à travailler. Enjoy!</p>
          <AuthModale />
          <p>Mettez une flèche</p>
        </div>
      </section>
    );

  }
    return (
      <section className="home-page">
        <div className="welcome-message">
          <h1>Welcome on board, {user.name}!</h1>
          <div className="tableau-container">
            {user.table.map((tableau) => (
              <Titles
                key={tableau.id}
                names={tableau.name}
                tableId={tableau.id}
                userId={tableau.user_id}
              >
                {tableau.name}
              </Titles>
            ))}
          </div>
        </div>
      </section>
    );

  

}

export default HomePage;
