import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import apiClient from "../../../axios/apiClient";
import { ExperimentContext, IBestGenome } from "../../../store/experiment-context";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

export default function SearchControl() {
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const queryClient = useQueryClient();
  const resetMutation = useMutation(
    async () => {
      await apiClient.post("/experiment/reset");
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("experiment-status");
      },
    }
  );
  const startMutation = useMutation(
    async () => {
      await apiClient.post("/experiment/start");
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("experiment-status");
      },
    }
  );
  const spopMutation = useMutation(
    async () => {
      await apiClient.post("/experiment/stop");
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("experiment-status");
      },
    }
  );
  const context = useContext(ExperimentContext);
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("https://localhost:5200/hubs/experimentStatus")
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("UpdateEvent", (message) => {
            if (message.stats.stopConditionSatisfied) {
              context.setStopConditionSatisfied(true);
              queryClient.invalidateQueries("experiment-status");
            }
            context.updateStats({
              fitness: message.neatPopulationStats.bestFitness.primaryFitness
            });
            context.setBestGenome(message.bestGenome as IBestGenome[]);
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);
  return (
    <Card className="mt-3">
      <Card.Header>Search Control</Card.Header>
      <Card.Body>
        <Stack direction="horizontal" gap={3}>
          <Button
            disabled={!context.isStartActive}
            variant="primary"
            size="lg"
            className="flex-fill"
            onClick={() => startMutation.mutate()}
          >
            Start / Continue
          </Button>
          <Button
            disabled={!context.isStopActive}
            variant="primary"
            size="lg"
            className="flex-fill"
            onClick={() => spopMutation.mutate()}
          >
            Stop / pause
          </Button>
          <Button
            disabled={!context.isResetActive}
            variant="warning"
            size="lg"
            className="flex-fill"
            onClick={() => {
              resetMutation.mutate();
              context.resetStats();
            }}
          >
            Reset
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}
