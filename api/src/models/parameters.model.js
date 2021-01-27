import Mongoose, { Schema } from "mongoose";

const ParameterSchema = new Schema(
  {
    ratePerMonth: { type: Schema.Types.Number, required: true },
    numberOfMonth: { type: Schema.Types.Number, required: true },
    financedAmount: { type: Schema.Types.Number, required: true },
    paidInstallments: { type: Schema.Types.Number },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const ParametersModel = Mongoose.model("parameters", ParameterSchema);

export default ParametersModel;
