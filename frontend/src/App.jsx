import NavBar from "./components/NavBar";
import NavBarAdmin from "./components/NavBarAdmin";
import NavBarUser from "./components/NavBarUser";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { jwtDecode } from 'jwt-decode';

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import FirstMessage from "./pages/FirstMessage";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import User from "./pages/Admin/User";
import Inbox from "./pages/Inbox";

//Si eres usuario te mostrará unos datos y si eres administrador te mostrará otros
function getByRole(role) {
  switch (role) {
    case 'admin':
      return <NavBarAdmin />;
    case 'user':
      return <NavBarUser />;
    default:
      return <NavBar />;
  }
}


function App() {

  const { authUser } = useAuthContext();

  let userRole = null;
  // Decodificar el token JWT para obtener el rol del usuario
  if (authUser && authUser.token) {
    const decodedToken = jwtDecode(authUser.token);
    userRole = decodedToken.userData.role;
  }

  return (
    <div className="bg-blanco min-h-screen">

      {getByRole(userRole)}

      <Layout>
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to={"/landingPage"} />}></Route>
          <Route path="/home" element={authUser ? <Home /> : <Navigate to={"/landingPage"} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/landingPage" element={<LandingPage />}></Route>
          <Route path="/first-message" element={authUser ? <FirstMessage /> : <Navigate to={"/landingPage"} />}></Route>
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to={"/landingPage"} />}></Route>
          <Route path="/inbox" element={authUser ? <Inbox /> : <Navigate to={"/landingPage"} />}></Route>
          {/* Admin */}
          <Route path="/user-admin" element={authUser ? <User /> : <Navigate to={"/landingPage"} />}></Route>
          {/* Error - resto de url */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Toaster />
      </Layout>
    </div>
  )
}

export default App
