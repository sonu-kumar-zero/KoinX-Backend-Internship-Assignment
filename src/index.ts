import dotenv from "dotenv";
import { app } from "./app";
import { startBackgroundJobOfDataFetching } from "./backgroundService/fetchingDataOfCoins";

dotenv.config();
if (!process.env.PORT) {
  console.warn(
    "PORT environment variable is not set. Defaulting to port 4000."
  );
}
const port = process.env.PORT || 4000;

const server = app.listen(port, async () => {
  try {
    console.log(`Server is running on port ${port}`);
    // await startBackgroundJobOfDataFetching();
  } catch (error) {
    console.error("Error starting background job:", error);
    process.exit(1);
  }
});

process.on("SIGINT", () => {
  console.log("Server shutting down...");
  server.close(() => {
    console.log("Server has been closed.");
    process.exit(0);
  });
});
