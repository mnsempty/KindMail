import NavBar from "./components/NavBar";
import NavBarAdmin from "./components/NavBarAdmin";
import NavBarUser from "./components/NavBarUser";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import FirstMessage from "./pages/FirstMessage";
import Profile from "./pages/Profile";
import HomeAdmin from "./pages/Admin/HomeAdmin";
import Messages from "./pages/Admin/Messages";
import User from "./pages/Admin/User";
import ChatAdmin from "./pages/Admin/ChatAdmin";
import { useAuthContext } from "./context/AuthContext";

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

  return (
    <div className="bg-blanco min-h-screen">

      {getByRole(authUser ? authUser.role : null)}

      <Layout>
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/login" element={authUser ? <Navigate to="/chat" /> : <Login />}></Route>
          <Route path="/register" element={authUser ? <Navigate to="/chat" /> : <Register />}></Route>
          <Route path="/first-message" element={<FirstMessage />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          {/* Admin */}
          <Route path="/home-admin" element={<HomeAdmin />}></Route>
          <Route path="/messages-admin" element={<Messages />}></Route>
          <Route path="/user-admin" element={<User />}></Route>
          <Route path="/chat-admin" element={<ChatAdmin />}></Route>
          {/* Error - resto de url */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Toaster />
      </Layout>
    </div>
  )
}

export default App
