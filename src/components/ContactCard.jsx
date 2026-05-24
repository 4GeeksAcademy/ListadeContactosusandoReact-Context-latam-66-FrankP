import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../AppContext"; // Importa el contexto

export const ContactCard = ({ contact }) => {
    // Accedemos al dispatch a través del Contexto global
    const { dispatch } = useContext(Context);

    const deleteContact = async (id) => {
        if (!window.confirm(`¿Seguro que quieres borrar a ${contact.full_name || contact.name}?`)) return;

        const url = `https://playground.4geeks.com/contact/agendas/frank_padilla/contacts/${id}`;
        
        try {
            const response = await fetch(url, { method: "DELETE" });

            if (response.ok) {
                // Actualiza el estado central y refresca la lista
                dispatch({ type: "delete_contact", payload: id });
            } else {
                alert("Error al borrar en el servidor.");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    const avatar = contact.photo || contact.image || "/src/assets/img/rigo-baby.jpg";

    return (
        <div className="card mb-3 p-3">
            <div className="row g-0 align-items-center">
                <div className="col-auto">
                    <img
                        src={avatar}
                        alt={contact.full_name || contact.name}
                        className="rounded-circle"
                        style={{ width: 96, height: 96, objectFit: 'cover' }}
                    />
                </div>
                <div className="col px-3">
                    <h5 className="mb-2">{contact.full_name || contact.name}</h5>
                    <p className="mb-1 text-secondary"><i className="fas fa-map-marker-alt me-2"></i>{contact.address || contact.location || '—'}</p>
                    <p className="mb-1 text-secondary"><i className="fas fa-phone me-2"></i>{contact.phone || contact.phone_number || '—'}</p>
                    <p className="mb-0 text-secondary"><i className="fas fa-envelope me-2"></i>{contact.email || '—'}</p>
                </div>
                <div className="col-auto text-end">
                    <Link to={`/edit-contact/${contact.id}`} className="btn btn-link text-dark p-2" title="Editar">
                        <i className="fas fa-pencil-alt"></i>
                    </Link>
                    <button className="btn btn-link text-danger p-2" title="Borrar" onClick={() => deleteContact(contact.id)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};