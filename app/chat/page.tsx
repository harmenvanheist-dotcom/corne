"use client";

import { useRouter } from "next/navigation";

const workflows = [
  {
    id: "wf_68ee779f364081909c07b081c300369f0558624bf784741f",
    name: "FAQ Vermeulen",
    description: "Workflow voor onderhoudsvragen en reparaties",
    icon: "🔧",
  },
  {
    id: "wf_xxxxx", // vul hier optioneel je tweede workflow ID in
    name: "Creatief Schrijven",
    description: "Gebruik een alternatieve workflow voor creatieve taken",
    icon: "✍️",
  },
];

export default function WorkflowSelector() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
        Kies je Workflow
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            onClick={() => {
              localStorage.setItem("selectedWorkflow", workflow.id);
              router.push("/");
            }}
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.2s",
              textAlign: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              {workflow.icon}
            </div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              {workflow.name}
            </h2>
            <p style={{ color: "#666" }}>{workflow.description}</p>
            <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#999" }}>
              ID: {workflow.id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
