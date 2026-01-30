import { useEffect, useState } from "react";
import axios from "axios";

export const AdminAddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    stock: ""
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/categories`)
      .then(res => setCategories(res.data));
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/products`,
      {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      }
    );
    alert("Product added!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="image" placeholder="Image URL" onChange={handleChange} />
      <input name="stock" placeholder="Stock" onChange={handleChange} />

      <select name="category" onChange={handleChange}>
        <option value="">Select Category</option>
        {categories.map((c: any) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <button type="submit">Add Product</button>
    </form>
  );
};
