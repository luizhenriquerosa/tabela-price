import Mongoose, { Schema } from "mongoose";

const Tables = new Schema(
  {
    _idParam: { type: Schema.ObjectId, ref: "params" },
    installments: [
      {
        installment: { type: Schema.Number },
        installmentAmount: { type: Schema.Number },
        interestAmount: { type: Schema.Number },
      },
    ],
  },
  {
    timestamps: false,
  }
);

export default Mongoose.model("tables", Tables);
