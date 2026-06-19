import axios from "axios";

let Base_url = "http://localhost:8888/api/payments";

export const paymentPost = async (paymentData) => {
  let response = await axios.post(
    `${Base_url}/post-payment/${paymentData?.order_id}`,
    paymentData,
  );
  return response.data;
};
