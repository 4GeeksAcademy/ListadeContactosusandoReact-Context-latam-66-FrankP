import { useReducer } from 'react';
import storeReducer, { initialStore } from '../store'; // Asegúrate que esta ruta llegue a tu store.js

export const useGlobalReducer = () => {
    const [store, dispatch] = useReducer(storeReducer, initialStore());
    return { store, dispatch };
};