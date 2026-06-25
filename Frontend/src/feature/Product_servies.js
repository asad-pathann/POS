import axios from "axios";

let BASE_URL = "http://localhost:8888/api/products";

// ✅ CREATE PRODUCT - FIXED
export const Product_post = async (productData) => {
  try {
    let response = await axios.post(
      `${BASE_URL}/post-product/${productData?.user_id}`,
      productData.formData, // ✅ Sirf formData bhejo
      {
        headers: {
          "Content-Type": "multipart/form-data", // Agar image ho toh
        },
      },
    );
    return response.data; // ✅ response.data return karo
  } catch (error) {
    throw error;
  }
};

// ✅ GET PRODUCTS
export const getProduct = async () => {
  try {
    let response = await axios.get(`${BASE_URL}/get-product`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ UPDATE PRODUCT - FIXED
export const updateProducts = async (productData) => {
  try {
    let response = await axios.put(
      `${BASE_URL}/update-product/${productData?.product_id}/${productData?.user_id}`,
      productData.formData, // ✅ Sirf formData bhejo (name, price, category, stock)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ DELETE PRODUCT
export const deleteProduct = async (productData) => {
  try {
    let response = await axios.delete(
      `${BASE_URL}/delete-product/${productData?.product_id}/${productData?.user_id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
