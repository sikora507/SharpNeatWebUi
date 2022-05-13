import { Container, Nav, Navbar } from "react-bootstrap";
import BackendStatusControl from "./BackendStatus";
import StatusContextProvider from "../store/status-context";
import ExperimentContextProvider from "../store/experiment-context";

const Footer = () => {
  return (
    <footer>
      <Navbar bg="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Item>
              <StatusContextProvider>
                  <BackendStatusControl />
              </StatusContextProvider>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </footer>
  );
};

export default Footer;
