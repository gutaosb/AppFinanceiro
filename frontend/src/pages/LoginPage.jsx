import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import api from "../api/api";
import { useUserContext } from "../contexts/UserContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const { data } = await api.post("/users/login", {
          email,
          password,
        });
        setUser(data);
        setRedirect(true);
      } catch (error) {
        alert(error.response.data.detail || "Erro ao fazer login.");
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mx-auto flex w-full max-w-96 flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-green-700">Faça seu Login</h1>

        <form
          className="flex w-full flex-col gap-2"
          action=""
          onSubmit={handleSubmit}
        >
          <input
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-green-700 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 font-bold text-white">
            Login
          </button>
        </form>

        <p>
          Ainda nao tem uma conta?
          <a href="/register" className="font-semibold underline">
            Registre-se aqui!
          </a>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
