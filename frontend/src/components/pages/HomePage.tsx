import CurrentStats from './HomePage/CurrentStats';
import { Card, Col, Container, Row } from "react-bootstrap";
import Population from "./HomePage/Population";
import SearchControl from "./HomePage/SearchControl";
import BestGenome from './HomePage/BestGenome';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Population />
          <SearchControl />
          <Card className="mt-3">
            <Card.Header>File</Card.Header>
            <Card.Body>Files content</Card.Body>
          </Card>
        </Col>
        <Col>
          <CurrentStats />
          <BestGenome />
        </Col>
      </Row>
    </Container>
  );
};
export default HomePage