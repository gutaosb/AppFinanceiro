import { useState } from "react";

export default function TransactionItem({ transaction, onDelete, onEdit }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-between py-4 px-2 rounded-lg hover:bg-gray-50">
      <div>
        <p className="text-sm font-medium text-gray-800">
          {transaction.justify || "Sem descrição"}
        </p>
        <p className="text-xs text-gray-400">
          {new Date(transaction.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`text-sm font-semibold ${
            transaction.type === "income" ? "text-green-600" : "text-red-500"
          }`}
        >
          {transaction.type === "income" ? "+" : "-"} R${" "}
          {transaction.value.toFixed(2)}
        </span>

        {/* Botão menu */}
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-400 hover:text-gray-600"
        >
          ⋮
        </button>
      </div>

      {/* Menu */}
      {open && (
        <div className="absolute right-2 top-12 z-10 w-28 rounded-lg border bg-white shadow-md">
          <button
            onClick={() => {
              setOpen(false);
              onEdit(transaction);
            }}
            className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
          >
            Editar
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onDelete(transaction.id);
            }}
            className="block w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-red-50"
          >
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}
