import React, { useContext } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { ExperimentContext } from "../../../store/experiment-context";
export default function CurrentStats({}) {
  const context = useContext(ExperimentContext);
  return (
    <Card className="mt-3">
      <Card.Header>Current Stats</Card.Header>
      <Card.Body>
        Fitness: {context.fitness}
        <ProgressBar animated now={context.stopConditionSatisfied ? 100 : context.fitnessPercentage} />
      </Card.Body>
    </Card>
  );
}
