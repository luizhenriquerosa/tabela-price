import TablePriceService from "../services/table-price.service";

class TablePriceController {
  async index(req, res) {
    const params = req.query;
    try {
      const tables = await TablePriceService.getTable({
        numberOfMonth: Number(params.numberOfMonth),
        ratePerMonth: Number(params.ratePerMonth),
        financedAmount: Number(params.financedAmount),
        paidInstallments: Number(params.paidInstallments),
      });

      return res.json({ tables });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async store(req, res) {
    const params = req.body;
    try {
      const table = await TablePriceService.createTable({
        numberOfMonth: Number(params.numberOfMonth),
        ratePerMonth: Number(params.ratePerMonth),
        financedAmount: Number(params.financedAmount),
        paidInstallments: Number(params.paidInstallments),
      });

      return res.json({ table });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new TablePriceController();
