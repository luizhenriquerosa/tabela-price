import Mongoose, { Schema } from "mongoose";

const ParameterSchema = new Schema(
  {
    ratePerMonth: { type: Schema.Types.Number, required: true },
    numberOfMonths: { type: Schema.Types.Number, required: true },
    newNumberOfMonths: { type: Schema.Types.Number },
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
