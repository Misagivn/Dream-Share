import axios from "axios";

const API_URL = "https://mockapi.io/projects/65cd13f5dd519126b8401402";

export const getProducts = async () => {
  const { data } = await axios.get(`${API_URL}/Product`);
  return data;
};

export const getProductById = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/Product/${id}`);
  return data;
};
