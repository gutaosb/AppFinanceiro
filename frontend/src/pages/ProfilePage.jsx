import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import api from "../api/api";

export default function ProfilePage() {
  const { user, setUser } = useUserContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Função para deslogar
  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {};
      if (name && name !== user.name) payload.name = name;
      if (email && email !== user.email) payload.email = email;
      if (password.trim() !== "") payload.password = password;

      if (Object.keys(payload).length === 0) {
        alert("Nenhuma alteração foi feita.");
        setLoading(false);
        return;
      }

      const response = await api.put(`/users/${user.id}`, payload);
      setUser(response.data);
      setPassword("");
      alert("Perfil atualizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-2xl mx-auto pt-12 px-4 pb-20">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Configurações de Perfil
            </h1>
            <p className="mt-2 text-slate-600">
              Gerencie suas informações pessoais.
            </p>
          </div>

          {/* Botão de Logout Moderno */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sair da conta
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo Nome */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nome Completo
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 bg-white text-slate-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none placeholder:text-slate-400"
                  type="text"
                  placeholder={user?.name || "Seu nome"}
                />
              </div>

              {/* Campo Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  E-mail
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 bg-white text-slate-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none placeholder:text-slate-400"
                  type="email"
                  placeholder={user?.email || "seu@email.com"}
                />
              </div>

              {/* Campo Senha */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nova Senha
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 bg-white text-slate-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none placeholder:text-slate-400"
                  type="password"
                  placeholder="Deixe em branco para manter a atual"
                />
              </div>

              <div className="pt-4 flex items-center justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  disabled={loading}
                  className="px-8 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-semibold rounded-xl shadow-md shadow-green-200 transition-all active:scale-95"
                  type="submit"
                >
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
            <span className="italic">ID da conta: #{user?.id}</span>
            <span className="font-medium text-slate-400">Versão 1.0.2</span>
          </div>
        </div>
      </main>
    </div>
  );
}
