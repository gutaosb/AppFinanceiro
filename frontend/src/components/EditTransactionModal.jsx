import { useEffect, useState } from "react";

export default function EditTransactionModal({
  transaction,
  onClose,
  onSubmit,
}) {
  const [value, setValue] = useState("");
  const [justify, setJustify] = useState("");

  useEffect(() => {
    if (transaction) {
      setValue(transaction.value);
      setJustify(transaction.justify || "");
    }
  }, [transaction]);

  if (!transaction) return null;

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(transaction.id, {
      value: Number(value),
      justify,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">Editar transação</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            className="w-full rounded-lg border px-4 py-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />

          <input
            type="text"
            className="w-full rounded-lg border px-4 py-2"
            placeholder="Descrição"
            value={justify}
            onChange={(e) => setJustify(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
