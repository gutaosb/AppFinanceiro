import React from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
