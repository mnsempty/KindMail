import NavBar from "./components/NavBar";
import NavBarAdmin from "./components/NavBarAdmin";
import NavBarUser from "./components/NavBarUser";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import Chat from "./pages/Chat";
import FirstMessage from "./pages/FirstMessage";
import Profile from "./pages/Profile";
import HomeAdmin from "./pages/Admin/HomeAdmin";
import Messages from "./pages/Admin/Messages";
import User from "./pages/Admin/User";
import ChatAdmin from "./pages/Admin/ChatAdmin";

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

  /*Para ir probando, después esta constante se borrará*/
  const role = "kk";

  return (
    <div className="bg-blanco min-h-screen">

      {getByRole(role)}

      <Layout>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/landing-page" element={<LandingPage></LandingPage>}></Route>
          <Route path="/chat" element={<Chat></Chat>}></Route>
          <Route path="/first-message" element={<FirstMessage></FirstMessage>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          {/* Admin */}
          <Route path="/home-admin" element={<HomeAdmin></HomeAdmin>}></Route>
          <Route path="/messages-admin" element={<Messages></Messages>}></Route>
          <Route path="/user-admin" element={<User></User>}></Route>
          <Route path="/chat-admin" element={<ChatAdmin></ChatAdmin>}></Route>
          {/* Error - resto de url */}
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
        <Toaster />
      </Layout>
    </div>
  )
}

export default App
