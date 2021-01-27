import styled from "styled-components";
import { toCurrency } from "../utils/utils";

const TableWrapper = styled.div`
  margin: 10px 0;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  background-color: white;
  border-radius: 8px;
  border-collapse: collapse;
  thead {
    tr {
      th {
        text-align: center;
        font-weight: 600;
        padding: 8px;
      }
    }
  }

  tbody {
    tr {
      &:nth-of-type(even) {
        background-color: #24307f0f;
      }

      td {
        padding: 8px;
        text-align: end;

        &:first-of-type {
          text-align: center;
        }
      }
    }
  }
`;

function TablePrice({ tablePrice }) {
  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <th>Nº Prestação</th>
            <th>Valor Prestação</th>
            <th>Amortização</th>
            <th>Juros</th>
            <th>Saldo Devedor</th>
          </tr>
        </thead>
        <tbody>
          {tablePrice.installments.map((installment) => (
            <tr key={installment.installment}>
              <td>{installment.installment}</td>
              <td>{toCurrency(installment.installmentAmount)}</td>
              <td>{toCurrency(installment.amortizationAmount)}</td>
              <td>{toCurrency(installment.interestAmount)}</td>
              <td>{toCurrency(installment.outstandingBalance)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
}

export default TablePrice;
