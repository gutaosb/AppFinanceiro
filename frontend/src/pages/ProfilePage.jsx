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

  const navigate = useNavigate();

  /*{
    "name": "fulano",
    "email": "fulano@email.com",
    "id": 6,
    "password": "123"
  } */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {};

      if (name && name !== user.name) {
        payload.name = name;
      }

      if (email && email !== user.email) {
        payload.email = email;
      }

      if (password.trim() !== "") {
        payload.password = password;
      }

      if (Object.keys(payload).length === 0) {
        alert("Nenhuma alteração foi feita.");
        return;
      }

      const response = await api.put(`/users/${user.id}`, payload);
      setUser(response.data); // atualiza contexto
      setPassword(""); // limpa senha

      alert("Perfil atualizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-6">
        <h1 className="text-center text-2xl font-bold mb-4">
          Perfil do Usuário
        </h1>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-gray-500 w-full rounded-lg border px-4 py-2"
              type="text"
              placeholder={user?.name}
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-gray-500 w-full rounded-lg border px-4 py-2"
              type="text"
              placeholder={user?.email}
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-gray-500 w-full rounded-lg border px-4 py-2"
              type="password"
              placeholder="Senha"
            />

            <button
              onSubmit={handleSubmit}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
              type="submit"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
