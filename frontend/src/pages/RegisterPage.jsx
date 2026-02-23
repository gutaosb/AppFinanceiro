import React, { useState } from "react";
import api from "../api/api";
import { Navigate, Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email && password) {
      setLoading(true);
      try {
        await api.post("/users", { name, email, password });
        alert("Conta criada com sucesso!");
        setRedirect(true);
      } catch (error) {
        alert(error.response?.data?.detail || "Erro ao criar conta.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-10">
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Criar Conta
            </h1>
            <p className="text-slate-500 mt-2">Junte-se a nós e comece agora</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Nome */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Nome Completo
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-400"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como deseja ser chamado?"
              />
            </div>

            {/* Campo Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                E-mail
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-400"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Senha
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-400"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {/* Botão Registrar */}
            <button
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-emerald-100 transition-all active:scale-[0.98] mt-2"
            >
              {loading ? "Criando conta..." : "Registrar"}
            </button>
          </form>

          {/* Link para Login */}
          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-slate-600 text-sm">
              Já possui uma conta?{" "}
              <Link
                to="/login"
                className="font-bold text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                Faça login aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
