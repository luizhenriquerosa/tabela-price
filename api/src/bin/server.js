import express from "express";
import TablePriceController from "../controllers/table-price.controller";
import cors from "cors";
import bodyparser from "body-parser";

class Server {
  port = process.env.TABLE_PRICE_API_PORT || 3000;
  app = express();

  async start() {
    console.log(`Trying to start the server on port ${this.port}`);
    try {
      this.setupMiddlewares();
      this.setupRoutes();

      await this.app.listen(this.port);
      console.log(`Server listening on port ${this.port}`);
    } catch (error) {
      throw new Error(
        `Error when trying to connect to the database: ${err.message}`
      );
    }
  }

  setupMiddlewares() {
    this.app.use(bodyparser.json());
    this.app.use(cors());
  }

  setupRoutes() {
    this.app.get("/table-price", TablePriceController.index);
    this.app.post("/table-price", TablePriceController.store);
  }
}

export default Server;
