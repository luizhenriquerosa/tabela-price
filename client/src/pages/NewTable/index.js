import React, { useState } from "react";
import { showToastMessage } from "../../components/ToastMessage.js";
import { ParametersForm, Title, Subtitle } from "./styles.js";
import history from "../../services/history";
import { Container } from "react-bootstrap";

function NewTable() {
  const [ratePerMonth, setRatePerMonth] = useState("");
  const [numberOfMonths, setNumberOfMonths] = useState("");
  const [financedAmount, setFinancedAmount] = useState("");
  const [paidInstallments, setPaidInstallments] = useState("");
  const [newNumberOfMonths, setNewNumberOfMonths] = useState("");

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

    if (!numberOfMonths) {
      return showToastMessage({ type: "error", message: "Informe o período" });
    } else if (numberOfMonths <= 0) {
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
      numberOfMonths,
      financedAmount,
      paidInstallments,
      newNumberOfMonths,
    });

    try {
      const resultGet = await fetch(
        `${API_URL_GET_TABLE_PRICE}?ratePerMonth=${ratePerMonth}&numberOfMonths=${numberOfMonths}&financedAmount=${financedAmount}&paidInstallments=${paidInstallments}&newNumberOfMonths=${newNumberOfMonths}`
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
    <Container className="d-flex justify-content-center">
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
          <label htmlFor="numberOfMonths">Período - Qtd. meses</label>
          <input
            placeholder="Ex: 12"
            type="number"
            id="numberOfMonths"
            value={numberOfMonths}
            onChange={(e) => setNumberOfMonths(e.target.value)}
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
            onChange={(e) => setPaidInstallments(e.target.value)}
          />
        </div>
        {paidInstallments && (
          <div className="field">
            <label htmlFor="newNumberOfMonths">
              Período novo <small>(opcional)</small>
            </label>
            <input
              placeholder="Ex: 5"
              type="number"
              id="newNumberOfMonths"
              value={newNumberOfMonths}
              onChange={(e) => setNewNumberOfMonths(e.target.value)}
            />
          </div>
        )}
        <button>CALCULAR</button>
      </ParametersForm>
    </Container>
  );
}

export default NewTable;
