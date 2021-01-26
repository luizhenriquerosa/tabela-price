import Mongoose from "mongoose";

class Database {
  connection = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    db: process.env.DB_NAME,
  };

  async connect() {
    try {
      console.log("Trying to connect to the database");
      await Mongoose.connect(
        `mongodb://${this.connection.host}:${this.connection.port}/${this.connection.db}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        }
      );
      console.log("Connection to the database has been stabilized");
    } catch (err) {
      throw new Error(
        `Error when trying to connect to the database: ${err.message}`
      );
    }
  }
}

export default Database;
