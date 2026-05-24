// Import necessary hooks and components
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom"; 
import PropTypes from "prop-types"; 
import { Context } from "../AppContext";


// Define the Single component
export const Single = props => {
  // Acceso al estado global mediante el hook
  const { store } = useContext(Context);

  // Obtener el ID de la URL
  const { theId } = useParams();
  
  // Buscamos el contacto o tarea específico
  // Aseguramos que 'store.contacts' o 'store.todos' exista dependiendo de lo que estés usando
  const item = store.contacts ? store.contacts.find(item => item.id === parseInt(theId)) : null;

  return (
    <div className="container text-center">
      <h1 className="display-4">Detalle: {item?.name || item?.title || "Cargando..."}</h1>
      <hr className="my-4" /> 

      <Link to="/">
        <span className="btn btn-primary btn-lg" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};

// PropTypes para validación
Single.propTypes = {
  match: PropTypes.object
};