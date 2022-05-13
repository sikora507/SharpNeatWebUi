import React, { useEffect, useRef, useContext } from "react";
import { Network } from "vis-network";
import { Card } from "react-bootstrap";
import { ExperimentContext } from "../../../store/experiment-context";

export default function BestGenome() {
  const context = useContext(ExperimentContext);
  const nodes: { id: number; label: string }[] = [];
  const edges: { from: number; to: number; width: number; color: string }[] = [];

  const options = {
    layout: {
      randomSeed: 1,
    },
	nodes:{
		color:{
			background: 'white'
		}
	},
    edges: {
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
    const nodeIndices = context.bestGenome.reduce((acc, val) => {
      acc.add(val.srcIdx);
      acc.add(val.tgtItx);
      return acc;
    }, new Set<number>([]));
    nodeIndices.forEach((i) => {
      nodes.push({ id: i, label: `${i}` });
    });
    context.bestGenome.forEach((g) => {
      edges.push({
        from: g.srcIdx,
        to: g.tgtItx,
        color: g.weight > 0 ? "blue" : "red",
		width: Math.ceil(Math.abs(g.weight))
      });
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
