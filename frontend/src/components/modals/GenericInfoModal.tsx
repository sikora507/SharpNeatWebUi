import { Button, Modal } from "react-bootstrap";

interface IGenericInfoModalProps {
  show: boolean;
  handleClose: () => void,
  title: string,
  description: string
}

export default function GenericInfoModal(props: IGenericInfoModalProps) {
  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{whiteSpace: 'pre-wrap'}}>
        {props.description}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}