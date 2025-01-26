import React, { useState, useRef } from 'react';
import type { NodeData } from './Canvas';
import { useToast } from '@/hooks/use-toast';

interface NodeProps {
  node: NodeData;
  onDrag: (id: string, x: number, y: number) => void;
  onConnect: (fromId: string, toId: string) => void;
  setIsDragging: (isDragging: boolean) => void;
}

export function Node({ node, onDrag, onConnect, setIsDragging }: NodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(node.content);
  const nodeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', node.id);
    setIsDragging(true);
    console.log('Started dragging node:', node.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    console.log('Finished dragging node:', node.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const fromId = e.dataTransfer.getData('text/plain');
    if (fromId && fromId !== node.id) {
      onConnect(fromId, node.id);
      toast({
        title: "Connected nodes",
        description: "A new connection has been created",
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const startX = e.clientX - node.x;
    const startY = e.clientY - node.y;
    
    const handleMouseMove = (e: MouseEvent) => {
      onDrag(node.id, e.clientX - startX, e.clientY - startY);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setIsDragging(false);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    setIsDragging(true);
  };

  return (
    <div
      ref={nodeRef}
      className="absolute p-4 bg-mindmap-node rounded-lg shadow-lg cursor-move animate-node-appear"
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`,
        transform: 'translate(-50%, -50%)',
        minWidth: '150px',
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseDown={handleMouseDown}
      onClick={(e) => e.stopPropagation()}
    >
      {isEditing ? (
        <input
          autoFocus
          className="w-full bg-transparent outline-none text-mindmap-text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <div
          className="text-mindmap-text"
          onDoubleClick={() => setIsEditing(true)}
        >
          {content}
        </div>
      )}
    </div>
  );
}