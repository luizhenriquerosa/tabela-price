import TableRepository from "../repositories/table.repository";
import ParameterRepository from "../repositories/parameter.repository";

class TablePriceService {
  tableRepository = new TableRepository();
  parameterRepository = new ParameterRepository();

  calculateInstallmentMonthly(financedAmount, ratePerMonth, numberOfMonths) {
    const unitTax = ratePerMonth / 100;
    const multiple = Math.pow(1 + unitTax, numberOfMonths) * unitTax;
    const underMultiple = Math.pow(1 + unitTax, numberOfMonths) - 1;

    return +(financedAmount * (multiple / underMultiple)).toFixed(2);
  }

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
          newNumberOfMonths: parameter.newNumberOfMonths,
          numberOfMonths: parameter.numberOfMonths,
          ratePerMonth: parameter.ratePerMonth,
          financedAmount: parameter.financedAmount,
          paidInstallments: parameter.paidInstallments,
          installments: monthInstallments[0].installments,
          totalAmountToPaid: monthInstallments.totalAmountToPaid,
          totalAmortization: monthInstallments.totalAmortization,
          totalInterestToPaid: monthInstallments.totalInterestToPaid,
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
        numberOfMonths,
        newNumberOfMonths,
        ratePerMonth,
        financedAmount,
        paidInstallments,
      } = params;

      const parameterCreated = await this.parameterRepository.create({
        newNumberOfMonths,
        numberOfMonths,
        ratePerMonth,
        financedAmount,
        paidInstallments,
      });

      // Inicio do calculo
      // outstandingBalance guarda o saldo financiado para calcular o saldo devedor mês a mês conforme iteração abaixo
      let outstandingBalance = financedAmount;

      // Função que retorna o valor da parcela fornecendo o montante financiado, a taxa de juros ao mês e o número de parcelas
      let installmentAmount = this.calculateInstallmentMonthly(
        financedAmount,
        ratePerMonth,
        numberOfMonths
      );

      let installments = [];
      let iterator = numberOfMonths;

      // Iteração para calcular amortização e juros pagos mês a mês
      for (let month = 1; month <= iterator; month++) {
        // Caso o solicitante já tenha pago X parcelas, e a iteração estiver no primeiro mês não pago
        // ele calcula novamente o valor das parcelas e adiciona a iteração a nova quantidade de parcelas, assim os valores mês a mês utiliza-se do novo valor de parcela
        if (paidInstallments && month - paidInstallments === 1) {
          installmentAmount = this.calculateInstallmentMonthly(
            outstandingBalance,
            ratePerMonth,
            newNumberOfMonths
          );
          iterator = newNumberOfMonths + month - 1;
        }

        // Calculo do juros mensal
        const interestAmount = +(
          outstandingBalance *
          (ratePerMonth / 100)
        ).toFixed(2);

        // Calculo da amortização mensal
        const amortizationAmount = +(
          installmentAmount - interestAmount
        ).toFixed(2);

        // Atualização do saldo devedor para o próximo mês a ser calculado
        outstandingBalance = outstandingBalance - amortizationAmount;

        if (outstandingBalance < 1) {
          outstandingBalance = 0;
        }

        installments.push({
          installment: month,
          installmentAmount,
          amortizationAmount,
          interestAmount,
          outstandingBalance,
        });
      }

      // Calculo dos totais
      const totalAmountToPaid = +installments
        .reduce((acc, item) => acc + item.installmentAmount, 0)
        .toFixed(2);
      const totalAmortization = +installments
        .reduce((acc, item) => acc + item.amortizationAmount, 0)
        .toFixed(2);
      const totalInterestToPaid = +installments
        .reduce((acc, item) => acc + item.interestAmount, 0)
        .toFixed(2);

      await this.tableRepository.create({
        _idParam: parameterCreated.id,
        totalAmountToPaid,
        totalAmortization,
        totalInterestToPaid,
        installments,
      });

      const table = {
        newNumberOfMonths: parameterCreated.newNumberOfMonths,
        numberOfMonths: parameterCreated.numberOfMonths,
        ratePerMonth: parameterCreated.ratePerMonth,
        financedAmount: parameterCreated.financedAmount,
        paidInstallments: parameterCreated.paidInstallments,
        totalAmountToPaid,
        totalAmortization,
        totalInterestToPaid,
        installments,
      };

      return table;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new TablePriceService();
