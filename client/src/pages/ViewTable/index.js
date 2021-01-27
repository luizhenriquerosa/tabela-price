import { PageContainer, Main, Title } from "./styles";
import TablePriceInfo from "../../components/TablePriceInfo";
import TablePrice from "../../components/TablePrice";

function ViewTable(props) {
  const { tablePrice } = props.location.state;
  return (
    <PageContainer>
      <Main>
        <Title>Resultado</Title>
        <TablePriceInfo tablePrice={tablePrice} />
        <TablePrice tablePrice={tablePrice} />
      </Main>
    </PageContainer>
  );
}

export default ViewTable;
