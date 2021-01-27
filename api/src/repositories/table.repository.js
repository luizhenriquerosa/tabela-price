import TablesModel from "../models/tables.model";

class TableRepository {
  model = TablesModel;

  async find(params) {
    try {
      const tables = await this.model.find(params);

      return tables;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(params) {
    try {
      const table = await this.model.create(params);

      return table;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default TableRepository;
