import React, { useState } from "react";

const DepositModal = ({ isOpen, onClose, onSubmit }) => {
  const [value, setValue] = useState("");
  const [justify, setJustify] = useState("");

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      value: Number(value),
      type: "income",
      justify,
    });

    setValue("");
    setJustify("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-green-700">
          Novo Depósito
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Valor"
            className="w-full rounded-lg border px-4 py-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Motivo do depósito"
            className="w-full rounded-lg border px-4 py-2"
            value={justify}
            onChange={(e) => setJustify(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositModal;
