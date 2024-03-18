import NavBar from "./components/NavBar";
import Layout from "./components/Layout";
import {Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="bg-blanco min-h-screen">
      <NavBar></NavBar>
      <Layout>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
      </Layout>
    </div>
  )
}

export default App
