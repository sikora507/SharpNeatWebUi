import { useContext, useEffect, useState } from "react";
import { Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import AboutModal from "../components/modals/AboutModal";
import GenericInfoModal from "../components/modals/GenericInfoModal";
import useExperiments from "../hooks/useExperiments";
import { ExperimentContext } from "../store/experiment-context";

const Header = () => {
  const navLinkClasses = (navData: { isActive: boolean }): string => {
    return navData.isActive ? "nav-link active" : "nav-link";
  };
  const navBrandClasses = (navData: { isActive: boolean }): string => {
    return navData.isActive ? "navbar-brand active" : "navbar-brand";
  };
  const [isAboutModalVisible, setIsAboutModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  const { experiments } = useExperiments();
  const experimentContext = useContext(ExperimentContext);
  useEffect(() =>{
    if(!experimentContext.experimentId && experiments && experiments.length > 0){
      experimentContext.selectExperiment(experiments[0].id);
    }
  }, [experiments]);
  const experimentChanged = (e : React.ChangeEvent<HTMLSelectElement>) => {
    experimentContext.selectExperiment(e.target.value);
  }
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <NavLink className={navBrandClasses} to="/">
            NeatLab
          </NavLink>
          <Form.Select 
          disabled={experimentContext.populationInitialized} 
          style={{ width: "300px" }} 
          value={experimentContext.experimentId} 
          onChange={experimentChanged}>
            {experiments && experiments.map((exp) => {
              return <option key={exp.id} value={exp.id}>{exp.name}</option>
            })}
          </Form.Select>
          <Nav>
            <Button 
            className="mx-2" 
            disabled={!experimentContext.experimentDescription}
            onClick={() => setIsInfoModalVisible(true)}>Info</Button>
          </Nav>
          <Nav>
            <NavLink className={navLinkClasses} to="/config">
              Config
            </NavLink>
          </Nav>
          <Nav>
            <NavLink className={navLinkClasses} to="/charts">
              Charts
            </NavLink>
          </Nav>
          <Nav className="ms-auto">
            <Button onClick={() => setIsAboutModalVisible(true)}>About</Button>
          </Nav>
        </Container>
      </Navbar>
      <AboutModal
        show={isAboutModalVisible}
        handleClose={() => setIsAboutModalVisible(false)}
      />
      <GenericInfoModal 
        title={experimentContext.experimentName}
        description={experimentContext.experimentDescription}
        show={isInfoModalVisible}
        handleClose={() => setIsInfoModalVisible(false)} />
    </>
  );
};

export default Header;
