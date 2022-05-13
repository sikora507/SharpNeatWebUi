import { Button, Modal, Tab, Tabs } from "react-bootstrap";

interface IAboutModalProps {
  show: boolean;
  handleClose: () => void
}

export default function AboutModal(props: IAboutModalProps) {
  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>NeatLab</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey="about" className="mb-3">
          <Tab eventKey="about" title="About">
            <p>Neuroevolution of Augmenting Topologies (NEAT) is an evolutionary algorithm devised by Kenneth O. Stanley.</p>
            <p>SharpNEAT is a complete implementation of NEAT written in C# / .NET created by Colin Green.</p>
            <p>For more information, see: <a href="http://sharpneat.sourceforge.io/" target="_blank">http://sharpneat.sourceforge.io/</a></p>
            <p>Cross platform Web User Interface is created by Tomasz Sikora.</p>
          </Tab>
          <Tab eventKey="license" title="License">
            <p>SharpNEAT - Evolution of Neural Networks.</p>
            <p>Copyright 2004-2020 Colin D. Green</p>
            <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
            <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
            <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
          </Tab>
        </Tabs>


      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}