const API_URL = "https://money-manager-backend-n7zh.onrender.com/api/transactions";

export const getTransactions = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addTransaction = async (transaction) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });

  return res.json();
};
