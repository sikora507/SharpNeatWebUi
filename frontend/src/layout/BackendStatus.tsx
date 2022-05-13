import { useContext } from "react";
import Badge from "react-bootstrap/esm/Badge";
import { ExperimentContext, ExperimentState } from "../store/experiment-context";
import { BackendStatus, StatusContext } from "../store/status-context";

const BackendStatusControl: React.FC = (props) => {
  const statusContext = useContext(StatusContext);
  const experimentContext = useContext(ExperimentContext);

  let experimentStateClass = 'info';
  switch (experimentContext.state) {
    case ExperimentState.Ready :
      experimentStateClass = 'primary';
      break;
    case ExperimentState.Terminated:
      experimentStateClass = 'danger';
      break;
    case ExperimentState.Paused:
      experimentStateClass = 'secondary';
      break;
    case ExperimentState.Running:
      experimentStateClass = 'success'
      break;
  }
  return (
    <>
      <span>Backend status: </span>
      {statusContext.backendStatus == BackendStatus.Checking && (
        <Badge bg="warning" text="dark">
          Checking...
        </Badge>
      )}
      {statusContext.backendStatus == BackendStatus.Online && (
        <Badge bg="success">Online</Badge>
      )}
      {statusContext.backendStatus == BackendStatus.Offline && (
        <Badge bg="danger">Offline</Badge>
      )}
      <span>Experiment status: </span>
      <Badge bg={experimentStateClass}>{experimentContext.state}</Badge>
    </>
  );
};

export default BackendStatusControl;
