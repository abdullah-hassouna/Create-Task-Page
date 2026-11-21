import React from "react";
import DeleteIcon from "../icons/deleteIcon";

/**
 * @param {React.ComponentProps<'div'> &
 * {
 *  "name": string,
 *  "weight": number,
 *  "onChangeName": (val: string) => void,
 *  "onChangeWeight": (val: number) => void,
 *  "onDelete": () => void,
 *  "error"?: string | boolean | string[] | object
 * }} props
 */
function DynamicRowInput({
  name,
  weight,
  onChangeName,
  onChangeWeight,
  onDelete,
  error,
  ...rest
}) {
  return (
    <div className="custom-row-container" {...rest}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          className="row-input-field"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          placeholder="Criterion name..."
        />
        {typeof error === "string" && (
          <span style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
            {error}
          </span>
        )}
      </div>

      <div className="row-badge">
        <input
          type="number"
          className="badge-count"
          value={weight}
          onChange={(e) => onChangeWeight(Number(e.target.value))}
          style={{ border: "none", background: "transparent", outline: "none" }}
        />
        <span
          className="badge-divider"
          style={{ color: "#747686", fontSize: "11px", margin: "0 2px" }}
        >
          /
        </span>
        <span className="badge-max">100</span>
      </div>

      <button
        type="button"
        className="row-delete-btn"
        onClick={onDelete}
        aria-label="Delete item"
      >
        <DeleteIcon style={{ height: 15 }} />
      </button>
    </div>
  );
}

export default DynamicRowInput;
