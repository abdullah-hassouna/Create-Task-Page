import React from "react";

/**
 * @param {React.ComponentProps<'div'> & {
 *  activeState?: "default" | "error" | "loading" | "success",
 *  onStateChange?: (state: "default" | "error" | "loading" | "success") => void,
 * }} props
 */
function CreateTaskHeader({ activeState = "default", onStateChange, ...rest }) {
  const states = [
    { id: "default", label: "Default" },
    { id: "error", label: "Input Error" },
    { id: "loading", label: "Loading" },
    { id: "success", label: "Success" },
  ];

  return (
    <div className="task-header-container" {...rest}>
      <div className="state-preview-bar">
        <div className="preview-label">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          <span>Interactive State Preview:</span>
        </div>
        <div className="preview-buttons">
          {states.map((state) => (
            <button
              key={state.id}
              type="button"
              className={`preview-btn ${activeState === state.id ? "active" : ""}`}
              onClick={() => onStateChange?.(state.id)}
            >
              {state.label}
            </button>
          ))}
        </div>
      </div>

      <div className="page-header-content">
        <div className="breadcrumbs">
          <span>Cooperative Training</span>
          <span className="separator">&gt;</span>
          <span>Academic Tasks</span>
          <span className="separator">&gt;</span>
          <span className="active-crumb">Create New Task</span>
        </div>

        <h1 className="page-title">Create Task</h1>

        <p className="page-subtitle">
          Set up task details and define evaluation criteria to track intern
          progress accurately and objectively.
        </p>

        <div className="cohort-badge">
          <span className="dot"></span>
          <span>Cohort 2025 - Information Technology</span>
        </div>
      </div>
    </div>
  );
}

export default CreateTaskHeader;
