import React, { useEffect, useRef, useContext } from "react";
import { Network } from "vis-network";
import { Card } from "react-bootstrap";
import { ExperimentContext } from "../../../store/experiment-context";

export default function BestGenome() {
  const context = useContext(ExperimentContext);
  const nodes: { id: number; label: string, level: number }[] = [];
  const edges: { from: number; to: number; width: number; color: string }[] = [];

  const options = {
    layout: {
      hierarchical: {
        direction: 'UD',
      }
    },
    physics: true,
    nodes: {
      color: {
        background: 'white'
      }
    },
    edges: {
      smooth: {
        enabled: true,
        type: 'cubicBezier',
        forceDirection: 'vertical',
        roundness: 0.4
      },
      arrows: {
        to: {
          enabled: true,
        },
      },
      color: {
        inherit: false,
      },
    },
  };
  const visJsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inputNodesIndices = [0, 1, 2];
    const outputNodesIndices = [3];
    const nodeIndices = context.bestGenome.reduce((acc, val) => {
      acc.add(val.srcIdx);
      acc.add(val.tgtItx);
      return acc;
    }, new Set<number>([]));
    nodeIndices.forEach((i) => {
      nodes.push({ id: i, label: `${i}`, level: 1 });
    });
    context.bestGenome.forEach((g) => {
      edges.push({
        from: g.srcIdx,
        to: g.tgtItx,
        color: g.weight > 0 ? "blue" : "red",
        width: Math.ceil(Math.abs(g.weight))
      });
    });
    // figure out nodes layout by looking at edges and input/output indices
    let nodeCount = 0;
    nodes.forEach((node) => {
      if (inputNodesIndices.includes(node.id)) {
        node.level = 0;
        return;
      }
      if (outputNodesIndices.includes(node.id)) {
        node.level = 3;
        return;
      }
      if (nodeCount % 2 == 0) {
        node.level = 1;
      } else {
        node.level = 2;
      }
      nodeCount++;
    });

    const network =
      visJsRef.current &&
      new Network(visJsRef.current, { nodes, edges }, options);
  }, [visJsRef, context.bestGenome]);

  return (
    <Card className="mt-3">
      <Card.Header>BestGenome</Card.Header>
      <div style={{ height: "25rem" }} ref={visJsRef} />
    </Card>
  );
}
