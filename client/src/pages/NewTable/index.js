import React, { useState } from "react";
import { showToastMessage } from "../../components/ToastMessage.js";
import { PageContainer, ParametersForm, Title, Subtitle } from "./styles.js";
import history from "../../services/history";

function NewTable() {
  const [ratePerMonth, setRatePerMonth] = useState("");
  const [numberOfMonth, setNumberOfMonth] = useState("");
  const [financedAmount, setFinancedAmount] = useState("");
  const [paidInstallments, setpaidInstallments] = useState("");

  const API_URL_GET_TABLE_PRICE = "http://localhost:5001/table-price";
  const API_URL_POST_TABLE_PRICE = "http://localhost:5001/table-price";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ratePerMonth) {
      return showToastMessage({
        type: "error",
        message: "Informe a taxa de juros ao mês",
      });
    } else if (ratePerMonth <= 0) {
      return showToastMessage({
        type: "error",
        message: "Informe uma taxa de juros positiva",
      });
    }

    if (!numberOfMonth) {
      return showToastMessage({ type: "error", message: "Informe o período" });
    } else if (numberOfMonth <= 0) {
      return showToastMessage({
        type: "error",
        message: "Informe um período positivo",
      });
    }

    if (!financedAmount) {
      return showToastMessage({
        type: "error",
        message: "Informe o valor financiado",
      });
    } else if (financedAmount <= 0) {
      return showToastMessage({
        type: "error",
        message: "Informe um valor financiado positivo",
      });
    }

    if (paidInstallments && paidInstallments < 0) {
      return showToastMessage({
        type: "error",
        message: "Informe uma quantidade positiva de parcelas pagas",
      });
    }

    const bodyRequest = JSON.stringify({
      ratePerMonth,
      numberOfMonth,
      financedAmount,
      paidInstallments,
    });

    try {
      const resultGet = await fetch(
        `${API_URL_GET_TABLE_PRICE}?ratePerMonth=${ratePerMonth}&numberOfMonth=${numberOfMonth}&financedAmount=${financedAmount}&paidInstallments=${paidInstallments}`
      );

      const { tables: tablePriceExists } = await resultGet.json();

      if (tablePriceExists.length > 0) {
        return history.push({
          pathname: "/resultado",
          state: { tablePrice: tablePriceExists[0] },
        });
      }

      const resultPost = await fetch(API_URL_POST_TABLE_PRICE, {
        method: "POST",
        body: bodyRequest,
        headers: { "Content-Type": "application/json" },
      });

      const { table: tablePriceCreated } = await resultPost.json();

      if (tablePriceCreated) {
        return history.push({
          pathname: "/resultado",
          state: { tablePrice: tablePriceCreated },
        });
      }
    } catch (error) {
      showToastMessage({ type: "error", message: error.message });
    }
  };

  return (
    <PageContainer>
      <ParametersForm onSubmit={handleSubmit}>
        <Title>Tabela Price</Title>
        <Subtitle>
          Metódo francês para amortização de empréstimo. Forneça os dados abaixo
          para calcular o valor das parcelas.
        </Subtitle>
        <div className="field">
          <label htmlFor="ratePerMonth">Taxa de juros ao mês %</label>
          <input
            placeholder="Ex: 2,5"
            type="number"
            id="ratePerMonth"
            value={ratePerMonth}
            onChange={(e) => setRatePerMonth(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="numberOfMonth">Período - Qtd. meses</label>
          <input
            placeholder="Ex: 12"
            type="number"
            id="numberOfMonth"
            value={numberOfMonth}
            onChange={(e) => setNumberOfMonth(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="financedAmount">Valor financiado R$</label>
          <input
            placeholder="Ex: 5500,00"
            type="number"
            id="financedAmount"
            value={financedAmount}
            onChange={(e) => setFinancedAmount(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="paidInstallments">
            Parcelas pagas <small>(opcional)</small>
          </label>
          <input
            placeholder="Ex: 5"
            type="number"
            id="paidInstallments"
            value={paidInstallments}
            onChange={(e) => setpaidInstallments(e.target.value)}
          />
        </div>
        <button>CALCULAR</button>
      </ParametersForm>
    </PageContainer>
  );
}

export default NewTable;
