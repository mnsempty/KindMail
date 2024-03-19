import NavBar from "./components/NavBar";
import Layout from "./components/Layout";
import {Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <div className="bg-blanco min-h-screen">
      <NavBar></NavBar>
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
            {/* Error - resto de url */}
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
      </Layout>
    </div>
  )
}

export default App
