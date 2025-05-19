import { Navigate } from "react-router-dom";
import React from "react";

const PrivateRoute = ({ children }) => {
  const isValidCookie = async () => {

    const cookies = document.cookie.split("; ");
    const authCookie = cookies.find((row) => row.startsWith("auth="));

    if (!authCookie) return false;

    const base64Value = authCookie.split("=")[1];
    try {
      return await validateCookieWithServer(base64Value);
    } catch {
      return false;
    }
  };

  const validateCookieWithServer = async (auth) => {
    try {
      const response = await fetch("https://api.mochalesdev.com/verify?auth=" + auth, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        return data.error === "Unauthorized" ? false : true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error al validar cookie con el servidor:", error);
      return false;
    }
  };

  // Redirige a /login si la cookie no es válida
  const [isValid, setIsValid] = React.useState(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      const result = await isValidCookie();
      setIsValid(result);
    };
    checkAuth();
  });

  if (isValid === null) return <div>Cargando...</div>; // Puedes mostrar un loader mientras se verifica

  return isValid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;