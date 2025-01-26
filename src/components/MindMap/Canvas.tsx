import React, { useRef, useState } from 'react';
import { Node } from './Node';
import { Connection } from './Connection';
import { useIsMobile } from '@/hooks/use-mobile';
import { Plus } from 'lucide-react';

export interface NodeData {
  id: string;
  x: number;
  y: number;
  content: string;
}

export interface ConnectionData {
  id: string;
  fromId: string;
  toId: string;
}

export function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [connections, setConnections] = useState<ConnectionData[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const isMobile = useIsMobile();

  const handleAddNode = (e: React.MouseEvent) => {
    if (isDragging) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newNode: NodeData = {
      id: `node-${Date.now()}`,
      x,
      y,
      content: 'New Node',
    };

    setNodes([...nodes, newNode]);
    console.log('Added new node:', newNode);
  };

  const handleNodeDrag = (id: string, x: number, y: number) => {
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, x, y } : node
    ));
    console.log('Node dragged:', id, 'to position:', x, y);
  };

  const handleConnect = (fromId: string, toId: string) => {
    if (fromId === toId) return;
    
    const connectionExists = connections.some(
      conn => (conn.fromId === fromId && conn.toId === toId) ||
              (conn.fromId === toId && conn.toId === fromId)
    );
    
    if (!connectionExists) {
      const newConnection: ConnectionData = {
        id: `conn-${Date.now()}`,
        fromId,
        toId,
      };
      setConnections([...connections, newConnection]);
      console.log('Created new connection:', newConnection);
    }
  };

  return (
    <div 
      ref={canvasRef}
      className="relative w-full h-screen bg-secondary overflow-hidden"
      onClick={handleAddNode}
    >
      {connections.map(conn => (
        <Connection
          key={conn.id}
          connection={conn}
          nodes={nodes}
        />
      ))}
      {nodes.map(node => (
        <Node
          key={node.id}
          node={node}
          onDrag={handleNodeDrag}
          onConnect={handleConnect}
          setIsDragging={setIsDragging}
        />
      ))}
      {isMobile && (
        <button
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg text-white"
          onClick={(e) => {
            e.stopPropagation();
            handleAddNode(e);
          }}
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}