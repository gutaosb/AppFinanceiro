import React, { useState } from "react";
import api from "../api/api";
import { Navigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email && password) {
      try {
        await api.post("/users", { name, email, password });
        setRedirect(true);
      } catch (error) {
        alert(error.response.data.detail || "Erro ao fazer login.");
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mx-auto flex w-full max-w-96 flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-green-700">Registre-se aqui!</h1>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-2"
          action=""
        >
          <input
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
          />

          <input
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />

          <input
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />

          <button className="bg-green-700 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 font-bold text-white">
            Registrar
          </button>
        </form>
      </div>
    </section>
  );
}

export default RegisterPage;
