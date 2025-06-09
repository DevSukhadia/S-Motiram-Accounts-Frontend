import { useEffect, useState } from "react";
import API from "../../service/API";

export default function TransactionForm({ companyId }) {
  const [transactionType, setTransactionType] = useState("EXPENSE");
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    categoryId: "",
    amount: "",
    tax: "",
    description: ""
  });

  useEffect(() => {
    if (transactionType) {
      API.get(`/categories?type=${transactionType}`)
        .then((res) => setCategories(res.data))
        .catch((err) => console.error("Failed to fetch categories", err));
    }
  }, [transactionType]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      companyId,
      transactionType,
      ...form,
    };

    try {
      await API.post("/transactions", payload);
      alert("Transaction recorded successfully");
      setForm({
        categoryId: "",
        amount: "",
        tax: "",
        description: ""
      });
    } catch (err) {
      console.error("Error submitting transaction", err);
      alert("Failed to record transaction");
    }
  };

  return (
   <div className="card p-4 mb-4 shadow-sm">
  <h4 className="mb-4 text-primary">Add Transaction</h4>
  <form onSubmit={handleSubmit}>
    <div className="row g-3">
      {/* Transaction Type */}
      <div className="col-md-6">
        <label className="form-label">Transaction Type</label>
        <select
          className="form-select"
          value={transactionType}
          onChange={(e) => {
            setTransactionType(e.target.value);
            setForm({ ...form, categoryId: "" });
          }}
        >
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
      </div>

      {/* Category */}
      <div className="col-md-6">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.CATEGORY_ID} value={cat.CATEGORY_ID}>
              {cat.CATEGORY_NAME}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div className="col-md-6">
        <label className="form-label">Amount</label>
        <input
          type="number"
          className="form-control"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
      </div>

      {/* Tax */}
      <div className="col-md-6">
        <label className="form-label">Tax</label>
        <input
          type="number"
          className="form-control"
          name="tax"
          value={form.tax}
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div className="col-12">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

      {/* Submit */}
      <div className="col-12">
        <button className="btn btn-success w-auto" type="submit">
          Submit Transaction
        </button>
      </div>
    </div>
  </form>
</div>
  );
}
