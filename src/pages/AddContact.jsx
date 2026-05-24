import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../AppContext";

export const AddContact = () => {
    const { dispatch } = useContext(Context);
    const navigate = useNavigate();
    const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });

    // --- AQUÍ ES DONDE ESTÁ Y SE DEFINE EL HANDLESAVE ---
    const handleSave = () => {
    const URL_BASE = "https://playground.4geeks.com/contact/agendas/frank_padilla";
    
    // Primero, intentamos guardar el contacto
    fetch(`${URL_BASE}/contacts`, {
        method: "POST",
        body: JSON.stringify(contact),
        headers: { "Content-Type": "application/json" }
    })
    .then(async (res) => {
        // Si la agenda no existe (404), intentamos crearla
        if (res.status === 404) {
            console.log("Agenda no encontrada, intentando crearla...");
            
            const createAgenda = await fetch(URL_BASE, { method: "POST" });
            
            if (createAgenda.ok) {
                // Una vez creada, re-intentamos guardar el contacto
                return fetch(`${URL_BASE}/contacts`, {
                    method: "POST",
                    body: JSON.stringify(contact),
                    headers: { "Content-Type": "application/json" }
                }).then(r => r.json());
            }
        }
        return res.json();
    })
    .then(data => {
        console.log("Contacto guardado con éxito:", data);
        dispatch({ type: 'add_contact', payload: data });
        navigate("/");
    })
    .catch(err => console.error("Error crítico:", err));
};
    // -----------------------------------------------------

    return (
        <div className="container mt-5">
            <h1 className="text-center">Add a new contact</h1>
            <input className="form-control mb-2" placeholder="Full Name" onChange={e => setContact({...contact, name: e.target.value})} />
            <input className="form-control mb-2" placeholder="Email" onChange={e => setContact({...contact, email: e.target.value})} />
            <input className="form-control mb-2" placeholder="Phone" onChange={e => setContact({...contact, phone: e.target.value})} />
            <input className="form-control mb-2" placeholder="Address" onChange={e => setContact({...contact, address: e.target.value})} />
            
            {/* Aquí conectamos el botón con la función */}
            <button className="btn btn-primary w-100" onClick={handleSave}>Save</button>
            
            <Link to="/">or get back to contacts</Link>
        </div>
    );
};