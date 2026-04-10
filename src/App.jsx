import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Login, New, Blogs, Register } from "./pages/index";
import { Nav } from "./components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [authData, setAuthData] = useState(
    localStorage.getItem("loggedInUser"),
  );

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setAuthData(user);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen w-full flex flex-col">
        <ToastContainer theme="dark" position="top-right" autoClose={3000} />
        <Nav authData={authData} setAuthData={setAuthData} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new" element={<New />} />
            <Route path="/blog/:id" element={<Blogs />} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
