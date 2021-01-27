import ParametersModel from "../models/parameters.model";

class ParameterRepository {
  model = ParametersModel;

  async find(params) {
    try {
      const parameters = await this.model.find(params);

      return parameters;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(params) {
    try {
      const parameter = await this.model.create(params);

      return parameter;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ParameterRepository;
