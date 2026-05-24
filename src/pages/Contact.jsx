import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { ContactCard } from "../components/ContactCard";

export const Contacts = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadContacts();
    }, []);

    return (
        <div className="container">
            {store.contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
            ))}
        </div>
    );
};