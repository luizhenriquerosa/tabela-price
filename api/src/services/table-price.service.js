import TableRepository from "../repositories/table.repository";
import ParameterRepository from "../repositories/parameter.repository";

class TablePriceService {
  tableRepository = new TableRepository();
  parameterRepository = new ParameterRepository();

  async getTable(params = {}) {
    try {
      const tables = [];
      const parameters = await this.parameterRepository.find(params);

      for (let index = 0; index < parameters.length; index++) {
        const parameter = parameters[index];

        const monthInstallments = await this.tableRepository.find({
          _idParam: parameter._id,
        });

        tables.push({
          numberOfMonth: parameter.numberOfMonth,
          ratePerMonth: parameter.ratePerMonth,
          financedAmount: parameter.financedAmount,
          paidInstallments: parameter.paidInstallments,
          installments: monthInstallments[0].installments,
        });
      }

      return tables;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createTable(params = {}) {
    try {
      const {
        numberOfMonth,
        ratePerMonth,
        financedAmount,
        paidInstallments,
      } = params;

      const parameterCreated = await this.parameterRepository.create({
        numberOfMonth,
        ratePerMonth,
        financedAmount,
        paidInstallments,
      });

      const unitTax = ratePerMonth / 100;
      const multiple = Math.pow(1 + unitTax, numberOfMonth) * unitTax;
      const underMultiple = Math.pow(1 + unitTax, numberOfMonth) - 1;

      const installmentAmount = +(
        financedAmount *
        (multiple / underMultiple)
      ).toFixed(2);

      let outstandingBalance = financedAmount;

      let installments = [];
      for (let month = 1; month <= numberOfMonth; month++) {
        const interestAmount = +(outstandingBalance * unitTax).toFixed(2);
        const amortizationAmount = +(
          installmentAmount - interestAmount
        ).toFixed(2);

        outstandingBalance = outstandingBalance - amortizationAmount;
        installments.push({
          installment: month,
          installmentAmount,
          amortizationAmount,
          interestAmount,
          outstandingBalance,
        });
      }

      await this.tableRepository.create({
        _idParam: parameterCreated.id,
        installments,
      });

      const table = {
        numberOfMonth: parameterCreated.numberOfMonth,
        ratePerMonth: parameterCreated.ratePerMonth,
        financedAmount: parameterCreated.financedAmount,
        paidInstallments: parameterCreated.paidInstallments,
        installments,
      };

      return table;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new TablePriceService();
