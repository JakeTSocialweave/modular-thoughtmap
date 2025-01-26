import React from 'react';
import type { NodeData, ConnectionData } from './Canvas';

interface ConnectionProps {
  connection: ConnectionData;
  nodes: NodeData[];
}

export function Connection({ connection, nodes }: ConnectionProps) {
  const fromNode = nodes.find(n => n.id === connection.fromId);
  const toNode = nodes.find(n => n.id === connection.toId);

  if (!fromNode || !toNode) return null;

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <line
        x1={fromNode.x}
        y1={fromNode.y}
        x2={toNode.x}
        y2={toNode.y}
        stroke="#E2E8F0"
        strokeWidth="2"
        className="animate-line-draw"
        style={{
          strokeDasharray: '1000',
          strokeDashoffset: '1000',
        }}
      />
    </svg>
  );
}