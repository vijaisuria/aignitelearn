import React, { useState } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "react-flow-renderer";
import Modal from "./Modal";

const GraphVisualization = ({ data }) => {
  const [completedFields, setCompletedFields] = useState([]);
  const [modalData, setModalData] = useState(null); // Modal data for clicked skill
  const [progress, setProgress] = useState(0); // Progress tracking

  const nodes = [];
  const edges = [];
  const rowSpacing = 150; // Vertical spacing
  const columnSpacing = 300; // Horizontal spacing

  // Generate nodes and edges for the tree structure
  data.forEach((field, fieldIndex) => {
    const fieldNodeId = `field-${fieldIndex}`;
    const isFieldCompleted = completedFields.includes(field.field);

    // Add field (parent) node
    nodes.push({
      id: fieldNodeId,
      data: {
        label: (
          <div className="text-center">
            <span>{field.field}</span>
            {isFieldCompleted && (
              <span className="ml-2 text-green-600 font-bold">(Completed)</span>
            )}
          </div>
        ),
      },
      position: { x: fieldIndex * columnSpacing, y: 0 },
      style: {
        backgroundColor: isFieldCompleted ? "#10b981" : "#f59e0b",
        color: "white",
        padding: "10px",
        borderRadius: "8px",
        transition: "all 0.3s ease",
      },
    });

    // Add skill nodes and edges
    field.skills.forEach((skill, skillIndex) => {
      const skillNodeId = `field-${fieldIndex}-skill-${skillIndex}`;
      nodes.push({
        id: skillNodeId,
        data: {
          label: (
            <button onClick={() => setModalData(skill)}>{skill.skill}</button>
          ),
        },
        position: {
          x: fieldIndex * columnSpacing,
          y: (skillIndex + 1) * rowSpacing,
        },
        style: {
          backgroundColor: "#2563eb",
          color: "white",
          padding: "10px",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.3s ease",
        },
      });

      // Connect parent node to its skills
      edges.push({
        id: `e-${fieldNodeId}-${skillNodeId}`,
        source: fieldNodeId,
        target: skillNodeId,
        animated: true,
        style: { strokeWidth: 2, stroke: "#3b82f6" },
      });

      // Connect skill to prerequisites
      skill.prerequisites.forEach((prerequisite) => {
        const prereqNode = nodes.find(
          (node) => node.data.label.props.children === prerequisite
        );
        if (prereqNode) {
          edges.push({
            id: `e-${prereqNode.id}-${skillNodeId}`,
            source: prereqNode.id,
            target: skillNodeId,
            type: "step",
            style: { stroke: "dashed", strokeWidth: 2 },
            animated: true,
          });
        }
      });
    });
  });

  // Handle marking skills as complete
  const markAsComplete = () => {
    if (modalData) {
      setCompletedFields([...completedFields, modalData.skill]);
      setProgress(progress + 10); // Increment progress
      setModalData(null);
    }
  };

  return (
    <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow w-11/12 mx-auto text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Step-by-Step Learning Roadmap
      </h2>
      <p className="text-gray-600 mb-4">
        Click on a skill to view details, take quizzes, or mark it as complete.
      </p>
      <div style={{ height: "700px", zIndex: "-99 !important" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodesDraggable={!modalData} // Disable node dragging when modal is open
          elementsSelectable={!modalData} // Disable element selection when modal is open
        >
          <Controls />
          <Background />
          <MiniMap
            nodeColor={(node) => {
              switch (node.style.backgroundColor) {
                case "#10b981":
                  return "green";
                case "#f59e0b":
                  return "orange";
                case "#2563eb":
                  return "blue";
                default:
                  return "#eee";
              }
            }}
          />
        </ReactFlow>
      </div>

      {modalData && (
        <Modal onClose={() => setModalData(null)}>
          <h3 className="text-xl font-semibold mb-4">{modalData.skill}</h3>
          <p className="mb-4">{modalData.description}</p>
          <div className="mb-4">
            <h4 className="font-medium">Prerequisites:</h4>
            <ul className="list-disc pl-6">
              {modalData.prerequisites.map((prerequisite, index) => (
                <li key={index}>{prerequisite}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => alert("Quiz functionality coming soon!")}
            >
              Take a Quiz
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => markAsComplete()}
            >
              Mark as Complete
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => alert("AI chat functionality coming soon!")}
            >
              Talk to AI
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setModalData(null)}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GraphVisualization;
