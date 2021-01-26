import Mongoose, { Schema } from "mongoose";

const Parameters = new Schema(
  {
    ratePerMonth: { type: Schema.Number },
    numberOfMonth: { type: Schema.Number },
    financedAmount: { type: Schema.Number },
  },
  {
    timestamps: false,
  }
);

export default Mongoose.model("parameters", Parameters);
