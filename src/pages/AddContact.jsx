import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../AppContext";

export const AddContact = () => {
    const { store, dispatch } = useContext(Context);
    const navigate = useNavigate();
    const { theId } = useParams();
    const isEdit = Boolean(theId);
    const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });

    // Cargar datos si es edición
    useEffect(() => {
        if (isEdit && store.contacts && store.contacts.length > 0) {
            const found = store.contacts.find(c => String(c.id) === String(theId));
            if (found) {
                setContact({
                    name: found.name || found.full_name || "",
                    email: found.email || "",
                    phone: found.phone || "",
                    address: found.address || "",
                    id: found.id
                });
            }
        }
    }, [isEdit, theId, store.contacts]);

    const handleSave = () => {
        const URL_BASE = "https://playground.4geeks.com/contact/agendas/frank_padilla";
        if (isEdit) {
            // Actualizar contacto existente
            fetch(`${URL_BASE}/contacts/${theId}`, {
                method: "PUT",
                body: JSON.stringify(contact),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'update_contact', payload: data });
                navigate("/");
            })
            .catch(err => console.error("Error al actualizar:", err));
        } else {
            // Crear contacto nuevo
            fetch(`${URL_BASE}/contacts`, {
                method: "POST",
                body: JSON.stringify(contact),
                headers: { "Content-Type": "application/json" }
            })
            .then(async (res) => {
                if (res.status === 404) {
                    await fetch(URL_BASE, { method: "POST" });
                    return fetch(`${URL_BASE}/contacts`, {
                        method: "POST",
                        body: JSON.stringify(contact),
                        headers: { "Content-Type": "application/json" }
                    }).then(r => r.json());
                }
                return res.json();
            })
            .then(data => {
                dispatch({ type: 'add_contact', payload: data });
                navigate("/");
            })
            .catch(err => console.error("Error crítico:", err));
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">{isEdit ? "Edit contact" : "Add a new contact"}</h1>
            <input className="form-control mb-2" placeholder="Full Name" value={contact.name} onChange={e => setContact({...contact, name: e.target.value})} />
            <input className="form-control mb-2" placeholder="Email" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} />
            <input className="form-control mb-2" placeholder="Phone" value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})} />
            <input className="form-control mb-2" placeholder="Address" value={contact.address} onChange={e => setContact({...contact, address: e.target.value})} />
            <button className="btn btn-primary w-100" onClick={handleSave}>{isEdit ? "Update" : "Save"}</button>
            <Link to="/">or get back to contacts</Link>
        </div>
    );
};