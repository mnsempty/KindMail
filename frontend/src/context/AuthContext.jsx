import { createContext, useContext, useState } from "react";

//Autentificación
export const AuthContext = createContext();

//Para acceder al contxto de autentificación en cualquier componente de la app
export const useAuthContext = () => {
    return useContext(AuthContext);
}

//Se mantiene al usuario autenticado
export const AuthContextProvider = ({ children }) => {

    //Se intenta recuperar el usuario autenticado y sino se convierte en null
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

    return <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
    </AuthContext.Provider>
}