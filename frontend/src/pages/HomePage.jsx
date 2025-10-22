import React from "react";

export default function HomePage() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mx-auto flex w-full max-w-96 flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-green-700">
          Bem-vindo ao App Financeiro
        </h1>
        <p className="text-center text-gray-700">
          Gerencie suas finanças de forma fácil e eficiente.
        </p>
      </div>
    </section>
  );
}
