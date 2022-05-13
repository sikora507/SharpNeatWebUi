import React, { useContext } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import apiClient from "../../../axios/apiClient";
import IExperimentConfig from "../../../models/IExperimentConfig";
import { ExperimentContext } from "../../../store/experiment-context";

export default function Population() {
  var context = useContext(ExperimentContext);
  const queryClient = useQueryClient();
  const createRandomPopulationCall = async (
    config: IExperimentConfig | undefined
  ) => {
    await apiClient.post("/experiment/create-random-population", config);
  };
  const createPopulationMutation = useMutation(createRandomPopulationCall, {
    onSettled: () => {
      queryClient.invalidateQueries("experiment-status");
    },
  });
  return (
    <Card className="mt-3">
      <Card.Header>Genome Population</Card.Header>
      <Card.Body>
        {context.populationInitialized && (
          <Alert variant="warning " className="text-center">
            {context.populationCount} genomes ready
          </Alert>
        )}
        {!context.populationInitialized && (
          <Alert variant="danger" className="text-center">
            Population not initialized
          </Alert>
        )}
        <Button
          className="w-100"
          disabled={context.populationInitialized}
          onClick={() => createPopulationMutation.mutate(context.config)}
        >
          Create random population
        </Button>
        <Form>
          <Form.Group className="mt-3 input-group">
            <Form.Control
              type="number"
              step="10"
              min="10"
              value={context.config?.populationSize ?? 10}
              onChange={(e) =>
                context.patchConfiguration({ populationSize: e.target.value })
              }
              disabled={context.populationInitialized}
            />
            <span className="input-group-text">Population size</span>
          </Form.Group>
          <Form.Group className="mt-3 input-group">
            <Form.Control
              type="number"
              step="0.05"
              min="0.01"
              max="1"
              value={context.config?.initialInterconnectionsProportion ?? 0.01}
              onChange={(e) =>
                context.patchConfiguration({
                  initialInterconnectionsProportion: e.target.value,
                })
              }
              disabled={context.populationInitialized}
            />
            <span className="input-group-text">
              Initial connections proportion
            </span>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}
