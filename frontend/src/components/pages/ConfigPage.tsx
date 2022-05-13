import React, { useContext } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";
import { ExperimentContext } from "../../store/experiment-context";

export default function ConfigPage() {
  var context = useContext(ExperimentContext);
  return (
    <Container>
      <Form>
        <Form.Group className="mt-3 input-group">
          <span className="input-group-text">Name</span>
          <Form.Control
            type="text"
            disabled
            value={context.config?.name ?? ""}
          />
        </Form.Group>
        <Row>
          <Col sm={6}>
            <Form.Group className="mt-3 input-group">
              <span className="input-group-text">Activation function name</span>
              <Form.Control
                type="text"
                value={context.config?.activationFnName ?? ""}
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group className="mt-4">
              <Form.Check
                type="checkbox"
                checked={context.config?.isAcyclic ?? false}
                label="Is Acyclic"
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mt-3 input-group">
              <span className="input-group-text">Cycles per activation</span>
              <Form.Control
                type="number"
                min="0"
                value={context.config?.cyclesPerActivation ?? 0}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mt-3 input-group">
              <span className="input-group-text">Connection weight scale</span>
              <Form.Control
                type="number"
                min="0"
                value={context.config?.connectionWeightScale ?? 0}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mt-3 input-group">
              <span className="input-group-text">Degree of parallelism</span>
              <Form.Control
                type="number"
                min="0"
                value={context.config?.degreeOfParallelism ?? 0}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mt-4">
              <Form.Check
                type="checkbox"
                disabled
                checked={
                  context.config?.enableHardwareAcceleratedNeuralNets ?? false
                }
                label=" Hardware accelerated neural nets"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mt-4">
              <Form.Check
                type="checkbox"
                disabled
                checked={
                  context.config
                    ?.enableHardwareAcceleratedActivationFunctions ?? false
                }
                label="Hardware accelerated activation functions"
              />
            </Form.Group>
          </Col>
        </Row>
        <Card className="mt-3">
          <Card.Header>Evolution Algorithm Settings</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Form.Group className="mt-3 input-group">
                  <span className="input-group-text">speciesCount</span>
                  <Form.Control
                    type="number"
                    min="0"
                    value={
                      context.config?.evolutionAlgorithmSettings
                        ?.speciesCount ?? 0
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mt-3 input-group">
                  <span className="input-group-text">elitismProportion</span>
                  <Form.Control
                    type="number"
                    min="0"
                    value={
                      context.config?.evolutionAlgorithmSettings
                        ?.elitismProportion ?? 0
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mt-3 input-group">
                  <span className="input-group-text">selectionProportion</span>
                  <Form.Control
                    type="number"
                    min="0"
                    value={
                      context.config?.evolutionAlgorithmSettings
                        ?.selectionProportion ?? 0
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mt-3 input-group">
                  <span className="input-group-text">
                    offspringAsexualProportion
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    value={
                      context.config?.evolutionAlgorithmSettings
                        ?.offspringAsexualProportion ?? 0
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mt-3 input-group">
                  <span className="input-group-text">
                    offspringSexualProportion
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    value={
                      context.config?.evolutionAlgorithmSettings
                        ?.offspringSexualProportion ?? 0
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mt-3 input-group">
                  <span className="input-group-text">
                    interspeciesMatingProportion
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    value={
                      context.config?.evolutionAlgorithmSettings
                        ?.interspeciesMatingProportion ?? 0
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="mt-3">
          <Card.Header>Complexity regulation strategy</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Form.Group className="mt-3 input-group">
                  <span className="input-group-text">Strategy name</span>
                  <Form.Control
                    type="text"
                    value={
                      context.config?.complexityRegulationStrategy
                        ?.strategyName ?? ""
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mt-3 input-group">
                  <span className="input-group-text">Complexity ceiling</span>
                  <Form.Control
                    type="number"
                    min="0"
                    value={
                      context.config?.complexityRegulationStrategy
                        ?.complexityCeiling ?? 0
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mt-3 input-group">
                  <span className="input-group-text">
                    Min simplifcation generations
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    value={
                      context.config?.complexityRegulationStrategy
                        ?.minSimplifcationGenerations ?? 0
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="mt-3">
          <Card.Header>Reproduction settings</Card.Header>
          <Card.Body>
            <h5>Asexual</h5>
            <Row>
              <Col>
                <Form.Group className="mt-3 input-group">
                  <span className="input-group-text">
                    connectionWeightMutationProbability
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    value={
                      context.config?.reproductionAsexualSettings
                        ?.connectionWeightMutationProbability ?? 0
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-3 input-group">
                  <span className="input-group-text">
                    addNodeMutationProbability
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    value={
                      context.config?.reproductionAsexualSettings
                        ?.addNodeMutationProbability ?? 0
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mt-3 input-group">
                  <span className="input-group-text">
                    addConnectionMutationProbability
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    value={
                      context.config?.reproductionAsexualSettings
                        ?.addConnectionMutationProbability ?? 0
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-3 input-group">
                  <span className="input-group-text">
                    deleteConnectionMutationProbability
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    value={
                      context.config?.reproductionAsexualSettings
                        ?.deleteConnectionMutationProbability ?? 0
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <h5 className="mt-3">Sexual</h5>
            <Form.Group className="mt-3 input-group">
              <span className="input-group-text">
                secondaryParentGeneProbability
              </span>
              <Form.Control
                type="number"
                min="0"
                value={
                  context.config?.reproductionSexualSettings
                    ?.secondaryParentGeneProbability ?? 0
                }
              />
            </Form.Group>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  );
}
