import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import api from "../api/api";
import { useUserContext } from "../contexts/UserContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/users/login", { email, password });
      setUser(data);
      setRedirect(true);
    } catch (error) {
      alert(error.response?.data?.detail || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <section className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md">
        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-10">
          {/* Header do Formulário */}
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Bem-vindo
            </h1>
            <p className="text-slate-500 mt-2">
              Acesse sua conta para continuar
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Campo de Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                E-mail
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-400"
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Campo de Senha */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Senha
                </label>
              </div>
              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-400"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Botão de Login */}
            <button
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-emerald-100 transition-all active:scale-[0.98] mt-2"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Footer do Card */}
          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-slate-600 text-sm">
              Ainda não tem uma conta?{" "}
              <Link
                to="/register"
                className="font-bold text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                Registre-se aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
