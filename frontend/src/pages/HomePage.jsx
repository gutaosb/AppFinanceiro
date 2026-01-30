import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import Header from "../components/Header";
import DepositModal from "../components/DepositModal";
import ExpenseModal from "../components/ExpenseModal.jsx";
import EditTransactionModal from "../components/EditTransactionModal";
import Transactions from "../components/Transactions.jsx";
import api from "../api/api";

export default function HomePage() {
  const { user } = useUserContext();

  const [transactions, setTransactions] = useState([]);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const totalBalance = useMemo(() => {
    return transactions.reduce((acc, t) => {
      return t.type === "income" ? acc + t.value : acc - t.value;
    }, 0);
  }, [transactions]);

  useEffect(() => {
    if (!user) return;

    async function loadTransactions() {
      try {
        const response = await api.get(`/transactions/user/${user.id}`);
        setTransactions(response.data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    }

    loadTransactions();
  }, [user]);

  // DEPÓSITO
  async function deposit(data) {
    try {
      const response = await api.post("/transactions", {
        ...data,
        type: "income",
        user_id: user.id,
      });

      setTransactions((prev) => [response.data, ...prev]);
      setIsDepositOpen(false);
    } catch (error) {
      console.error("Erro ao depositar:", error);
    }
  }

  // GASTO
  async function withdraw(data) {
    try {
      const response = await api.post("/transactions", {
        ...data,
        type: "expense",
        user_id: user.id,
      });

      setTransactions((prev) => [response.data, ...prev]);
      setIsExpenseOpen(false);
    } catch (error) {
      console.error("Erro ao registrar gasto:", error);
    }
  }

  // EXCLUIR
  async function deleteTransaction(id) {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
    }
  }

  async function clearUserTransactions(userId) {
    if (!userId) return;

    const confirmClear = window.confirm(
      "Tem certeza que deseja apagar TODAS as transações?",
    );
    if (!confirmClear) return;

    try {
      await api.delete(`/transactions/user/${userId}`);
      setTransactions([]);
    } catch (error) {
      console.error("Erro ao limpar transações do usuário:", error);
    }
  }

  function editTransaction(transaction) {
    try {
      setEditingTransaction(transaction);
    } catch (error) {
      console.error("Erro ao editar transação:", error);
    }
  }

  async function updateTransaction(id, data) {
    try {
      const response = await api.put(`/transactions/${id}`, data);
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? response.data : t)),
      );
      setEditingTransaction(null);
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
    }
  }

  // NÃO LOGADO
  if (!user) {
    return (
      <>
        <Header />
        <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-semibold text-green-700">
              Controle suas finanças
            </h1>
            <p className="text-gray-500">
              Faça login para acompanhar seus gastos e depósitos
            </p>
            <Link
              to="/login"
              className="inline-block rounded-lg bg-green-600 px-8 py-3 text-white"
            >
              Fazer login
            </Link>
          </div>
        </div>
      </>
    );
  }

  // LOGADO
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* SALDO */}
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <p className="text-sm text-gray-400">Saldo total</p>
            <p
              className={`text-5xl font-semibold ${
                totalBalance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              R$ {totalBalance.toFixed(2)}
            </p>
          </div>

          {/* TRANSAÇÕES */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between mb-6">
              <h2 className="text-lg font-medium">Transações</h2>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsDepositOpen(true)}
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
                >
                  + Depósito
                </button>

                <button
                  onClick={() => setIsExpenseOpen(true)}
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
                >
                  + Gasto
                </button>

                <button
                  onClick={() => clearUserTransactions(user.id)}
                  disabled={transactions.length === 0}
                  className="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-40"
                >
                  Limpar tudo
                </button>
              </div>
            </div>

            <Transactions
              transactions={transactions}
              onDelete={deleteTransaction}
              onEdit={editTransaction}
            />
          </div>
        </div>
      </div>

      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onSubmit={deposit}
      />

      <ExpenseModal
        isOpen={isExpenseOpen}
        onClose={() => setIsExpenseOpen(false)}
        onSubmit={withdraw}
      />

      <EditTransactionModal
        transaction={editingTransaction}
        onClose={() => setEditingTransaction(null)}
        onSubmit={updateTransaction}
      />
    </>
  );
}
