import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateForm({ open, setOpen, item, handleUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        price: item.price || "",
        category: item.category || "",
        stock: item.stock || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handleUpdate(formData);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Update Product
        </Typography>

        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded"
          >
            Update Product
          </button>
        </form>
      </Box>
    </Modal>
  );
}
