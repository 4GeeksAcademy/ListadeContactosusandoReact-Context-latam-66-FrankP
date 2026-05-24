import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../AppContext";
import { ContactCard } from "../components/ContactCard"; // Tu componente visual

export const Home = () => {
    const { store, dispatch } = useContext(Context);

    // Cargar contactos al entrar a la página
    useEffect(() => {
    fetch("https://playground.4geeks.com/contact/agendas/frank_padilla/contacts")
        .then(res => res.json())
        .then(data => {
            // Verifica si data.contacts existe, si no, usa data directamente
            dispatch({ type: 'set_contacts', payload: data.contacts || [] });
        });
    }, []); // Los corchetes vacíos aseguran que cargue al abrir la página

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/add-contact" className="btn btn-success">Add new contact</Link>
            </div>
            
            <div className="list-group">
                {/* Aquí renderizamos cada tarjeta */}
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contact) => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))
                ) : (
                    <p className="text-center mt-5">Aún no tienes contactos, ¡agrega uno!</p>
                )}
            </div>
        </div>
    );
};