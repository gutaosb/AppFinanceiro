import TransactionItem from "./TransactionItem";

export default function Transactions({ transactions, onDelete, onEdit }) {
  if (!transactions || transactions.length === 0) {
    return (
      <p className="text-gray-400 text-sm text-center py-10">
        Nenhuma transação registrada ainda.
      </p>
    );
  }

  return (
    <div className="divide-y">
      {transactions.map((t) => (
        <TransactionItem
          key={t.id}
          transaction={t}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
