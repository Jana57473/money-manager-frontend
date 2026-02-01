import { useState, useEffect } from "react";
import AddTransactionModal from "../components/AddTransactionModal";
import {
  getTransactions,
  addTransaction,
} from "../services/transactionService";


function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [timeFilter, setTimeFilter] = useState("monthly");
  const [divisionFilter, setDivisionFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");



  const handleSaveTransaction = async (transactionData) => {
  const savedTransaction = await addTransaction(transactionData);
  setTransactions((prev) => [savedTransaction, ...prev]);
};

useEffect(() => {
  const fetchTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  fetchTransactions();
}, []);

const filteredTransactions = transactions.filter((t) => {
  const txnDate = new Date(t.date);
  const now = new Date();

  // if (divisionFilter !== "all" && t.division !== divisionFilter) {
  //   return false;
  // }

  if (
  divisionFilter !== "all" &&
  t.division?.toLowerCase() !== divisionFilter.toLowerCase()
) {
  return false;
}


  if (fromDate && txnDate < new Date(fromDate)) {
    return false;
  }

  if (toDate && txnDate > new Date(toDate)) {
    return false;
  }

  if (timeFilter === "weekly") {
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);
    return txnDate >= weekAgo;
  }

  if (timeFilter === "monthly") {
    return (
      txnDate.getMonth() === now.getMonth() &&
      txnDate.getFullYear() === now.getFullYear()
    );
  }

  if (timeFilter === "yearly") {
    return txnDate.getFullYear() === now.getFullYear();
  }

  return true;
});


  const totalIncome = filteredTransactions
  .filter((t) => t.type === "income")
  .reduce((sum, t) => sum + t.amount, 0);

const totalExpense = filteredTransactions
  .filter((t) => t.type === "expense")
  .reduce((sum, t) => sum + t.amount, 0);

const balance = totalIncome - totalExpense;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Money Manager Dashboard
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add
        </button>
      </div>

      {/* Filters */}
<div className="flex gap-4 mb-6 items-center">
  {/* Time filter */}
  <select
    className="border p-2 rounded"
    value={timeFilter}
    onChange={(e) => setTimeFilter(e.target.value)}
  >
    <option value="monthly">Monthly</option>
    <option value="weekly">Weekly</option>
    <option value="yearly">Yearly</option>
  </select>

  {/* Division filter */}
  <select
    className="border p-2 rounded"
    value={divisionFilter}
    onChange={(e) => setDivisionFilter(e.target.value)}
  >
    <option value="all">All Divisions</option>
    <option value="Personal">Personal</option>
    <option value="Office">Office</option>
  </select>

  {/* From date */}
  <input
    type="date"
    value={fromDate}
    onChange={(e) => setFromDate(e.target.value)}
    className="border p-2 rounded"
  />

  {/* To date */}
  <input
    type="date"
    value={toDate}
    onChange={(e) => setToDate(e.target.value)}
    className="border p-2 rounded"
  />
</div>


      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded">
          <h2 className="font-semibold">Income</h2>
          <p className="text-xl">₹{totalIncome}</p>

        </div>

        <div className="bg-red-100 p-4 rounded">
          <h2 className="font-semibold">Expense</h2>
          <p className="text-xl">₹{totalExpense}</p>

        </div>

        <div className="bg-blue-100 p-4 rounded">
          <h2 className="font-semibold">Balance</h2>
          <p className="text-xl">₹{balance}</p>

        </div>
      </div>

      {/* History */}
<div className="bg-white rounded shadow p-4">
  <h2 className="font-semibold mb-4">
    Transaction History
  </h2>

  {filteredTransactions.length === 0 ? (
    <p className="text-gray-500">No transactions yet</p>
  ) : (
    <ul className="space-y-2">
      {filteredTransactions.map((txn, index) => (
        <li
  key={index}
  className="flex justify-between items-center border p-2 rounded"
>
  <div>
    <p className="font-medium">{txn.title}</p>
    <p className="text-sm text-gray-500">
      {txn.category} • {txn.division}
    </p>
  </div>

  <div className="flex items-center gap-3">
    <p
      className={
        txn.type === "income"
          ? "text-green-600 font-semibold"
          : "text-red-600 font-semibold"
      }
    >
      {txn.type === "income" ? "+" : "-"}₹{txn.amount}
    </p>

    {/*  EDIT BUTTON */}
    <button
      disabled={
        new Date() - new Date(txn.date) > 12 * 60 * 60 * 1000
      }
      className="text-sm text-blue-600 disabled:text-gray-400"
    >
      Edit
    </button>
  </div>
</li>

      ))}
    </ul>
  )}
</div>


      {/* Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
      />
    </div>
  );
}

export default Dashboard;
