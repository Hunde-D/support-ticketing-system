import { config } from "dotenv";
import { createServer } from "./server";
import { connectToDatabase } from "./lib/dbconnect";
config({ path: ".env" });
const port = process.env.PORT || 5001;
async function startServer() {
  try {
    await connectToDatabase();
    const server = createServer();

    server.listen(port, () => {
      console.log(`API running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
