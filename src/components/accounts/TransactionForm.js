// import { useEffect, useState } from "react";
// import API from "../../service/API";
// import { get } from "../../service/storage/cookies";

// export default function TransactionForm({ companyId }) {
//   const [transactionType, setTransactionType] = useState("EXPENSE");
//   const [categories, setCategories] = useState([]);
//   const [companyUserName, setCompanyUserName] = useState([]);
//   const [companyUserId, setCompanyUserId] = useState([]);
//   const [companyUser, setCompanyUser] = useState([]);

//   const isAdmin = get.role() === "Admin";
//   const loggedInUserId = get.id();
  
//   const [form, setForm] = useState({
//     categoryId: "",
//     amount: "",
//     tax: "",
//     description: "", 
//     invoiceNo: "",
//     administeredBy: loggedInUserId, // default to logged-in user
//   });

  

//   useEffect(() => {
//     if (transactionType) {
//       API.get(`/categories?type=${transactionType}`)
//         .then((res) => setCategories(res.data))
//         .catch((err) => console.error("Failed to fetch categories", err));
//     }
//   }, [transactionType]);

//   // Load company users if admin
//   useEffect(() => {
//     if (isAdmin) {
//       API.get(`/companies/users/${companyId}`)
//         .then((res) => {
//           const usernames = res.data.map((user) => user.USERNAME);
//           const userIds = res.data.map((user) => user.USER_ID);
//           const us = res.data.map((user) => user);
//           setCompanyUserName(usernames);
//           setCompanyUserId(userIds);
//           setCompanyUser(us);
//         })
//         .catch((err) => {
//           console.error("Failed to load user list", err);
//           setCompanyUserName([]);
//           setCompanyUserId([]);
//           setCompanyUser([]);
//         });
//     }
//   }, [isAdmin, companyId]);

//   // const handleChange = (e) => {
//   //   setForm({ ...form, [e.target.name]: e.target.value });
//   // };

//   const handleChange = (e) => {
//   const { name, value } = e.target;

//   // Convert administeredBy to number if needed
//   const parsedValue = name === "administeredBy" ? parseInt(value, 10) : value;

//   setForm((prev) => ({
//     ...prev,
//     [name]: parsedValue,
//   }));
// };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       companyId,
//       transactionType,
//       ...form,
//     };

//     try {
//       console.log("Submitting transaction", payload);
//       await API.post("/transactions", payload);
//       alert("Transaction recorded successfully");
//       setForm({
//         categoryId: "",
//         amount: "",
//         tax: "",
//         description: "",
//         invoiceNo: "",
//         administeredBy: loggedInUserId, // reset to logged-in user
//       });
//     } catch (err) {
//       console.error("Error submitting transaction", err);
//       alert("Failed to record transaction");
//     }
//   };

//   return (
//    <div className="card p-4 mb-4 shadow-sm">
//   <h4 className="mb-4 text-primary">Add Transaction</h4>
//   <form onSubmit={handleSubmit}>
//     <div className="row g-3">
//       {/* Transaction Type */}
//       <div className="col-md-6">
//         <label className="form-label">Transaction Type</label>
//         <select
//           className="form-select"
//           value={transactionType}
//           onChange={(e) => {
//             setTransactionType(e.target.value);
//             setForm({ ...form, categoryId: "" });
//           }}
//         >
//           <option value="EXPENSE">Expense</option>
//           <option value="INCOME">Income</option>
//         </select>
//       </div>

//       {/* Category */}
//       <div className="col-md-6">
//         <label className="form-label">Category</label>
//         <select
//           className="form-select"
//           name="categoryId"
//           value={form.categoryId}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select a category</option>
//           {categories.map((cat) => (
//             <option key={cat.CATEGORY_ID} value={cat.CATEGORY_ID}>
//               {cat.CATEGORY_NAME}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Administered By (only for Admins) */}
//           {isAdmin && (
//             <div className="col-md-6">
//               <label className="form-label">Administered By</label>
//               <select
//                 className="form-select"
//                 name="administeredBy"
//                 value={form.administeredBy}
//                 onChange={handleChange}
//               >
//                 {companyUser.map((us) => (
//                   <option key={us.USER_ID} value={us.USER_ID}>
//                     {us.USERNAME}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//       {/* Amount */}
//       <div className="col-md-4">
//         <label className="form-label">Amount</label>
//         <input
//           type="number"
//           className="form-control"
//           name="amount"
//           value={form.amount}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       {/* Tax */}
//       <div className="col-md-4">
//         <label className="form-label">Tax</label>
//         <input
//           type="number"
//           className="form-control"
//           name="tax"
//           value={form.tax}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       {/* Invoice No - ✅ NEW FIELD */}
//           <div className="col-md-4">
//             <label className="form-label">Invoice No</label>
//             <input
//               type="text"
//               className="form-control"
//               name="invoiceNo"
//               value={form.invoiceNo}
//               onChange={handleChange}
//               required
//             />
//           </div>

//       {/* Description */}
//       <div className="col-12">
//         <label className="form-label">Description</label>
//         <textarea
//           className="form-control"
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           rows="3"
//           required
//         />
//       </div>

//       {/* Submit */}
//       <div className="col-12">
//         <button className="btn btn-success w-auto" type="submit">
//           Submit Transaction
//         </button>
//       </div>
//     </div>
//   </form>
// </div>
//   );
// }

import { useEffect, useState } from "react";
import API from "../../service/API";
import { get } from "../../service/storage/cookies";

export default function TransactionForm({ companyId }) {
  const [transactionType, setTransactionType] = useState("EXPENSE");
  const [categories, setCategories] = useState([]);
  const [companyUsers, setCompanyUsers] = useState([]);

  const isAdmin = get.role() === "Admin";
  const loggedInUserId = get.id();

  const [form, setForm] = useState({
    categoryId: "",
    amount: "",
    tax: "",
    description: "",
    invoiceNo: "",
    administeredBy: loggedInUserId,
  });

  // Fetch categories based on type
  useEffect(() => {
    API.get(`/categories?type=${transactionType}`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, [transactionType]);

  // Fetch users if admin
  useEffect(() => {
    if (!isAdmin) return;
    API.get(`/companies/users/${companyId}`)
      .then((res) => setCompanyUsers(res.data))
      .catch((err) => {
        console.error("Failed to load user list", err);
        setCompanyUsers([]);
      });
  }, [isAdmin, companyId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "administeredBy" ? parseInt(value, 10) : value;
    setForm((prev) => ({ ...prev, [name]: parsedValue }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      companyId,
      transactionType,
      ...form,
    };

    try {
      console.log("Submitting transaction", payload);
      await API.post("/transactions", payload);
      alert("Transaction recorded successfully");
      setForm({
        categoryId: "",
        amount: "",
        tax: "",
        description: "",
        invoiceNo: "",
        administeredBy: loggedInUserId,
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
                setForm((prev) => ({ ...prev, categoryId: "" }));
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

          {/* Administered By (Admin only) */}
          {isAdmin && (
            <div className="col-md-6">
              <label className="form-label">Administered By</label>
              <select
                className="form-select"
                name="administeredBy"
                value={form.administeredBy}
                onChange={handleChange}
              >
                {companyUsers.map((user) => (
                  <option key={user.USER_ID} value={user.USER_ID}>
                    {user.USERNAME}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Amount */}
          <div className="col-md-4">
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
          <div className="col-md-4">
            <label className="form-label">Tax</label>
            <input
              type="number"
              className="form-control"
              name="tax"
              value={form.tax}
              onChange={handleChange}
              required
            />
          </div>

          {/* Invoice No */}
          <div className="col-md-4">
            <label className="form-label">Invoice No</label>
            <input
              type="text"
              className="form-control"
              name="invoiceNo"
              value={form.invoiceNo}
              onChange={handleChange}
              required
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
              required
            />
          </div>

          {/* Submit Button */}
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
