import axios from "axios";

let BASE_URL = "http://localhost:8888/api/products";
export const Product_post = async (productData) => {
  let response = await axios.post(
    `${BASE_URL}/post-product/${productData?.user_id}`,
    productData,
  );

  return productData.data;
};

export const getProduct = async (productData) => {
  let response = await axios.get(`${BASE_URL}/get-product`);
  return response.data;
};

export const updateProducts = async (productData) => {
  let response = await axios.put(
    `${BASE_URL}/update-product/${productData?.product_id}/${productData?.user_id}`,
    productData,
  );

  return response.data;
};

export const deleteProduct = async (productData) => {
  let response = await axios.delete(
    `${BASE_URL}/delete-product/${productData?.product_id}/${productData?.user_id}`,
  );
  return response.data;
};
