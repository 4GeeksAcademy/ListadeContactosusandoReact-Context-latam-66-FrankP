import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import { RouterProvider } from "react-router-dom"; 
import { router } from "./routes"; 
import { AppContext } from "./AppContext"; // Importación correcta desde src/

const Main = () => {
    return (
        <React.StrictMode>
            <AppContext>
                <RouterProvider router={router} />
            </AppContext>
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);