import { Title } from "./styles";
import TablePriceInfo from "../../components/TablePriceInfo";
import TablePrice from "../../components/TablePrice";
import { Container, Row, Col } from "react-bootstrap";
import history from "../../services/history";

function ViewTable(props) {
  const { tablePrice } = props.location.state;

  function handleNewCalc(e) {
    e.preventDefault();
    history.push("/");
  }

  return (
    <Container>
      <Row>
        <Col>
          <Title>
            Resultado <button onClick={handleNewCalc}>NOVO CÁLCULO</button>
          </Title>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={5}>
          <TablePriceInfo tablePrice={tablePrice} />
        </Col>
        <Col xs={12} lg={7}>
          <TablePrice tablePrice={tablePrice} />
        </Col>
      </Row>
    </Container>
  );
}

export default ViewTable;
