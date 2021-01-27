import Mongoose, { Schema } from "mongoose";

const TableSchema = new Schema(
  {
    _idParam: {
      type: Schema.Types.ObjectId,
      ref: "parameters",
      required: true,
    },
    totalAmountToPaid: { type: Schema.Types.Number, required: true },
    totalAmortization: { type: Schema.Types.Number, required: true },
    totalInterestToPaid: { type: Schema.Types.Number, required: true },
    installments: {
      required: true,
      type: [
        {
          _id: false,
          installment: { type: Schema.Types.Number, required: true },
          installmentAmount: { type: Schema.Types.Number, required: true },
          interestAmount: { type: Schema.Types.Number, required: true },
          amortizationAmount: { type: Schema.Types.Number, required: true },
          outstandingBalance: { type: Schema.Types.Number, required: true },
        },
      ],
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const TablesModel = Mongoose.model("tables", TableSchema);

export default TablesModel;
