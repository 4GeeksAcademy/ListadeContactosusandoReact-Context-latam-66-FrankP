export const initialStore = () => {
    return {
        contacts: []
    };
};

export default function storeReducer(store, action = {}) {
    switch (action.type) {
        case 'set_contacts':
            return { ...store, contacts: action.payload };
        case 'add_contact':
            return { ...store, contacts: [...store.contacts, action.payload] };
        case 'delete_contact':
            // Coerce both sides to string to avoid mismatches between number/string ids
            return { ...store, contacts: store.contacts.filter(c => String(c.id) !== String(action.payload)) };
        default:
            return store;
    }
}