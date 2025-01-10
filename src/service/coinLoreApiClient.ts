import axios from "axios";

const coinLoreApiClient = axios.create({
  baseURL: process.env.COIN_LORE_API || "https://api.coinlore.net/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

coinLoreApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);

    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.error("Unauthorized! Redirecting to login...");
      } else if (status === 403) {
        console.error("Forbidden! You don't have permission.");
      } else if (status === 500) {
        console.error("Server error! Try again later.");
      }
    }

    return Promise.reject(error);
  }
);

export default coinLoreApiClient;
