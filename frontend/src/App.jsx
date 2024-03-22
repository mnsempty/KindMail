import NavBar from "./components/NavBar";
import NavBarAdmin from "./components/NavBarAdmin";
import NavBarUser from "./components/NavBarUser";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { useLocation } from 'react-router-dom';

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import FirstMessage from "./pages/FirstMessage";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import HomeAdmin from "./pages/Admin/HomeAdmin";
import Messages from "./pages/Admin/Messages";
import User from "./pages/Admin/User";
import ChatAdmin from "./pages/Admin/ChatAdmin";

//Si eres usuario te mostrará unos datos y si eres administrador te mostrará otros
// function getByRole(role) {
//   switch (role) {
//     case 'admin':
//       return <NavBarAdmin />;
//     case 'user':
//       return <NavBarUser />;
//     default:
//       return <NavBar />;
//   }
// }


function getNavBar() {
  const { pathname } = location;

  if (pathname === '/login' || pathname === '/register' || pathname === '/landingPage') {
    return <NavBar />;
  } else if (pathname === '/home-admin' || pathname === '/messages-admin' || pathname === '/user-admin' || pathname === '/chat-admin') {
    return <NavBarAdmin />;
  } else if (pathname === '/' || pathname === '/home' || pathname === '/first-message' || pathname === '/profile') {
    return <NavBarUser />;
  } else {
    return <NavBar />;
  }

}

function App() {

  const { authUser } = useAuthContext();
  const location = useLocation();

  return (
    <div className="bg-blanco min-h-screen">

      {/* {getByRole(authUser ? authUser.role : null)} */}
      {getNavBar(location)}

      <Layout>
        <Routes>
          <Route path="/" element={authUser ? <Navigate to={"/landingPage"} /> : <Home />}></Route>
          <Route path="/home" element={authUser ? <Home /> : <Navigate to={"/landingPage"} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/landingPage" element={<LandingPage />}></Route>
          <Route path="/first-message" element={authUser ? <FirstMessage /> : <Navigate to={"/landingPage"} />}></Route>
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to={"/landingPage"} />}></Route>
          {/* Admin */}
          <Route path="/home-admin" element={authUser ? <HomeAdmin /> : <Navigate to={"/landingPage"} />}></Route>
          <Route path="/messages-admin" element={authUser ? <Messages /> : <Navigate to={"/landingPage"} />}></Route>
          <Route path="/user-admin" element={authUser ? <User /> : <Navigate to={"/landingPage"} />}></Route>
          <Route path="/chat-admin" element={authUser ? <ChatAdmin /> : <Navigate to={"/landingPage"} />}></Route>
          {/* Error - resto de url */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Toaster />
      </Layout>
    </div>
  )
}

export default App
