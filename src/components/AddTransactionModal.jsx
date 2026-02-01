import { useState } from "react";

function AddTransactionModal({ isOpen, onClose, onSave }) {
  const [type, setType] = useState("income");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [division, setDivision] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title || !amount || !category || !division) {
      alert("Please fill all fields");
      return;
    }

    const transactionData = {
      type,
      title,
      amount: Number(amount),
      category,
      division,
      date: new Date().toISOString(),
    };

    onSave(transactionData);
    onClose();

    // reset form
    setTitle("");
    setAmount("");
    setCategory("");
    setDivision("");
    setType("income");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Transaction</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setType("income")}
            className={`flex-1 p-2 rounded ${
              type === "income" ? "bg-green-500 text-white" : "bg-gray-100"
            }`}
          >
            Income
          </button>

          <button
            onClick={() => setType("expense")}
            className={`flex-1 p-2 rounded ${
              type === "expense" ? "bg-red-500 text-white" : "bg-gray-100"
            }`}
          >
            Expense
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Title / Description"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>
            <option>Food</option>
            <option>Fuel</option>
            <option>Movie</option>
            <option>Medical</option>
            <option>Loan</option>
          </select>

          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Division</option>
            <option>Personal</option>
            <option>Office</option>
          </select>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Save {type}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTransactionModal;
