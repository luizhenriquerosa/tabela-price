import styled from "styled-components";
import { toCurrency, toTaxFormat, toMonthExtensive } from "../utils/utils";

const Card = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: white;
  padding: 10px 20px;

  ul {
    list-style: none;

    li {
      font-size: 20px;
      line-height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      span:first-of-type {
        font-weight: 500;
      }

      span:last-of-type {
        font-weight: 300;
        margin-left: 20px;
      }

      @media (max-width: 496px) {
        font-size: 1rem;
      }
    }
  }
`;

function TablePriceInfo({ tablePrice }) {
  return (
    <Card>
      <ul>
        <li>
          <span>Valor financiado</span>
          <span>{toCurrency(tablePrice.financedAmount)}</span>
        </li>
        <li>
          <span>Valor da prestação </span>
          <span>
            {toCurrency(tablePrice.installments[0].installmentAmount)}
          </span>
        </li>
        <li>
          <span>Taxa de operação</span>
          <span>{toTaxFormat(tablePrice.ratePerMonth)}</span>
        </li>
        <li>
          <span>Nº de períodos</span>
          <span>{toMonthExtensive(tablePrice.numberOfMonths)}</span>
        </li>
        {tablePrice.paidInstallments > 0 && (
          <>
            <li>
              <span>Prestações pagas</span>
              <span>{tablePrice.paidInstallments}</span>
            </li>
            <li>
              <span>Novo período</span>
              <span>{toMonthExtensive(tablePrice.newNumberOfMonths)}</span>
            </li>
            <li>
              <span>Novo valor da prestação </span>
              <span>
                {toCurrency(
                  tablePrice.installments[tablePrice.installments.length - 1]
                    .installmentAmount
                )}
              </span>
            </li>
          </>
        )}
      </ul>
    </Card>
  );
}

export default TablePriceInfo;
