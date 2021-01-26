import Server from "./bin/server";
import Database from "./bin/database";
import "dotenv/config";

class Main {
  database = new Database();
  server = new Server();

  constructor() {
    this.init();
  }

  async init() {
    try {
      await this.database.connect();
      await this.server.start();

      console.log("App has started");
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new Main();
