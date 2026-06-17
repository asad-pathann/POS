import axios from "axios";

let Base_url = "http://localhost:8888/api/orders";
export const orderPost = async (orderData) => {
  let response = await axios.post(
    `${Base_url}/post-order/${orderData?.product_id}/${orderData?.user_id}`,
    orderData,
  );
  return response.data;
};

export const getOrders = async () => {
  let response = await axios.get(`${Base_url}/get-order`);
  return response.data
};
