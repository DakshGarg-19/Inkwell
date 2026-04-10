import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Login, New, Blogs, Register, Dashboard, NewBlog } from "./pages/index";
import { Nav } from "./components/Nav";
import { ToastContainer } from "react-toastify";
import { BlogProvider } from "./context/BlogContext";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [authData, setAuthData] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      try {
        setAuthData(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  return (
    <BlogProvider>
      <BrowserRouter>
        <div className="min-h-screen w-full flex flex-col bg-base-200 text-base-content transition-colors duration-300">
          <ToastContainer theme="dark" position="top-right" autoClose={3000} />
          <Nav authData={authData} setAuthData={setAuthData} />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/new" element={<NewBlog />} />
              <Route path="/dashboard/edit/:id" element={<NewBlog />} />
              <Route path="/blog/:id" element={<Blogs />} />
              <Route path="/blogs" element={<Blogs />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </BlogProvider>
  );
}

export default App;
